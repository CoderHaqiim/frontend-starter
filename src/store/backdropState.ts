import {create} from  "zustand"
import { ReactNode } from "react"

type BackdropState = {
    backdropOpen: boolean,
    backdropContent: string | ReactNode | null,
    setBackdropOpen: (newSelection: boolean) => void
    setBackdropContent: (newSelection: string | ReactNode | null) => void
}

export const useBackdropState = create <BackdropState>((set)=>({
    backdropOpen: false,
    backdropContent: null,
    setBackdropOpen: (newSelection: boolean) => set({backdropOpen: newSelection}),
    setBackdropContent: (newSelection: string | ReactNode | null) => set({backdropContent: newSelection})
}))
