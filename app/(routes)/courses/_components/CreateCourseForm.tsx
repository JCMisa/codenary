"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { formSchema, FormValues } from "@/lib/zod/schema";
import { Button } from "@/components/ui/button";
import { ChaptersList } from "./ChaptersList";
import { useTransition } from "react";
import { toast } from "sonner";
import { LoaderCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { createCourse } from "@/lib/actions/courses";

const CreateCourseForm = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  // 3. Form Definition with Default Values
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      desc: "",
      bannerImage: "",
      level: "Beginner",
      tags: "",
      chapters: [],
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (values) => {
    startTransition(async () => {
      // 1. Call the wrapped action
      const result = await createCourse(values);

      // 2. Check for error (handled by your utility)
      if (result.error) {
        toast.error(result.error);
        return; // Stop here
      }

      // 3. Success! Show toast AND Redirect
      if (result.data) {
        toast.success("Course created successfully!");

        // Optional: Small delay to let user read the toast
        setTimeout(() => {
          // Redirect to the new course or course list
          // router.push(`/courses`);
          router.push(`/courses/${result.data?.courseId}`);
        }, 1000);
      }
    });
  };

  const onError = (errors: Record<string, unknown>) => {
    console.log("Form Errors:", errors);
    toast.error("Please check the form for errors.");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className="w-full flex flex-col lg:flex-row gap-4 items-start"
      >
        {/* ================= LEFT SIDE (Course Details) ================= */}
        <div className="flex flex-col gap-4 w-full lg:w-[60%]">
          {/* Block 1: Title & Description */}
          <div className="flex flex-col gap-4 rounded-lg bg-neutral-100 dark:bg-neutral-900 p-6 w-full shadow-lg border border-neutral-200 dark:border-neutral-800">
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-game text-xl uppercase tracking-wide">
                    Course Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter the title of your course"
                      className="bg-white dark:bg-black"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="desc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-game text-xl uppercase tracking-wide">
                    Course Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="What will students learn?"
                      className="resize-none h-40 bg-white dark:bg-black"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Block 2: Metadata */}
          <div className="flex flex-col gap-4 rounded-lg bg-neutral-100 dark:bg-neutral-900 p-6 w-full shadow-lg border border-neutral-200 dark:border-neutral-800">
            <div className="flex flex-col md:flex-row items-center gap-4 w-full">
              {/* Level */}
              <FormField
                control={form.control}
                name="level"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="font-game text-xl uppercase tracking-wide">
                      Difficulty
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isPending}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full bg-white dark:bg-black">
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Beginner">Beginner</SelectItem>
                        <SelectItem value="Intermediate">
                          Intermediate
                        </SelectItem>
                        <SelectItem value="Advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Tags */}
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="font-game text-xl uppercase tracking-wide">
                      Tags
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="react, css, database"
                        className="bg-white dark:bg-black"
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Banner Image */}
            <FormField
              control={form.control}
              name="bannerImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-game text-xl uppercase tracking-wide">
                    Banner Image URL
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://..."
                      className="bg-white dark:bg-black"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormDescription className="text-xs">
                    Hosting link for the cover image.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* ================= RIGHT SIDE (Curriculum) ================= */}
        <div className="flex flex-col gap-4 w-full lg:w-[40%]">
          {/* Block 3: Chapters Container */}
          <div className="flex flex-col gap-4 rounded-lg bg-neutral-100 dark:bg-neutral-900 p-6 w-full shadow-lg border border-neutral-200 dark:border-neutral-800 h-full">
            <div className="font-game text-xl uppercase tracking-wide mb-2">
              Course Chapters
            </div>

            {/* The Chapter Logic is isolated here */}
            <div className={isPending ? "opacity-50 pointer-events-none" : ""}>
              <ChaptersList control={form.control} />
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            size="lg"
            className="w-full font-game text-lg tracking-wider cursor-pointer"
            variant={"pixel"}
            disabled={isPending} // Disable button
          >
            {isPending ? (
              <>
                <LoaderCircleIcon className="mr-2 h-5 w-5 animate-spin" />
                Saving...
              </>
            ) : (
              "Create Course"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateCourseForm;
