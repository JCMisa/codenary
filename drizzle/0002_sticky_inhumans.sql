CREATE TABLE "courses" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "courses_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"courseId" varchar NOT NULL,
	"createdBy" varchar NOT NULL,
	"title" varchar(255) NOT NULL,
	"desc" varchar(255),
	"bannerImage" text,
	"level" varchar DEFAULT 'Beginner' NOT NULL,
	"tags" varchar,
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp NOT NULL,
	CONSTRAINT "courses_courseId_unique" UNIQUE("courseId")
);
--> statement-breakpoint
ALTER TABLE "courses" ADD CONSTRAINT "courses_createdBy_users_email_fk" FOREIGN KEY ("createdBy") REFERENCES "public"."users"("email") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "coursesTable_courseId_idx" ON "courses" USING btree ("courseId");--> statement-breakpoint
CREATE INDEX "coursesTable_createdBy_idx" ON "courses" USING btree ("createdBy");--> statement-breakpoint
CREATE UNIQUE INDEX "usersTable_userId_idx" ON "users" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "usersTable_email_idx" ON "users" USING btree ("email");