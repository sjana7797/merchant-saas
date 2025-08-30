import { z } from "zod";

export const addServer = z.object({
  name: z.string(),
  description: z.string(),
  healthUrl: z.url(),
});

export type AddServerSchema = z.infer<typeof addServer>;
