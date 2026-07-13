import {create} from "zustand"
import { Business } from "../types/types"

type SelectedBusinessProps = {
    selectedBusiness: Business
    setSelectedBusiness: (newSelection: Business) => void
}


export const useSelectedBusiness = create<SelectedBusinessProps>((set)=>({
    selectedBusiness : {
        name:"",
        id:"",
        industry: "",
        startDate: "",
        health: "healthy"
    },
    setSelectedBusiness : (newSelection) => set({selectedBusiness: newSelection })
}))