import { Server, ServerCredentials, status } from "@grpc/grpc-js";
import {
  EcomServiceService,
  EcomServiceServer,
  GetProductRequest,
  GetProductResponse,
} from "@merchant/proto/ecom";
import { db } from "@merchant/db";
import { products } from "@merchant/db/schema/ecom";
import { eq } from "@merchant/db/lib";
import { z } from "zod";

const impl: EcomServiceServer = {
  async getProduct(call, callback) {
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
  },
};

export function startGrpcServer(port = 50052) {
  const server = new Server();
  server.addService(EcomServiceService, impl);
  server.bindAsync(
    `0.0.0.0:${port}`,
    ServerCredentials.createInsecure(),
    (err, bindPort) => {
      if (err) throw err;
      console.log(`🟢 Ecom gRPC server started on ${bindPort}`);
    }
  );
}
