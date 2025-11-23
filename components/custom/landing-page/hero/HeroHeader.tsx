"use client";

import { navMenus } from "@/constants";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const HeroHeader = () => {
  const { theme } = useTheme();
  const pathname = usePathname();

  return (
    <section className="bg-primary-800 rounded-t-lg w-1/2 flex items-center justify-between gap-5 py-1 px-5 relative z-2">
      {/* logo */}
      <div className="flex items-center gap-2">
        <Image
          src={"/logo.svg"}
          alt="logo"
          width={24}
          height={24}
          className="invert dark:invert-0"
        />
        <span className="font-bold text-lg">Codenary</span>
      </div>

      {/* nav menus */}
      <div className="flex items-center gap-4">
        {navMenus.map((menu) => (
          <Link
            key={menu.id}
            href={menu.path}
            className={cn(
              "font-semibold py-[2px] px-4 rounded-full w-full max-w-20 shrink flex items-center justify-center text-xs shadow-md transition-colors hover:bg-primary-700",
              pathname === menu.path
                ? "bg-primary-700 font-semibold"
                : "text-gray-500"
            )}
          >
            {menu.name}
          </Link>
        ))}
      </div>

      {/* left bent 1 */}
      <svg
        className={`absolute top-[-4px] right-[-30px] z-1`}
        width="30"
        height="40"
        viewBox="0 0 30 40"
        fill="fill-current"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 0H30V40H20C8.9543 40 0 31.0457 0 20V0Z"
          fill={theme === "dark" ? "#00000" : "#ffffff"}
        />
      </svg>
      {/* left bent 2 */}
      <svg
        className={`absolute top-[-4px] right-[-30px]`}
        width="30"
        height="40"
        viewBox="0 0 30 40"
        fill="fill-current"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 7.5C0 3.35786 3.35786 0 7.5 0C19.9264 0 30 10.0736 30 22.5V30C30 35.5228 25.5228 40 20 40H0V7.5Z"
          fill={theme === "dark" ? "#0f0f0f" : "#f4f4f4"}
        />
      </svg>
    </section>
  );
};

export default HeroHeader;
