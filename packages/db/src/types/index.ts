import { type InferSelectModel, type InferInsertModel } from "drizzle-orm";
import { customers, users } from "../schema/auth-schema";

export type User = InferSelectModel<typeof users>;
export type Customer = InferSelectModel<typeof customers>;
