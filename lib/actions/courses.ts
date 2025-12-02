"use server";

import { db } from "@/config/db";
import { coursesTable } from "@/config/schema";
import { withErrorHandling } from "../utils";
import { unstable_cache } from "next/cache";

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
