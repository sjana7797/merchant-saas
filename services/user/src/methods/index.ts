import { UserServiceServer } from "@merchant/proto/user";
import { getHealth } from "./health";
import * as customerResolvers from "./customer";
import * as userResolvers from "./user";

export const impl: UserServiceServer = {
  getHealth,
  ...customerResolvers,
  ...userResolvers,
};
