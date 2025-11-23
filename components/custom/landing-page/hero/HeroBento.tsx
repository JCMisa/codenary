import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { cn } from "@/lib/utils";
import {
  IconBrandNextjs,
  IconBrandReact,
  IconBrandPython,
  IconBrandTypescript,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function HeroBento({ className }: { className: string }) {
  return (
    <div>
      <BentoGrid
        className={cn("max-w-4xl mx-auto md:auto-rows-[20rem]", className)}
      >
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            className={item.className}
            icon={item.icon}
          />
        ))}
      </BentoGrid>

      <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between mt-2">
        <p className="text-xs text-muted-foreground">
          Level up your skills with hands-on coding courses designed to
          transform learners into creators.
        </p>
        <Link href={"/"} className="text-xs text-muted-foreground italic">
          View More
        </Link>
      </div>
    </div>
  );
}

const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-24 rounded-xl   dark:bg-dot-white/[0.2] bg-dot-black/[0.2] mask-[radial-gradient(ellipse_at_center,white,transparent)]  border border-transparent dark:border-white/20 bg-neutral-100 dark:bg-black"></div>
);

const CourseImage = ({ src, alt }: { src: string; alt: string }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="flex flex-1 w-full h-full min-h-24 rounded-xl overflow-hidden">
      {!loaded && <Skeleton />}
      <Image
        src={src}
        alt={alt}
        width={600}
        height={300}
        className={cn(
          "object-cover rounded-xl transition-opacity duration-500",
          loaded ? "opacity-100" : "opacity-0"
        )}
        onLoadingComplete={() => setLoaded(true)}
      />
    </div>
  );
};

const items = [
  {
    title: "Next.js Mastery",
    description:
      "Build blazing-fast, scalable web apps with Next.js — from fundamentals to advanced features.",
    header: (
      <CourseImage
        src="https://wallpaperbat.com/img/9754366-nextjs-the-nextjs-frontend-framework.jpg"
        alt="Next.js Course"
      />
    ),
    className: "md:col-span-2",
    icon: <IconBrandNextjs className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "React Essentials",
    description:
      "Learn the core concepts of React, create dynamic UIs, and master component-driven development.",
    header: (
      <CourseImage
        src="https://wallpaperaccess.com/full/3909258.jpg"
        alt="React Course"
      />
    ),
    className: "md:col-span-1",
    icon: <IconBrandReact className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Python Programming",
    description:
      "Unlock the power of Python for automation, data analysis, and building real-world applications.",
    header: (
      <CourseImage
        src="https://c4.wallpaperflare.com/wallpaper/873/975/781/python-programming-minimalism-grey-technology-hd-wallpaper-preview.jpg"
        alt="Python Course"
      />
    ),
    className: "md:col-span-1",
    icon: <IconBrandPython className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "TypeScript Fundamentals",
    description:
      "Write safer, scalable code with TypeScript — strengthen your JavaScript skills with static typing.",
    header: (
      <CourseImage
        src="https://cdn.thenewstack.io/media/2022/01/10b88c68-typescript-logo.png"
        alt="TypeScript Course"
      />
    ),
    className: "md:col-span-2",
    icon: <IconBrandTypescript className="h-4 w-4 text-neutral-500" />,
  },
];
