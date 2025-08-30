import { db } from "@merchant/db";
import { eq } from "@merchant/db/lib";
import { servers } from "@merchant/db/schema/servers";
import { Hono } from "hono";

export const server = new Hono();

server.get("/server/status/:id", async (c) => {
  const id = c.req.param("id");

  const serverResults = await db
    .select()
    .from(servers)
    .where(eq(servers.id, id))
    .limit(1);

  if (serverResults.length === 0) {
    return c.json({ status: false });
  }

  let status = false;

  const server = serverResults[0];

  try {
    const response = await fetch(server.healthUrl);
    status = response.ok;
  } catch (error) {}

  return c.json({ status });
});
