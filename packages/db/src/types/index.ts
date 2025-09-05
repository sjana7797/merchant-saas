import type { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { customers, users } from "../schema/auth-schema";
import { servers } from "../schema/servers";
import { carts } from "../schema/ecom";

export type User = InferSelectModel<typeof users>;
export type Customer = InferSelectModel<typeof customers>;
export type Server = InferSelectModel<typeof servers>;
export type Cart = InferSelectModel<typeof carts>;

export type ServerInsert = InferInsertModel<typeof servers>;
