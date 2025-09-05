import { EcomServiceServer } from "@merchant/proto/ecom";
import * as productResolvers from "./products";
import { getHealth } from "./health";

export const impl: EcomServiceServer = {
  getHealth,
  ...productResolvers,
};
