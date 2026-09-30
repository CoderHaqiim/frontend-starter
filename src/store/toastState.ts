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

// Shows a toast. Every page and form that reports the outcome of a save calls
// this, so the list the toast bar reads is appended to in one place instead of
// being spread by hand at each call site.
export function useShowToast() {
    const { toastState, setToastState } = useToastState()

    return (toast: ToastType) => setToastState([...toastState, toast])
}
