import {
  decimal,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { organizations, users } from "./auth-schema";
import { relations } from "drizzle-orm";

export const products = pgTable("products", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  orgId: text("org_id")
    .notNull()
    .references(() => organizations.id),
  brandId: uuid("brand_id")
    .notNull()
    .references(() => brands.id),

  createdAt: timestamp("created_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
  updatedAt: timestamp("updated_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
});

export const categories = pgTable("categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  orgId: text("org_id")
    .notNull()
    .references(() => organizations.id),
  parentId: uuid("parent_id"),

  createdAt: timestamp("created_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
  updatedAt: timestamp("updated_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
});

export const productCategories = pgTable(
  "product_categories",
  {
    productId: uuid("product_id")
      .notNull()
      .references(() => products.id),
    categoryId: uuid("category_id")
      .notNull()
      .references(() => categories.id),
    orgId: text("org_id")
      .notNull()
      .references(() => organizations.id),

    createdAt: timestamp("created_at").$defaultFn(
      () => /* @__PURE__ */ new Date()
    ),
    updatedAt: timestamp("updated_at").$defaultFn(
      () => /* @__PURE__ */ new Date()
    ),
  },
  (t) => [
    primaryKey({
      columns: [t.productId, t.categoryId],
    }),
  ]
);

export const brands = pgTable("brands", {
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

export const tabs = pgTable("tabs", {
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

export const productTabs = pgTable(
  "product_tabs",
  {
    productId: uuid("product_id")
      .notNull()
      .references(() => products.id),
    tabId: uuid("tab_id")
      .notNull()
      .references(() => tabs.id),
    orgId: text("org_id")
      .notNull()
      .references(() => organizations.id),

    createdAt: timestamp("created_at").$defaultFn(
      () => /* @__PURE__ */ new Date()
    ),
    updatedAt: timestamp("updated_at").$defaultFn(
      () => /* @__PURE__ */ new Date()
    ),
  },
  (t) => [primaryKey({ columns: [t.productId, t.tabId] })]
);

export const tags = pgTable("tags", {
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

export const carts = pgTable("carts", {
  id: uuid("id").primaryKey().defaultRandom(),
  orgId: text("org_id")
    .notNull()
    .references(() => organizations.id),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  amount: decimal("amount").notNull(),
  currency: text("currency").notNull(),
  createdAt: timestamp("created_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
  updatedAt: timestamp("updated_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
});

export const cartItems = pgTable("cart_items", {
  id: uuid("id").primaryKey().defaultRandom(),
  cartId: uuid("cart_id")
    .notNull()
    .references(() => carts.id),
  productId: uuid("product_id")
    .notNull()
    .references(() => products.id),
  orgId: text("org_id")
    .notNull()
    .references(() => organizations.id),
  quantity: integer("quantity").notNull(),
  price: decimal("price").notNull(),
  createdAt: timestamp("created_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
  updatedAt: timestamp("updated_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
});

export const orders = pgTable("orders", {
  id: uuid("id").primaryKey().defaultRandom(),
  orgId: text("org_id")
    .notNull()
    .references(() => organizations.id),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  amount: decimal("amount").notNull(),
  currency: text("currency").notNull(),
  discount: decimal("discount").default("0"),
  tax: decimal("tax").notNull(),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
  updatedAt: timestamp("updated_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
});

export const orderItems = pgTable("order_items", {
  id: uuid("id").primaryKey().defaultRandom(),
  orderId: uuid("order_id")
    .notNull()
    .references(() => orders.id),
  productId: uuid("product_id")
    .notNull()
    .references(() => products.id),
  orgId: text("org_id")
    .notNull()
    .references(() => organizations.id),
  quantity: integer("quantity").notNull(),
  price: decimal("price").notNull(),
  createdAt: timestamp("created_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
  updatedAt: timestamp("updated_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
});

export const transactionStatusesEnum = pgEnum("transaction_statuses", [
  "pending",
  "completed",
  "failed",
  "refunded",
  "voided",
  "cancelled",
  "partially_refunded",
  "in_review",
  "approved",
  "declined",
]);

export const transactions = pgTable("transactions", {
  id: uuid("id").primaryKey().defaultRandom(),
  orderId: uuid("order_id")
    .notNull()
    .references(() => orders.id),
  orgId: text("org_id")
    .notNull()
    .references(() => organizations.id),
  amount: decimal("amount").notNull(),
  currency: text("currency").notNull(),
  tax: decimal("tax").notNull(),
  status: transactionStatusesEnum("status").notNull().default("pending"),
  createdAt: timestamp("created_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
  updatedAt: timestamp("updated_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
});

export const transactionItems = pgTable("transaction_items", {
  id: uuid("id").primaryKey().defaultRandom(),
  transactionId: uuid("transaction_id")
    .notNull()
    .references(() => transactions.id),
  orderItemId: uuid("order_item_id")
    .notNull()
    .references(() => orderItems.id),
  orgId: text("org_id")
    .notNull()
    .references(() => organizations.id),
  status: transactionStatusesEnum("status").notNull().default("pending"),
  amount: decimal("amount").notNull(),
  currency: text("currency").notNull(),
  tax: decimal("tax").notNull(),
  createdAt: timestamp("created_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
  updatedAt: timestamp("updated_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
});

// Relations
export const categoriesRelations = relations(categories, ({ many, one }) => ({
  children: many(categories),
  parent: one(categories, {
    fields: [categories.parentId],
    references: [categories.id],
  }),
}));
