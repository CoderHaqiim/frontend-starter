import { create } from "zustand"
import { Business } from "../types/types"

type SelectedBusinessProps = {
    selectedBusiness: Business
    setSelectedBusiness: (newSelection: Business) => void
}


export const useSelectedBusiness = create<SelectedBusinessProps>((set)=>({
    selectedBusiness : {
        businessName:"",
        id:"",
        industry: "",
        establishedYear: 2010,
        country: "Nigeria",
        state: "Lagos",
        customers: 0,
        health: "healthy",
        healthScore: 0,
    },
    setSelectedBusiness : (newSelection) => set({selectedBusiness: newSelection })
}))
