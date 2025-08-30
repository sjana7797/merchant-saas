import { EcomServiceClient } from "@merchant/proto/ecom";
import { UserServiceClient } from "@merchant/proto/user";
import { PORTS } from "@merchant/api-config";
import * as grpc from "@grpc/grpc-js";

const urlBuilder = (port: number) => `localhost:${port}`;

export const ecomClient = new EcomServiceClient(
  urlBuilder(PORTS.ECOM_SERVICE),
  grpc.credentials.createInsecure()
);

export const userClient = new UserServiceClient(
  urlBuilder(PORTS.USER_SERVICE),
  grpc.credentials.createInsecure()
);

export const servers = {
  [PORTS.ECOM_SERVICE]: ecomClient,
  [PORTS.USER_SERVICE]: userClient,
} as const;
