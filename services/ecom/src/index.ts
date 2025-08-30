import { PORTS } from "@merchant/api-config";
import { startGrpcServer } from "./grpc-server";

startGrpcServer(PORTS.ECOM_SERVICE);
