import { Server, ServerCredentials } from "@grpc/grpc-js";
import { EcomServiceService } from "@merchant/proto/ecom";
import { impl } from "./methods";

export function startGrpcServer(port = 50052) {
  const server = new Server();
  server.addService(EcomServiceService, impl);
  server.bindAsync(
    `0.0.0.0:${port}`,
    ServerCredentials.createInsecure(),
    (err, bindPort) => {
      if (err) throw err;
      console.log(`🟢 Ecom gRPC server started on ${bindPort}`);
    }
  );
}
