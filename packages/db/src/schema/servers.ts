import {
  pgTable,
  text,
  uuid,
  timestamp,
  pgEnum,
  integer,
} from "drizzle-orm/pg-core";

export const serverTypeEnum = pgEnum("type", ["rest", "grpc", "graphql"]);

export const servers = pgTable("servers", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  description: text("description"),
  host: text("url").notNull(),
  port: integer("port").notNull(),
  type: serverTypeEnum("type").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
