import {create} from  "zustand"

type BackdropState = {
    backdropOpen: boolean,
    setBackdropOpen: (newSelection: boolean) => void
}

export const useBackdropState = create <BackdropState>((set)=>({
    backdropOpen: false,
    setBackdropOpen: (newSelection: boolean) => set({backdropOpen: newSelection})
}))