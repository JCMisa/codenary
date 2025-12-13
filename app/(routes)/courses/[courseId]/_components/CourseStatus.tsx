import { Progress } from "@/components/ui/progress";
import { getCourseChapters } from "@/lib/actions/chapters";
import Image from "next/image";

interface CourseStatusProps {
  course: CourseType;
  userEnrolledCourse: EnrolledCourseType;
  isUserEnrolled: boolean;
}

const CourseStatus = async ({
  course,
  userEnrolledCourse,
  isUserEnrolled,
}: CourseStatusProps) => {
  const courseChapters = await getCourseChapters(course.courseId);

  const getTotal = () => {
    let totalExercises: number = 0;
    let totalXP: number = 0;

    courseChapters.data?.forEach((chapter) => {
      const exercises: ExerciseType[] = chapter.exercises as ExerciseType[];
      totalExercises = totalExercises + exercises.length;

      exercises.forEach((exercise) => {
        totalXP = totalXP + exercise.xp;
      });
    });

    return {
      exercises: totalExercises,
      xp: totalXP,
    };
  };

  const calculateXpProgress = (currentValue: number, totalValue: number) => {
    if (currentValue && totalValue) {
      const percentage = (currentValue * 100) / totalValue;
      return percentage;
    }

    return 0;
  };

  return (
    <section className="font-game p-4 border-4 rounded-2xl w-full">
      <h2 className="text-3xl">Course Progress</h2>

      <div className="flex items-center gap-5 mt-4">
        <Image src={"/book.png"} alt="book" width={50} height={50} />
        <div className="w-full">
          <h2 className="flex justify-between text-2xl">
            Exercises{" "}
            <span className="text-muted-foreground">
              1/{getTotal().exercises}
            </span>
          </h2>
          <Progress value={37} className="mt-2" />
        </div>
      </div>

      <div className="flex items-center gap-5 mt-4">
        <Image src={"/star.png"} alt="book" width={50} height={50} />
        <div className="w-full">
          <h2 className="flex justify-between text-2xl">
            XP Earned{" "}
            <span className="text-muted-foreground">
              {isUserEnrolled
                ? `${userEnrolledCourse.xpEarned} / ${getTotal().xp}`
                : "N/A"}
            </span>
          </h2>
          <Progress
            value={calculateXpProgress(
              userEnrolledCourse.xpEarned,
              getTotal().xp
            )}
            className="mt-2"
          />
        </div>
      </div>
    </section>
  );
};

export default CourseStatus;
