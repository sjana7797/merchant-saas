import { betterAuth, logger } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@merchant/db";
import { admin, organization, apiKey, jwt, openAPI } from "better-auth/plugins";
import * as authSchema from "@merchant/db/schema/auth-schema";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
    schema: authSchema,
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [admin(), organization(), apiKey(), jwt(), openAPI(), nextCookies()],
  trustedOrigins: ["http://localhost:3000", "http://localhost:5173"],
  advanced: {
    crossSubDomainCookies: {
      enabled: true,
    },
  },
  baseURL: process.env.NEXT_PUBLIC_AUTH_URL,
  basePath: "/auth",
});
