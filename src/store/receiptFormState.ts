import { create } from "zustand"

type ReceiptFormState = {
  isOpen: boolean
  openReceipt: () => void
  closeReceipt: () => void
}

export const useReceiptFormState = create<ReceiptFormState>((set) => ({
  isOpen: false,
  openReceipt: () => set({ isOpen: true }),
  closeReceipt: () => set({ isOpen: false }),
}))
