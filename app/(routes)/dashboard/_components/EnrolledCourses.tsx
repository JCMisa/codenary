import { Button } from "@/components/ui/button";
import Image from "next/image";

const EnrolledCourses = () => {
  const enrolledCourses = [];

  return (
    <div className="mt-8">
      <h2 className="font-game text-3xl mb-2">Your Enrolled Courses</h2>
      {enrolledCourses.length === 0 ? (
        <div className="flex flex-col items-center gap-3 p-7 border rounded-2xl bg-zinc-100 dark:bg-zinc-900">
          <Image src={"/books.png"} alt="book" width={90} height={90} />
          <h2 className="font-game text-xl">
            You Don&apos;t Have Any Enrolled Courses
          </h2>
          <Button
            variant={"pixel"}
            size={"lg"}
            className="font-game cursor-pointer text-lg "
          >
            Browse All Courses
          </Button>
        </div>
      ) : (
        "list"
      )}
    </div>
  );
};

export default EnrolledCourses;
