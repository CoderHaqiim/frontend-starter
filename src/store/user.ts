import { create } from "zustand"

type UserState = {
  userState: Record<string, string | number>
  setUserState: (newSelection: Record<string, string>) => void
}

export const useUserState = create<UserState>((set) => ({
  userState: {
    username: "Haqiim",
    id: 90
  },

  setUserState: (newSelection) =>
    set({ userState: newSelection }),
}))