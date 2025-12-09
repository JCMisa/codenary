import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeftIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CourseDetailBanner = ({ course }: { course: CourseType }) => {
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
            <h2 className="text-6xl capitalize">{course.title}</h2>
            <p className="text-3xl mt-3">{course.desc}</p>
            <Button className="text-2xl mt-7" size={"lg"} variant={"pixel"}>
              Enroll Now
            </Button>
          </div>
        </div>
      ) : (
        <Skeleton className="h-[350px] w-full rounded-lg" />
      )}
    </section>
  );
};

export default CourseDetailBanner;
