import { status } from "@grpc/grpc-js";
import { EcomServiceServer } from "@merchant/proto/ecom";
import {
  httpStatusPhrases,
  Logger,
  RequestUtil,
  httpStatusCodes,
} from "@merchant/api-config";
import z from "zod";
import { carts } from "@merchant/db/schema/ecom";
import { and, eq } from "@merchant/db/lib";
import { db } from "@merchant/db";

export const getCart: EcomServiceServer["getCart"] = async (call, callback) => {
  const token = call.metadata.get("authorization")?.at(0);

  if (!token) {
    Logger.error({
      message: "Missing authorization token",
      statusCode: httpStatusCodes.UNAUTHORIZED,
    });
    return callback(
      { code: status.UNAUTHENTICATED, message: httpStatusPhrases.UNAUTHORIZED },
      null,
    );
  }

  const parsedRequest = RequestUtil.parse({
    request: call.request,
    zodObject: z.object({
      userId: z.string(),
      orgId: z.string(),
      cartId: z.string(),
    }),
  });

  if (!parsedRequest.success) {
    Logger.error({
      message: "Failed to parse request",
      statusCode: httpStatusCodes.BAD_REQUEST,
      details: parsedRequest.error,
    });

    return callback(
      {
        code: status.INVALID_ARGUMENT,
        message: httpStatusPhrases.BAD_REQUEST,
        details: parsedRequest.error,
      },
      null,
    );
  }

  const { userId, orgId, cartId } = parsedRequest.data;

  Logger.info({
    message: "Received GetCart request",
    statusCode: status.OK,
    details: {
      userId,
      orgId,
      cartId,
    },
  });

  const cartResult = await db
    .select()
    .from(carts)
    .where(
      and(
        eq(carts.userId, userId),
        eq(carts.orgId, orgId),
        eq(carts.id, cartId),
      ),
    )
    .limit(1);

  if (!cartResult.length) {
    return callback(
      {
        message: "Cart not found",
        code: status.NOT_FOUND,
        name: httpStatusPhrases.NOT_FOUND,
      },
      null,
    );
  }

  const cart = cartResult[0];

  return callback(null, cart);
};
