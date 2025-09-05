import { Product } from "@/graphql/types";
import { ecomClient } from "@/utils/client";
import { GetProductRequest } from "@merchant/proto/ecom";

export async function getProduct(
  getProductRequest: GetProductRequest
): Promise<Product> {
  const { productId } = getProductRequest;
  return new Promise((resolve, reject) => {
    ecomClient.getProduct({ productId }, (err, response) => {
      if (err) {
        reject(err);
      } else {
        console.log("Response:", response, err);
        resolve(response);
      }
    });
  });
}
