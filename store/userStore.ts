import { create } from "zustand";

interface UserState {
  userDetails: UserType | null;
  setUserDetails: (user: UserType | null) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export const useUserStore = create<UserState>((set) => ({
  userDetails: null,
  isLoading: true,
  setUserDetails: (user) => set({ userDetails: user }),
  setIsLoading: (loading) => set({ isLoading: loading }),
}));
