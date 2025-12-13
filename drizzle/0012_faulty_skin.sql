CREATE TABLE "enrollCourse" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "enrollCourse_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"courseId" varchar NOT NULL,
	"userId" varchar NOT NULL,
	"xpEarned" integer NOT NULL,
	"enrolledDate" timestamp NOT NULL,
	"updatedAt" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "courseChapters" ADD COLUMN "position" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "enrollCourse" ADD CONSTRAINT "enrollCourse_courseId_courses_courseId_fk" FOREIGN KEY ("courseId") REFERENCES "public"."courses"("courseId") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "enrollCourse" ADD CONSTRAINT "enrollCourse_userId_users_userId_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("userId") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "enrolledCourses";