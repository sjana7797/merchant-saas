import * as productResolver from "./graphql/products";
import * as serverResolver from "./graphql/server";
import * as userResolver from "./graphql/user";
import * as cartResolver from "./graphql/cart";
import { app } from "@getcronit/pylon";
import { proxy } from "hono/proxy";
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
    origin: ["http://localhost:3000"],
    allowMethods: ["GET", "POST", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

// Add routes
routes.forEach((route) => {
  app.route("/", route);
});

// Auth services
app.on(["POST", "GET"], "/auth/:path", (c) => {
  Logger.info({
    message: "Proxying to Auth Service",
    statusCode: httpStatusCodes.CONTINUE,
  });
  return proxy(`http://localhost:5001/api/auth/${c.req.param("path")}`);
});

Bun.serve({
  port: 5000,
  fetch: app.fetch,
});
