import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { courses } from "@/constants";
import { currentUser } from "@clerk/nextjs/server";
import UserButtonClient from "@/components/custom/UserButtonClient";
import Link from "next/link";

const Header = async () => {
  const user = await currentUser();

  return (
    <header className="p-4 max-w-7xl flex justify-between items-center w-full">
      <div className="flex gap-2 items-center">
        <Image src={"/logo.png"} alt="logo" width={40} height={40} />
        <h2 className="font-bold text-4xl tracking-widest font-game">
          Codenary
        </h2>
      </div>

      <NavigationMenu>
        <NavigationMenuList className="gap-8">
          <NavigationMenuItem>
            <NavigationMenuTrigger>Courses</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid md:grid-cols-2 gap-2 sm:w-[400px] md:w-[500px] lg:w-[600px]">
                {courses.map((course) => (
                  <div
                    key={course.id}
                    className="p-2 hover:bg-accent rounded-xl cursor-pointer"
                  >
                    <h2 className="font-medium">{course.name}</h2>
                    <p className="text-sm text-muted-foreground">
                      {course.desc}
                    </p>
                  </div>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink href={"/projects"}>Projects</NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink href={"/pricing"}>Pricing</NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink href={"/contact"}>
              Contact Us
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {user ? (
        <div className="flex items-center gap-4">
          <Button asChild className="font-game text-2xl" variant={"pixel"}>
            <Link href={"/dashboard"}>Dashboard</Link>
          </Button>
          <UserButtonClient />
        </div>
      ) : (
        <Button asChild className="font-game text-2xl" variant={"pixel"}>
          <Link href={"/sign-in"}>Signin</Link>
        </Button>
      )}
    </header>
  );
};

export default Header;
