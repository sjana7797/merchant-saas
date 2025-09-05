import { Product } from "@/graphql/types";
import { ecomClient } from "@/utils/client";
import { Context } from "@getcronit/pylon";
import { httpStatusCodes, Logger } from "@merchant/api-config";
import { GetProductRequest } from "@merchant/proto/ecom";

export async function getProduct(
  getProductRequest: GetProductRequest,
): Promise<Product> {
  const { productId } = getProductRequest;
  return new Promise((resolve, reject) => {
    ecomClient.getProduct({ productId }, (err, response) => {
      if (err) {
        reject(err);
      } else {
        Logger.info({
          message: "Received GetProduct response",
          statusCode: httpStatusCodes.OK,
          details: response,
        });
        resolve(response);
      }
    });
  });
}
