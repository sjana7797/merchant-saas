import { Server, ServerCredentials } from "@grpc/grpc-js";
import { UserServiceService } from "@merchant/proto/user";
import { impl } from "./methods";

export function startGrpcServer(port = 50053) {
  const server = new Server();
  server.addService(UserServiceService, impl);
  server.bindAsync(
    `0.0.0.0:${port}`,
    ServerCredentials.createInsecure(),
    (err, bindPort) => {
      if (err) throw err;
      console.log(`🟢 Ecom gRPC server started on ${bindPort}`);
    }
  );
}
