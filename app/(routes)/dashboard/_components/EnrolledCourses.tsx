import { Button } from "@/components/ui/button";
import { getAuthenticatedUser } from "@/lib/utils/getAuthUser";
import Image from "next/image";
import Link from "next/link";

const EnrolledCourses = async () => {
  const enrolledCourses = [];

  const user = await getAuthenticatedUser();

  return (
    <div className="mt-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-2 mb-2">
        <h2 className="font-game text-3xl ">Your Enrolled Courses</h2>
        {["admin", "teacher"].includes(user.role) && (
          <Button asChild className="font-game" variant="pixel">
            <Link href={"/courses/create"}>Create Course</Link>
          </Button>
        )}
      </div>
      {enrolledCourses.length === 0 ? (
        <div className="flex flex-col items-center gap-3 p-7 border rounded-2xl bg-zinc-100 dark:bg-zinc-900">
          <Image src={"/books.png"} alt="book" width={90} height={90} />
          <h2 className="font-game text-xl">
            You Don&apos;t Have Any Enrolled Courses
          </h2>
          <Button
            variant={"pixel"}
            size={"lg"}
            className="font-game cursor-pointer text-lg"
            asChild
          >
            <Link href={"/courses"}>Browse All Courses</Link>
          </Button>
        </div>
      ) : (
        "list"
      )}
    </div>
  );
};

export default EnrolledCourses;
