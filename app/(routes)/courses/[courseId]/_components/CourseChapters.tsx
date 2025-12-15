import { Skeleton } from "@/components/ui/skeleton";
import { db } from "@/config/db";
import { courseChaptersTable, enrolledCourseTable } from "@/config/schema";
import { and, eq } from "drizzle-orm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getAuthenticatedUser } from "@/lib/utils/getAuthUser";
import { getCompletedExercises } from "@/lib/actions/exercises";

interface CourseChaptersProps {
  course: CourseType;
}

interface EnableExerciseResult {
  enabled: boolean;
  completed: boolean;
}

const EnableExercise = async (
  exerciseSlug: string,
  courseId: string,
  courseChapterId: string,
  userId: string,
  isEnrolled: boolean,
  completedExercises: CompletedExerciseType[]
): Promise<EnableExerciseResult> => {
  // Exercise is enabled only if user is enrolled
  if (!isEnrolled) {
    return { enabled: false, completed: false };
  }

  // Check if this specific exercise is completed
  // exerciseId in completedExerciseTable is likely the exercise slug
  const isCompleted = completedExercises.some(
    (completed) =>
      completed.exerciseId === exerciseSlug &&
      completed.courseId === courseId &&
      completed.courseChapterId === courseChapterId &&
      completed.userId === userId
  );

  return { enabled: true, completed: isCompleted };
};

const CourseChapters = async ({ course }: CourseChaptersProps) => {
  const user = await getAuthenticatedUser();
  const chapters = await db
    .select()
    .from(courseChaptersTable)
    .where(eq(courseChaptersTable.courseId, course.courseId));

  // Check if user is enrolled in the course
  const enrollmentData = await db
    .select()
    .from(enrolledCourseTable)
    .where(
      and(
        eq(enrolledCourseTable.courseId, course.courseId),
        eq(enrolledCourseTable.userId, user.userId)
      )
    );

  const isEnrolled = enrollmentData.length > 0;

  // Get all completed exercises for this course
  const completedExercisesResult = await getCompletedExercises(course.courseId);
  const completedExercises: CompletedExerciseType[] =
    completedExercisesResult.data || [];

  if (chapters.length === 0) {
    return (
      <div className="flex flex-col gap-2 w-full">
        {[1, 2, 3, 4, 5].map((item) => (
          <div
            className="flex items-center w-full h-full gap-2 p-2 rounded-lg bg-neutral-100 dark:bg-neutral-900"
            key={item}
          >
            <Skeleton className="w-24 h-20 rounded-md" />

            <div className="flex flex-col gap-2 w-full">
              <Skeleton className="w-full h-9 rounded-md" />
              <div className="flex items-center gap-2 w-full">
                {[1, 2, 3].map((item) => (
                  <Skeleton key={item} className="w-full h-9 rounded-md" />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <section className="p-5 border-4 rounded-2xl">
      {await Promise.all(
        chapters.map(async (chapter, index) => {
          const exercises: ExerciseType[] = chapter.exercises as ExerciseType[];

          // Get exercise statuses for all exercises in this chapter
          const exerciseStatuses = await Promise.all(
            exercises.map((exercise) =>
              EnableExercise(
                exercise.slug,
                course.courseId,
                chapter.courseChapterId,
                user.userId,
                isEnrolled,
                completedExercises
              )
            )
          );

          return (
            <Accordion key={chapter.courseChapterId} type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="p-3 hover:bg-zinc-200 dark:hover:bg-zinc-800 font-game text-3xl transition-all ease-in-out cursor-pointer">
                  <div className="flex gap-10">
                    <h2 className="w-10 h-10 bg-zinc-300 dark:bg-zinc-700 text-center flex items-center justify-center rounded-full flex-none">
                      {index + 1}
                    </h2>
                    <h2>{chapter.name}</h2>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="mt-2">
                  <div className="flex flex-col gap-7 p-7 bg-zinc-100 dark:bg-zinc-900 rounded-2xl">
                    {exercises.length > 0
                      ? exercises.map(
                          (exercise: ExerciseType, Excindex: number) => {
                            const exerciseStatus = exerciseStatuses[Excindex];

                            return (
                              <div
                                key={exercise.slug}
                                className="flex items-center justify-between gap-2"
                              >
                                <div className="flex items-center gap-10 font-game">
                                  <h2 className="text-3xl">
                                    Exercise{" "}
                                    {index * exercises.length + Excindex + 1}
                                  </h2>
                                  <h2 className="text-3xl">{exercise.name}</h2>
                                </div>

                                {exerciseStatus.enabled ? (
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button
                                        variant={
                                          exerciseStatus.completed
                                            ? "pixelSuccess"
                                            : "pixel"
                                        }
                                      >
                                        {exerciseStatus.completed
                                          ? "Completed"
                                          : "Start Exercise"}
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p className="text-lg font-game">
                                        {exerciseStatus.completed
                                          ? "You have completed this exercise"
                                          : "Click to start this exercise"}
                                      </p>
                                    </TooltipContent>
                                  </Tooltip>
                                ) : (
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button variant={"pixelDisabled"}>
                                        ***
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p className="text-lg font-game">
                                        Please Enroll First
                                      </p>
                                    </TooltipContent>
                                  </Tooltip>
                                )}
                              </div>
                            );
                          }
                        )
                      : [1, 2, 3, 4, 5].map((item) => (
                          <Skeleton
                            key={item}
                            className="w-full h-14 rounded-lg"
                          />
                        ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          );
        })
      )}
    </section>
  );
};

export default CourseChapters;
