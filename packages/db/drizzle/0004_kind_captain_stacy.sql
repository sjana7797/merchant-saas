CREATE TYPE "public"."type" AS ENUM('rest', 'grpc', 'graphql');--> statement-breakpoint
ALTER TABLE "servers" RENAME COLUMN "health_url" TO "url";--> statement-breakpoint
ALTER TABLE "servers" ADD COLUMN "port" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "servers" ADD COLUMN "type" "type" NOT NULL;