import { PORTS } from "@merchant/api-config";
import { startGrpcServer } from "./grpc-server";

startGrpcServer(PORTS.USER_SERVICE);
