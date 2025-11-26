"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { withErrorHandling } from "../utils";
import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { eq } from "drizzle-orm";

// --------------------------- Helper Functions ---------------------------
const getSessionUserId = async (): Promise<string> => {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthenticated");

  return userId;
};

// --------------------------- Server Actions ---------------------------
export const getCurrentUser = withErrorHandling(async () => {
  const userId = await getSessionUserId();

  const data = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.userId, userId));

  if (data.length > 0) {
    return data[0];
  }

  // if user from clerk is not found in db, then JIT will put that user in the database
  // "Wait, this person is logged in with Clerk, but they aren't in my database yet. I will fix that right now."
  console.log(`[JIT Sync] User ${userId} missing in DB. Syncing...`);

  const clerkUser = await currentUser();
  if (!clerkUser) throw new Error("User not found in Clerk");

  const email = clerkUser.emailAddresses[0]?.emailAddress;
  const now = new Date();

  const [newUser] = await db
    .insert(usersTable)
    .values({
      userId: userId,
      name:
        clerkUser.fullName || `${clerkUser.firstName} ${clerkUser.lastName}`,
      email: email,
      image: clerkUser.imageUrl,
      points: 0,
      subscription: null,
      role: "user",
      createdAt: now,
      updatedAt: now,
    })
    .returning();

  return newUser;
});
