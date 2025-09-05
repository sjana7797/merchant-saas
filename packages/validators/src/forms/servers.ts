import { z } from "zod";

export const addServer = z.object({
  name: z.string(),
  description: z.string(),
  url: z.url(),
  type: z.enum(["grpc", "rest", "graphql"]),
});

export type AddServerSchema = z.infer<typeof addServer>;
