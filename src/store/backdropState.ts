import {create} from  "zustand"

type BackdropState = {
    backdropOpen: boolean,
    backdropContent: string | null,
    setBackdropOpen: (newSelection: boolean) => void
    setBackdropContent: (newSelection: string | null) => void
}

export const useBackdropState = create <BackdropState>((set)=>({
    backdropOpen: false,
    backdropContent: null,
    setBackdropOpen: (newSelection: boolean) => set({backdropOpen: newSelection}),
    setBackdropContent: (newSelection: string | null) => set({backdropContent: newSelection})
}))