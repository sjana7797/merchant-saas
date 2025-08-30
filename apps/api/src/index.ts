import app from "./app";

Bun.serve({
  port: 5000,
  fetch: app.fetch,
});
