"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const BackButton = ({ label }: { label: string }) => {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.back()}
      className="cursor-pointer flex items-center gap-2 w-fit"
      variant={"ghost"}
    >
      <ArrowLeftIcon className="size-4" />
      {label}
    </Button>
  );
};

export default BackButton;
