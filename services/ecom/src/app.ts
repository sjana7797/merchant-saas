import { Hono } from "hono";
import { startGrpcServer } from "./grpc-server";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

startGrpcServer();

export default app;
