"use server";

import { db } from "@/config/db";
import { withErrorHandling } from "../utils";
import { completedExerciseTable } from "@/config/schema";
import { and, desc, eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";

export const getCompletedExercises = withErrorHandling(
  async (courseId: string) => {
    const { userId } = await auth();

    if (!userId) {
      throw new Error("User not found");
    }

    const data = await db
      .select()
      .from(completedExerciseTable)
      .where(
        and(
          eq(completedExerciseTable.courseId, courseId),
          eq(completedExerciseTable.userId, userId)
        )
      )
      .orderBy(
        desc(completedExerciseTable.courseId),
        desc(completedExerciseTable.id)
      );

    if (data.length > 0) {
      return data;
    }
    return [];
  }
);
