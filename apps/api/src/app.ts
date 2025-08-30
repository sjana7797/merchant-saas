import { Hono } from "hono";
import { proxy } from "hono/proxy";
import { schema } from "./schema";
import { graphql } from "graphql";
import { routes } from "./routes";
import { cors } from "hono/cors";

const app = new Hono();

app.use(
  "/*",
  cors({
    origin: ["http://localhost:3000"],
    allowMethods: ["GET", "POST", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Add routes
routes.forEach((route) => {
  app.route("/", route);
});

// Auth services
app.on(["POST", "GET"], "/auth/:path", (c) => {
  console.log("Proxying to Auth Service");
  return proxy(`http://localhost:5001/api/auth/${c.req.param("path")}`);
});

// GraphQL API
app.post("/graphql", async (c) => {
  const body = await c.req.json<{ query: string; variables?: any }>();

  const result = await graphql({
    schema,
    source: body.query,
    variableValues: body.variables,
  });

  return c.json(result);
});

export default app;
