import { create } from "zustand"
import { Businesses } from "../types/types"

type BusinessStateTypes = {
    businessesState: Businesses | [],
    setBusinessesState : (newSelection: Businesses | []) => void
}
export const useBusinessesState = create<BusinessStateTypes>((set) => ({
    businessesState: [],
    setBusinessesState: (newSelection: Businesses) => set({businessesState: newSelection})
}))