import app from "./app";
import { PORTS } from "@merchant/api-config";
import { startGrpcServer } from "./grpc-server";

Bun.serve({
  fetch: app.fetch,
  port: PORTS.ECOM_SERVICE,
});
