import { ecomClient } from "@/utils/client";
import { getContext } from "@getcronit/pylon";
import { Metadata } from "@grpc/grpc-js";
import { httpStatusCodes, Logger } from "@merchant/api-config";
import { Cart } from "@merchant/db/types";
import { GetCartRequest } from "@merchant/proto/ecom";

export function getCart(cartRequest: GetCartRequest): Promise<Cart> {
  return new Promise<Cart>((resolve, reject) => {
    const { userId, orgId, cartId } = cartRequest;
    const ctx = getContext();
    const token = ctx.req.header("authorization");

    if (!token || !token.startsWith("Bearer ")) {
      Logger.error({
        message: "Missing authorization token",
        statusCode: httpStatusCodes.UNAUTHORIZED,
      });
      reject("Missing authorization token");
      return;
    }

    const metadata = new Metadata();

    metadata.add("authorization", token);

    ecomClient.getCart({ userId, orgId, cartId }, metadata, (err, response) => {
      if (err) {
        reject(err);
      } else {
        // @ts-ignore
        resolve(response);
      }
    });
  });
}
