import { status } from "@grpc/grpc-js";
import { db } from "@merchant/db";
import { count, eq } from "@merchant/db/lib";
import { products } from "@merchant/db/schema/ecom";
import {
  EcomServiceServer,
  GetProductRequest,
  GetProductResponse,
  GetProductsResponse,
} from "@merchant/proto/ecom";
import { z } from "zod";

export const getProduct: EcomServiceServer["getProduct"] = async (
  call,
  callback
) => {
  const { productId } = call.request as GetProductRequest;

  console.log("Received GetProduct request for ID:", productId);

  const parsedProductIdResult = z.uuid().safeParse(productId);

  if (!parsedProductIdResult.success) {
    callback(
      {
        name: "InvalidArgument",
        message: "Product ID is required",
        code: 3,
      },
      null
    );
    return;
  }

  const productResult = await db
    .select()
    .from(products)
    .where(eq(products.id, productId))
    .limit(1);

  if (productResult.length === 0) {
    callback(
      {
        name: "NotFound",
        message: "Product not found",
        code: status.NOT_FOUND,
      },
      null
    );
    return;
  }

  const product = productResult[0];
  const response: GetProductResponse = {
    id: product.id,
    name: product.name,
    description: product.description ?? "",
    slug: product.slug,
    orgId: product.orgId,
  };

  console.log("Sending response:", response);

  callback(null, response);
};

export const getProducts: EcomServiceServer["getProducts"] = async (
  call,
  callback
) => {
  const { limit, page } = call.request;

  const take = limit + 1;
  const skip = (page - 1) * limit;

  console.log("Fetching products with limit:", limit, "page:", page);

  const productsQuery = db.select().from(products).limit(take).offset(skip);

  const totalCountQuery = db.select({ count: count() }).from(products);

  const [productsResponse, totalCountResponse] = await Promise.allSettled([
    productsQuery,
    totalCountQuery,
  ]);

  if (
    productsResponse.status === "rejected" ||
    totalCountResponse.status === "rejected"
  ) {
    callback(
      {
        cause: "Database query failed",
        code: status.INTERNAL,
      },
      null
    );
    return;
  }

  if (productsResponse.value.length === 0) {
    callback(null, {
      products: [],
      totalCount: 0,
      page: 1,
      nextCursor: undefined,
    } as GetProductsResponse);
    return;
  }

  let nextCursor: number | undefined;
  let productsData = productsResponse.value;

  if (productsData.length > limit) {
    nextCursor = page + 1;
    productsData = productsData.slice(0, limit);
  }

  callback(null, {
    page,
    nextCursor,
    totalCount: totalCountResponse.value?.at(0)?.count ?? 0,
    products: productsData.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description ?? "",
      slug: product.slug,
      orgId: product.orgId,
    })),
  });
};
