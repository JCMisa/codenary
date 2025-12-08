"use server";

import { db } from "@/config/db";
import { courseChaptersTable, coursesTable } from "@/config/schema";
import { slugify, withErrorHandling } from "../utils";
import { revalidateTag, unstable_cache } from "next/cache";
import { formSchema, FormValues } from "../zod/schema";
import { currentUser } from "@clerk/nextjs/server";
import { randomUUID } from "crypto";
import { eq } from "drizzle-orm";

export const getAllCourses = unstable_cache(
  withErrorHandling(async () => {
    const data = await db.select().from(coursesTable);

    if (data.length > 0) {
      return data;
    }
    return [];
  }),
  ["all-courses-list"], // Key parts (cache tag)
  {
    revalidate: 3600, // Cache for 1 hour (adjust as needed)
    tags: ["courses"], // Tag for manual revalidation later
  }
);

// export async function createCourse(data) {
//   // ... insert into db ...

//   // Purge the cache so the new course appears immediately
//   revalidateTag('courses');
// }

export const createCourse = withErrorHandling(async (values: FormValues) => {
  // ... Validation and Auth steps (Same as before) ...
  const validatedFields = formSchema.safeParse(values);
  if (!validatedFields.success) throw new Error("Invalid form fields");
  const { title, desc, level, tags, bannerImage, chapters } =
    validatedFields.data;

  const user = await currentUser();
  const userEmail = user?.emailAddresses[0]?.emailAddress;
  if (!userEmail) throw new Error("User not found");

  const newCourseId = `course_${randomUUID()}`;

  // --- STEP 1: Insert the Course ---
  await db.insert(coursesTable).values({
    courseId: newCourseId,
    createdBy: userEmail,
    title,
    desc: desc || null,
    level,
    tags: tags || null,
    bannerImage: bannerImage || null,
  });

  try {
    // --- STEP 2: Insert Chapters ---
    if (chapters && chapters.length > 0) {
      // Create an array of values to insert all at once (Batch Insert)
      // This is faster than a loop in HTTP driver
      const chapterValues = chapters.map((chapter, index) => {
        const newChapterId = `chapter_${randomUUID()}`;
        const exercisesWithSlugs =
          chapter.exercises?.map((ex) => ({
            ...ex,
            slug: slugify(ex.name),
          })) || [];

        return {
          courseChapterId: newChapterId,
          courseId: newCourseId,
          name: chapter.name,
          desc: chapter.desc || null,
          exercises: exercisesWithSlugs,
          position: index + 1,
        };
      });

      // Single Insert call for all chapters
      await db.insert(courseChaptersTable).values(chapterValues);
    }
  } catch (error) {
    // --- STEP 3: Manual Rollback (Compensation) ---
    // If chapters failed, we must delete the course we just created
    // to prevent "orphaned" empty courses in the DB.
    console.error("Chapter creation failed, rolling back course...", error);

    await db.delete(coursesTable).where(eq(coursesTable.courseId, newCourseId));

    throw new Error("Failed to save chapters. Course creation cancelled.");
  }

  revalidateTag("courses", "");
  return { courseId: newCourseId };
});
