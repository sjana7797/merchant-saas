import app from "./app";
import { PORTS } from "@merchant/api-config";

Bun.serve({
  port: PORTS.USER_SERVICE,
  fetch: app.fetch,
});
