import { EcomServiceServer } from "@merchant/proto/ecom";

export const getHealth: EcomServiceServer["getHealth"] = async (
  _,
  callback
) => {
  callback(null, {
    message: "OK",
  });
};
