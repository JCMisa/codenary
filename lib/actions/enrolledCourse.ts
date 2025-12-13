"use server";

import { currentUser } from "@clerk/nextjs/server";
import { withErrorHandling } from "../utils";
import { db } from "@/config/db";
import { enrolledCourseTable } from "@/config/schema";
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";
import { and, eq } from "drizzle-orm";

export const getAllEnrolledCourses = unstable_cache(
  withErrorHandling(async () => {
    const data = await db.select().from(enrolledCourseTable);

    if (data.length > 0) {
      return data;
    } else {
      return [];
    }
  }),
  ["all-enrolled-courses-list"], // Key parts (cache tag)
  {
    revalidate: 3600, // Cache for 1 hour (adjust as needed)
    tags: ["enrolled-courses"], // Tag for manual revalidation later
  }
);

export const enrollCourse = withErrorHandling(async (courseId: string) => {
  const user = await currentUser();

  if (!user) {
    throw new Error("Failed to enroll the course. No user found.");
  }

  // Check if user is already enrolled in the course
  const existingEnrollment = await db
    .select()
    .from(enrolledCourseTable)
    .where(
      and(
        eq(enrolledCourseTable.courseId, courseId),
        eq(enrolledCourseTable.userId, user.id)
      )
    );

  if (existingEnrollment.length > 0) {
    return {
      success: false,
      error: "You are already enrolled in this course.",
    };
  }

  const data = await db
    .insert(enrolledCourseTable)
    .values({
      courseId: courseId,
      userId: user.id,
      xpEarned: 0,
    })
    .returning();

  if (data) {
    revalidateTag("enrolled-courses", "");
    revalidatePath(`/courses/${courseId}`);
    return { success: true };
  } else {
    return { success: false };
  }
});
