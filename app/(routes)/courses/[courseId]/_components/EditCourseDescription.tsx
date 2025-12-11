"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { updateCourseDesc } from "@/lib/actions/courses";
import { showConfetti } from "@/lib/utils";
import { LoaderCircleIcon, PenSquareIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const EditCourseDescription = ({
  courseDescription,
  courseId,
}: {
  courseDescription: string | null | undefined;
  courseId: string;
}) => {
  const [open, setOpen] = useState(false);
  const [desc, setDesc] = useState<string | null | undefined>(
    courseDescription || null || undefined
  );
  const [loading, setLoading] = useState(false);

  const descriptionValue =
    desc === null || desc === undefined ? "No description provided" : desc;

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const result = await updateCourseDesc(descriptionValue, courseId);

      if (result.error) {
        toast.error(result.error);
        return; // Stop here
      }

      if (result.data) {
        if (result.data.success) {
          toast.success("Course description updated successfully!");
          showConfetti();
          setOpen(false);
        } else {
          toast.error("Failed to update the course description.");
        }
      }
    } catch (error) {
      console.log("Edit course description error: ", error);
      toast.error("Something went wrong. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <PenSquareIcon className="size-5 cursor-pointer text-yellow-500 hover:scale-105 transition-transform ease-in-out duration-200" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Course Description</DialogTitle>
          <DialogDescription>
            Update the course description below and click &quot;Save
            changes&quot; to apply your changes. The updated description will be
            visible to all students enrolled in this course.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-5">
          <Textarea
            placeholder="Enter the title of your course"
            className="bg-white dark:bg-black"
            onChange={(e) => setDesc(e.target.value)}
            value={descriptionValue}
            rows={5}
            disabled={loading}
          />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            type="submit"
            disabled={loading && !desc}
            onClick={handleSubmit}
          >
            {loading ? (
              <LoaderCircleIcon className="size-5 animate-spin" />
            ) : (
              "Save changes"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditCourseDescription;
