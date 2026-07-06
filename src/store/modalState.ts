import {create} from "zustand"

type SelectedModal = {
    selectedModal : string | null
    setSelectedModal: (newSelection: string | null) => void 
}

export const useModalState = create<SelectedModal>((set) => ({
    selectedModal : null ,
    setSelectedModal: (newSelection: string | null) => set({selectedModal: newSelection})
}))