import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeftIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import EditCourseTitle from "./EditCourseTitle";
import DeleteCourse from "./DeleteCourse";
import EditCourseDescription from "./EditCourseDescription";
import EnrollButton from "./EnrollButton";
import { Button } from "@/components/ui/button";

const CourseDetailBanner = ({
  course,
  user,
  isUserEnrolled,
}: {
  course: CourseType;
  user: UserType;
  isUserEnrolled: boolean;
}) => {
  const isCreatorOrAdmin =
    course.createdBy === user.email || user.role === "admin";

  return (
    <section>
      {course.bannerImage ? (
        <div className="relative ">
          <Image
            src={course.bannerImage.trimEnd()}
            alt="course-banner"
            width={1000}
            height={350}
            className="w-full h-[350px] object-cover"
          />
          <div className="font-game absolute top-0 pt-24 p-10 md:px-24 lg:px-36 bg-linear-to-r from-black/80 to-white-50/50 h-full">
            <Link
              href={"/courses"}
              className="text-muted-foreground text-sm flex items-center gap-2 hover:text-foreground transition-colors ease-in-out"
            >
              <ArrowLeftIcon className="size-4" />
              Back to Courses
            </Link>
            <div className="flex items-start">
              <h2 className="text-6xl capitalize">{course.title}</h2>
              {isCreatorOrAdmin && (
                <EditCourseTitle
                  courseTitle={course.title}
                  courseId={course.courseId}
                />
              )}
            </div>

            <div className="flex items-start">
              <p className="text-3xl mt-3">{course.desc}</p>
              {isCreatorOrAdmin && (
                <EditCourseDescription
                  courseDescription={course.desc}
                  courseId={course.courseId}
                />
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center mt-7 gap-5">
              {isUserEnrolled === false ? (
                <EnrollButton
                  courseId={course.courseId}
                  courseTitle={course.title}
                />
              ) : (
                <Button
                  className="text-2xl cursor-pointer font-game"
                  size={"lg"}
                  variant={"pixel"}
                >
                  Continue Learning
                </Button>
              )}

              {isCreatorOrAdmin && (
                <DeleteCourse
                  courseTitle={course.title}
                  courseId={course.courseId}
                />
              )}
            </div>
          </div>
        </div>
      ) : (
        <Skeleton className="h-[350px] w-full rounded-lg" />
      )}
    </section>
  );
};

export default CourseDetailBanner;
