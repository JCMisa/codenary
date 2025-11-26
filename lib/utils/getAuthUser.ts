import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getCurrentUser } from "../actions/users";

export const getAuthenticatedUser = async () => {
  // 1. Check Clerk Session status first (fastest check)
  const clerkUser = await currentUser();
  if (!clerkUser) {
    redirect("/sign-in");
  }

  // 2. Call the self-healing Server Action
  const userFromDb = await getCurrentUser();

  // 3. Handle Critical Server Action Error (DB failure, JIT sync failed, etc.)
  if (userFromDb.error) {
    console.error("Critical User Service Error:", userFromDb.error);
    const encodedError = encodeURIComponent(userFromDb.error.substring(0, 100));
    redirect(`/error?msg=${encodedError}`);
  }

  // 4. Handle Unexpected Null Data (Safety net)
  if (!userFromDb.data) {
    console.error("Service returned success status but no user data.");
    redirect("/error?msg=UNEXPECTED_NULL_USER");
  }

  // 5. Success! Return the guaranteed User object
  return userFromDb.data;
};
