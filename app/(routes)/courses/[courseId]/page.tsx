import { notFound, redirect } from "next/navigation";
import CourseDetailBanner from "./_components/CourseDetailBanner";
import CourseChapters from "./_components/CourseChapters";
import { getAuthenticatedUser } from "@/lib/utils/getAuthUser";
import { db } from "@/config/db";
import { coursesTable } from "@/config/schema";
import { eq } from "drizzle-orm";
import CourseStatus from "./_components/CourseStatus";
import UpgradeToPro from "../../dashboard/_components/UpgradeToPro";
import CommunityHelpSection from "./_components/CommunityHelpSection";

interface CourseDetailsProps {
  params: Promise<{ courseId: string }>;
}
const CourseDetails = async ({ params }: CourseDetailsProps) => {
  const { courseId } = await params;

  if (!courseId) {
    notFound();
  }

  const user = await getAuthenticatedUser();

  const [course] = await db
    .select()
    .from(coursesTable)
    .where(eq(coursesTable.courseId, courseId));

  if (!user) {
    redirect("/sign-in");
  }

  if (!course) {
    notFound();
  }

  return (
    <main>
      <CourseDetailBanner
        course={course as CourseType}
        user={user as UserType}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 p-10 md:px-24 lg:px-36 gap-7">
        <div className="lg:col-span-2">
          <CourseChapters course={course as CourseType} />
        </div>
        <div>
          <CourseStatus course={course as CourseType} />
          <UpgradeToPro />
          <CommunityHelpSection />
        </div>
      </div>
    </main>
  );
};

export default CourseDetails;
