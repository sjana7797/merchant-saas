import { Hono } from "hono";
import { auth } from "@merchant/auth/auth";
import { cors } from "hono/cors";
import { logger } from "hono/logger";

const app = new Hono();

app.use(
  "/*",
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    allowMethods: ["GET", "POST", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

app.use(logger());
app.get("/health", (c) => {
  return c.text("Auth Service is healthy");
});

app.on(["POST", "GET"], "/api/auth/*", (c) => {
  return auth.handler(c.req.raw);
});

export default app;
