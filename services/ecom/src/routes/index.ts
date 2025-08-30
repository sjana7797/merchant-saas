import { EcomServiceServer } from "@merchant/proto/ecom";
import { getProduct } from "./products";
import { getHealth } from "./health";

export const impl: EcomServiceServer = {
  getProduct,
  getHealth,
};
