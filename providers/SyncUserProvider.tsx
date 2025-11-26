"use client";

import { ReactNode, useEffect } from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { useUserStore } from "@/store/userStore";

const SyncUserProvider = ({ children }: Readonly<{ children: ReactNode }>) => {
  const { user, isLoaded } = useUser();

  const setUserDetails = useUserStore((state) => state.setUserDetails);
  const setIsLoading = useUserStore((state) => state.setIsLoading);
  const userDetails = useUserStore((state) => state.userDetails);

  useEffect(() => {
    // 1. Wait for Clerk
    if (!isLoaded) return;

    // 2. If no user, stop loading and clear store
    if (!user) {
      setUserDetails(null);
      setIsLoading(false);
      return;
    }

    // 3. If we already have details (e.g., from navigating back and forth), don't refetch
    if (userDetails?.userId === user.id) {
      setIsLoading(false);
      return;
    }

    const syncUser = async () => {
      try {
        const result = await axios.post("/api/users", {});
        setUserDetails(result.data.user);
      } catch (error) {
        console.error("Sync error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    syncUser();
  }, [user, isLoaded, userDetails, setUserDetails, setIsLoading]);

  return <>{children}</>;
};

export default SyncUserProvider;
