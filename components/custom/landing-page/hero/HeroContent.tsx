"use client";

import { ShineBorder } from "@/components/ui/shine-border";
import ModeToggle from "../../ModeToggle";
import { useTheme } from "next-themes";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { LineShadowText } from "@/components/ui/line-shadow-text";
import { Highlighter } from "@/components/ui/highlighter";
import { HeroBento } from "./HeroBento";
import { BackgroundBeams } from "@/components/ui/background-beams";

const HeroContent = () => {
  const { theme } = useTheme();
  const shadowColor = theme === "dark" ? "white" : "black";

  return (
    <section className="bg-primary-800 rounded-b-lg rounded-tr-lg w-full flex flex-col relative p-5 ">
      <BackgroundBeams className="z-1" />

      {/* absolute mode toggler */}
      <div className="absolute top-3 right-3 bg-primary-700 rounded-full  w-8 h-8 flex items-center justify-center cursor-pointer shadow-lg z-2">
        <ModeToggle className="hover:bg-transparent dark:hover:bg-transparent cursor-pointer z-2" />
      </div>

      <div className="flex items-center gap-2 z-2">
        <div className="flex items-center justify-center text-sm cursor-pointer rounded-sm py-1 px-8 bg-primary-700">
          Signin
        </div>
        <div className="flex items-center justify-center text-sm cursor-pointer rounded-sm py-1 px-8 bg-primary-600">
          Signup
        </div>
      </div>

      <div className="flex flex-col items-center justify-center mt-10 text-center z-2">
        <Link
          href={"/"}
          className="rounded-md shadow-lg relative overflow-hidden flex items-center gap-4 justify-center text-md p-1 px-10 bg-primary-700"
        >
          <ShineBorder shineColor={theme === "dark" ? "white" : "black"} />
          Start Learning
          <ArrowRightIcon className="size-4" />
        </Link>

        <h1 className="text-6xl font-extrabold mt-10">
          <LineShadowText className="italic" shadowColor={shadowColor}>
            Learn
          </LineShadowText>
          .{" "}
          <LineShadowText className="italic" shadowColor={shadowColor}>
            Code
          </LineShadowText>
          . See it come alive.
        </h1>

        <span className="mt-5 text-sm">
          Unlock your potential with an immersive coding journey — where
          challenges spark{" "}
          <Highlighter
            isView
            action="underline"
            color={theme === "dark" ? "#ffffff" : "#000000"}
          >
            growth
          </Highlighter>
          , interactive learning fuels{" "}
          <Highlighter
            isView
            action="underline"
            color={theme === "dark" ? "#ffffff" : "#000000"}
          >
            mastery
          </Highlighter>
          , and every line of code brings you closer to becoming{" "}
          <Highlighter
            isView
            action="underline"
            color={theme === "dark" ? "#ffffff" : "#000000"}
          >
            unstoppable
          </Highlighter>
          .
        </span>

        <HeroBento className="mt-10" />
      </div>
    </section>
  );
};

export default HeroContent;
