import { create } from "zustand"
import { ToastType } from "../types/types"

type ToastState = {
    toastState : ToastType[]
    setToastState: (newSelection: ToastType[]) => void 
    removeToast: (toast: ToastType) => void
}

export const useToastState = create<ToastState>((set) => ({
    toastState : [],
    setToastState: (newSelection: ToastType[]) => set({toastState: newSelection}),
    removeToast: (toast: ToastType) => set((state) => ({
        toastState: state.toastState.filter((item) => item !== toast)
    }))
}))