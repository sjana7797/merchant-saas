import { Hono } from "hono";

export const health = new Hono();

health.get("/", (c) => {
  return c.text("Healthy");
});
