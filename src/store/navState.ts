import { create } from "zustand"

type SelectedNavState = {
  selectedNavState: number
  setSelectedNavState: (newSelection: number) => void
}

export const useSelectedNavState = create<SelectedNavState>((set) => ({
  selectedNavState: 0,

  setSelectedNavState: (newSelection) =>
    set({ selectedNavState: newSelection }),
}))