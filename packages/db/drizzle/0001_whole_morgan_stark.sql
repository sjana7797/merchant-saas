CREATE TABLE "servers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"health_url" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
