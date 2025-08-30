import { Hono } from "hono";
import { startGrpcServer } from "./grpc-server";

const app = new Hono();

app.get("/health", (c) => {
  return c.json({ status: "ok" });
});

startGrpcServer();

export default app;
