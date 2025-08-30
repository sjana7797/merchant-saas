import {
  decimal,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { organizations } from "./auth-schema";

export const pricingModelEnum = pgEnum("pricing_model", ["flat", "usage"]);

export const plans = pgTable("plans", {
  id: uuid("id").primaryKey().defaultRandom(),
  org_id: text("org_id")
    .notNull()
    .references(() => organizations.id),
  name: text("name").notNull(),
  basePrice: decimal("base_price").notNull(),
  currency: text("currency").default("INR").notNull(),
  pricingModel: pricingModelEnum("pricing_model").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const planFeatures = pgTable("plan_features", {
  id: uuid("id").primaryKey().defaultRandom(),
  planId: uuid("plan_id")
    .notNull()
    .references(() => plans.id),
  featureKey: text("feature_key").notNull(),
  limit: integer("limit"),
  overagePrice: decimal("overage_price"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const subscriptions = pgTable("subscriptions", {
  id: uuid("id").primaryKey().defaultRandom(),
  orgId: text("org_id")
    .notNull()
    .references(() => organizations.id),
  planId: uuid("plan_id")
    .notNull()
    .references(() => plans.id),
  status: text("status").notNull(),
  startDate: timestamp("start_date").defaultNow().notNull(),
  trialEndsAt: timestamp("trial_ends_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const invoices = pgTable("invoices", {
  id: uuid("id").primaryKey().defaultRandom(),
  subscriptionId: uuid("subscription_id")
    .notNull()
    .references(() => subscriptions.id),
  amount: integer("amount").notNull(),
  dueDate: timestamp("due_date").notNull(),
  status: text("status").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
