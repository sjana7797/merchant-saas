import { Hono } from "hono";
import { auth } from "@merchant/auth/auth";

const app = new Hono();

app.get("/health", (c) => {
  return c.text("Auth Service is healthy");
});

app.on(["POST", "GET"], "/api/auth/*", (c) => {
  return auth.handler(c.req.raw);
});

export default app;
