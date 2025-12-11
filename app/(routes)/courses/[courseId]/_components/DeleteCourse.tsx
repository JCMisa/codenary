"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteCourse } from "@/lib/actions/courses";
import { showConfetti } from "@/lib/utils";
import { LoaderCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const DeleteCourse = ({
  courseId,
  courseTitle,
}: {
  courseId: string;
  courseTitle: string;
}) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);

    try {
      const result = await deleteCourse(courseId);

      if (result.error) {
        toast.error(result.error);
        return; // Stop here
      }

      if (result.data) {
        if (result.data.success) {
          toast.success(`${courseTitle} was deleted successfully!`);
          showConfetti();
          router.push("/courses");
        } else {
          toast.error(`Failed to delete ${courseTitle}`);
        }
      }
    } catch (error) {
      console.log("Failed to delete course: ", error);
      toast.error("Something went wrong. Please try again!");
    } finally {
      setLoading(false);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="pixelDanger" className="text-2xl">
          Delete Course
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete Course: &quot;
            <span className="capitalize">{courseTitle}</span>&quot; ?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete the course{" "}
            <strong className="capitalize">{courseTitle}</strong>? This action
            cannot be undone and the course will be permanently removed.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={loading}>
            {loading ? (
              <LoaderCircleIcon className="size-5 animate-spin" />
            ) : (
              "Continue"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteCourse;
