ALTER TABLE "channels" DROP CONSTRAINT "channels_name_key";--> statement-breakpoint
ALTER TABLE "channels" ADD CONSTRAINT "channels_name_key" UNIQUE("name","server_id");