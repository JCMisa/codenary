import { getAuthenticatedUser } from "@/lib/utils/getAuthUser";
import Image from "next/image";

const UserStatus = async () => {
  const user = await getAuthenticatedUser();

  return (
    <div className="p-4 border-4 rounded-2xl shadow-lg">
      <div className="flex  gap-3 items-center">
        <Image
          src={"/alex_walk.gif"}
          alt="walking_user"
          width={70}
          height={70}
        />
        <h2 className="text-2xl font-game">{user.email}</h2>
      </div>

      <div className="grid grid-cols-2 gap-5">
        <div className="flex gap-3 items-center">
          <Image src={"/star.png"} alt="start" width={35} height={35} />
          <div>
            <h2 className="text-3xl font-game">20</h2>
            <h2 className="font-game text-xl text-muted-foreground">
              Total Rewards
            </h2>
          </div>
        </div>

        <div className="flex gap-3 items-center">
          <Image src={"/badge.png"} alt="badge" width={35} height={35} />
          <div>
            <h2 className="text-3xl font-game">3</h2>
            <h2 className="font-game text-xl text-muted-foreground">Badge</h2>
          </div>
        </div>

        <div className="flex gap-3 items-center">
          <Image src={"/fire.png"} alt="fire" width={35} height={35} />
          <div>
            <h2 className="text-3xl font-game">7</h2>
            <h2 className="font-game text-xl text-muted-foreground">
              Daily Streak
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserStatus;
