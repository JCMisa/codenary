import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

const InviteFriend = () => {
  return (
    <div className="flex flex-col items-center mt-8 p-4 border rounded-xl bg-zinc-100 dark:bg-zinc-900">
      <Image src={"/mail.png"} alt="invite-friend" width={80} height={80} />
      <h2 className="text-3xl font-game">Invite Friend</h2>
      <p className="font-game text-lg text-muted-foreground">
        Having Fun? Share your learning with your friends!
      </p>

      <div className="flex gap-2 items-center mt-5">
        <Input placeholder="Enter Email" type="email" className="min-w-sm" />
        <Button variant={"pixel"} className="font-game cursor-pointer">
          Invite
        </Button>
      </div>
    </div>
  );
};

export default InviteFriend;
