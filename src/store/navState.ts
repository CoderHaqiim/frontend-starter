import { create } from "zustand"

type SelectedNavState = {
  selectedNavState: number | string
  setSelectedNavState: (newSelection: number| string) => void
}

export const useSelectedNavState = create<SelectedNavState>((set) => ({
  selectedNavState: "dashboard",

  setSelectedNavState: (newSelection) => set({ selectedNavState: newSelection }),
}))