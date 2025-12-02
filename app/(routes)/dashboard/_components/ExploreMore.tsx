import { exploreMoreOptions } from "@/constants";
import Image from "next/image";

const ExploreMore = () => {
  return (
    <div className="mt-8">
      <h2 className="font-game text-3xl mb-2">Explore More Courses</h2>
      <div className="grid grid-cols-2 gap-5">
        {exploreMoreOptions.map((option) => (
          <div
            key={option.id}
            className="flex gap-2 p-2 border rounded-xl bg-zinc-100 dark:bg-zinc-900 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all duration-300"
          >
            <Image
              src={option.icon}
              alt={option.title}
              width={80}
              height={80}
            />

            <div>
              <h2 className="font-medium text-2xl font-fame">{option.title}</h2>
              <p className="font-game text-muted-foreground">{option.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreMore;
