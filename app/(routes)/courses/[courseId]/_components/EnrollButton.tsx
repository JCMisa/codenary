"use client";

import { Button } from "@/components/ui/button";
import { enrollCourse } from "@/lib/actions/enrolledCourse";
import { showConfetti } from "@/lib/utils";
import { LoaderCircleIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const EnrollButton = ({
  courseId,
  courseTitle,
}: {
  courseId: string;
  courseTitle: string;
}) => {
  const [loading, setLoading] = useState(false);

  const handleEnroll = async () => {
    setLoading(true);
    try {
      const result = await enrollCourse(courseId);

      if (result.error) {
        toast.error(result.error);
        return; // Stop here
      }

      if (result.data) {
        if (result.data.success) {
          showConfetti();
          toast.success(
            `Congratulations! You are successfully enrolled to ${courseTitle}`
          );
        }
      }
    } catch (error) {
      console.log("Error enrolling to the course: ", error);
      toast.error("Failed to enroll to the course.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button
      className="text-2xl cursor-pointer"
      size={"lg"}
      variant={"pixel"}
      disabled={loading}
      onClick={handleEnroll}
    >
      {loading ? (
        <LoaderCircleIcon className="size-5 animate-spin" />
      ) : (
        "Enroll Now"
      )}
    </Button>
  );
};

export default EnrollButton;
