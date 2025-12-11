"use server";

import { unstable_cache } from "next/cache";
import { withErrorHandling } from "../utils";
import { db } from "@/config/db";
import { courseChaptersTable } from "@/config/schema";
import { eq } from "drizzle-orm";

export const getCourseChapters = unstable_cache(
  withErrorHandling(async (courseId: string) => {
    const data = await db
      .select()
      .from(courseChaptersTable)
      .where(eq(courseChaptersTable.courseId, courseId));

    if (data.length > 0) {
      return data;
    }
    return [];
  }),
  ["all-course-chapters-list"], // Key parts (cache tag)
  {
    revalidate: 3600, // Cache for 1 hour (adjust as needed)
    tags: ["course-chapters"], // Tag for manual revalidation later
  }
);
