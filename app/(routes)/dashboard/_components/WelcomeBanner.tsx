import { getAuthenticatedUser } from "@/lib/utils/getAuthUser";
import Image from "next/image";

const WelcomeBanner = async () => {
  const user = await getAuthenticatedUser();

  return (
    <div className="flex gap-3 items-center">
      <Image
        src={"/machine.webp"}
        alt="welcome-banner-image"
        width={120}
        height={120}
      />

      <h2 className="font-game text-2xl p-4 border bg-zinc-800 rounded-lg rounded-bl-none">
        Welcome Back <span className="text-yellow-500">{user.name}</span>, Start
        Learning Something New!
      </h2>
    </div>
  );
};

export default WelcomeBanner;
