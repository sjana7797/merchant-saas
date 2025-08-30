import { Hono } from "hono";
import { proxy } from "hono/proxy";
import { schema } from "./schema";
import { graphql } from "graphql";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
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
