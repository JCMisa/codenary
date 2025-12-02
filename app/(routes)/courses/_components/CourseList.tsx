import { Badge } from "@/components/ui/badge";
import { getAllCourses } from "@/lib/actions/courses";
import { ChartNoAxesColumnIncreasingIcon } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";

const CourseList = async () => {
  const courses = await getAllCourses();

  if (courses.error) {
    console.error("Critical Courses Service Error:", courses.error);
    const encodedError = encodeURIComponent(courses.error.substring(0, 100));
    redirect(`/error?msg=${encodedError}`);
  }
  if (!courses.data) {
    console.error("Service returned success status but no courses data.");
    redirect("/error?msg=UNEXPECTED_NO_COURSES_FOUND");
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-3">
      {courses.data.map((course: CourseType) => (
        <div
          key={course.id}
          className="border-4 rounded-xl cursor-pointer hover:scale-95 transition-all duration-300 hover:bg-zinc-100 dark:hover:bg-zinc-900"
        >
          <Image
            src={course.bannerImage?.trimEnd() || "/hero2.gif"}
            alt={course.title}
            width={400}
            height={400}
            className="w-full h-[200px] object-cover rounded-t-lg"
          />
          <div className="p-4">
            <h2 className="font-game text-2xl">{course.title}</h2>
            <p className="font-game text-xl text-muted-foreground line-clamp-2">
              {course.desc}
            </p>
            <Badge className="flex items-center gap-1 mt-3">
              <ChartNoAxesColumnIncreasingIcon className="size-4" />
              {course.level}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseList;
