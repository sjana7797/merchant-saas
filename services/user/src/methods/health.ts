import { UserServiceServer } from "@merchant/proto/user";

export const getHealth: UserServiceServer["getHealth"] = async (
  _,
  callback
) => {
  callback(null, {
    message: "OK",
  });
};
