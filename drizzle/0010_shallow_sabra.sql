CREATE TABLE "courseChapters" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "courseChapters_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"courseChapterId" varchar NOT NULL,
	"courseId" varchar NOT NULL,
	"name" varchar(255) NOT NULL,
	"desc" varchar(255),
	"exercises" json,
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp NOT NULL,
	CONSTRAINT "courseChapters_courseChapterId_unique" UNIQUE("courseChapterId")
);
--> statement-breakpoint
ALTER TABLE "courseChapters" ADD CONSTRAINT "courseChapters_courseId_courses_courseId_fk" FOREIGN KEY ("courseId") REFERENCES "public"."courses"("courseId") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "courseChaptersTable_courseCapterId_idx" ON "courseChapters" USING btree ("courseChapterId");