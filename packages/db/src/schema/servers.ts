import { pgTable, text, uuid, timestamp } from "drizzle-orm/pg-core";

export const servers = pgTable("servers", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  description: text("description"),
  healthUrl: text("health_url").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("created_at").notNull().defaultNow(),
});
