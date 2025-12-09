import { Skeleton } from "@/components/ui/skeleton";
import { db } from "@/config/db";
import { courseChaptersTable } from "@/config/schema";
import { eq } from "drizzle-orm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

interface CourseChaptersProps {
  course: CourseType;
}

const CourseChapters = async ({ course }: CourseChaptersProps) => {
  const chapters = await db
    .select()
    .from(courseChaptersTable)
    .where(eq(courseChaptersTable.courseId, course.courseId));

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
    <div className="p-5 border-4 rounded-2xl">
      {chapters.map((chapter, index) => {
        const exercises: ExerciseType[] = chapter.exercises as ExerciseType[];

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
                        (exercise: ExerciseType, Excindex: number) => (
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
                            <Button variant={"pixelDisabled"}>***</Button>
                          </div>
                        )
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
      })}
    </div>
  );
};

export default CourseChapters;
