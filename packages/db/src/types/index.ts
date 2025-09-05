import type { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { customers, users } from "../schema/auth-schema";
import { servers } from "../schema/servers";

export type User = InferSelectModel<typeof users>;
export type Customer = InferSelectModel<typeof customers>;
export type Server = InferSelectModel<typeof servers>;

export type ServerInsert = InferInsertModel<typeof servers>;
