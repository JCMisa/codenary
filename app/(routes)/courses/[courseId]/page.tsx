import { db } from "@/config/db";
import { coursesTable } from "@/config/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import CourseDetailBanner from "./_components/CourseDetailBanner";
import CourseChapters from "./_components/CourseChapters";

interface CourseDetailsProps {
  params: Promise<{ courseId: string }>;
}
const CourseDetails = async ({ params }: CourseDetailsProps) => {
  const courseId = params.then((p) => p.courseId);

  if (!courseId) {
    notFound();
  }

  const [course] = await db
    .select()
    .from(coursesTable)
    .where(eq(coursesTable.courseId, await courseId));

  if (!course) {
    notFound();
  }

  return (
    <main>
      <CourseDetailBanner course={course} />

      <div className="grid grid-cols-1 lg:grid-cols-4 p-10 md:px-24 lg:px-36 gap-7">
        <div className="lg:col-span-3">
          <CourseChapters course={course} />
        </div>
        <div>second</div>
      </div>
    </main>
  );
};

export default CourseDetails;
