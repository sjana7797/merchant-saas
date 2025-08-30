import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { organizations } from "./auth-schema";

export const products = pgTable("products", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  orgId: text("org_id")
    .notNull()
    .references(() => organizations.id),

  createdAt: timestamp("created_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
  updatedAt: timestamp("updated_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
});
