import * as productResolver from "./graphql/products";
import * as serverResolver from "./graphql/server";
import * as userResolver from "./graphql/user";
import * as cartResolver from "./graphql/cart";
import { app } from "@getcronit/pylon";
import { routes } from "./routes";
import { cors } from "hono/cors";
import { Logger, httpStatusCodes } from "@merchant/api-config";

export const graphql = {
  Query: {
    ...productResolver,
    ...serverResolver,
    ...userResolver,
    ...cartResolver,
  },
  Mutation: {
    addServer: serverResolver.addServer,
  },
};

app.use(
  "/*",
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    allowMethods: ["GET", "POST", "OPTIONS", "PATCH"],
    allowHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

// Add routes
routes.forEach((route) => {
  app.route("/", route);
});

// Auth services
app.all("/auth/*", async (c) => {
  const subPath = c.req.path.replace(/^\/auth\//, "");
  Logger.info({
    message: "Proxying to Auth Service",
    statusCode: httpStatusCodes.CONTINUE,
    details: `${c.req.path} to http://localhost:5001/api/auth/${subPath}`,
  });
  const target = `http://localhost:5001/api/auth/${subPath}`;
  return fetch(target, {
    method: c.req.method,
    headers: c.req.raw.headers,
    body:
      c.req.method !== "GET" && c.req.method !== "HEAD"
        ? await c.req.arrayBuffer()
        : undefined,
    credentials: "include",
  });
});

Bun.serve({
  port: 5000,
  fetch: app.fetch,
});
