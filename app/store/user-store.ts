import { create } from "zustand";
import { UserType } from "@/app/type/user";

export interface UserStore {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
