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
import { Input } from "@/components/ui/input";
import { updateCourseTitle } from "@/lib/actions/courses";
import { showConfetti } from "@/lib/utils";
import { LoaderCircleIcon, PenSquareIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const EditCourseTitle = ({
  courseTitle,
  courseId,
}: {
  courseTitle: string;
  courseId: string;
}) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(courseTitle);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const result = await updateCourseTitle(title, courseId);

      if (result.error) {
        toast.error(result.error);
        return; // Stop here
      }

      if (result.data) {
        if (result.data.success) {
          toast.success("Course title updated successfully!");
          showConfetti();
          setOpen(false);
        } else {
          toast.error("Failed to update the course title.");
        }
      }
    } catch (error) {
      console.log("Edit course title error: ", error);
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
          <DialogTitle>Update Course Title</DialogTitle>
          <DialogDescription>
            Edit the course title below and click &quot;Save changes&quot; to
            update it. Changes will be visible to all students enrolled in this
            course.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-5">
          <Input
            placeholder="Enter the title of your course"
            className="bg-white dark:bg-black"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            disabled={loading}
          />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            type="submit"
            disabled={loading && !title}
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

export default EditCourseTitle;
