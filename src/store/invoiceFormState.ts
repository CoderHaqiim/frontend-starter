import { create } from "zustand"

type InvoiceFormState = {
  isOpen: boolean
  openInvoice: () => void
  closeInvoice: () => void
}

export const useInvoiceFormState = create<InvoiceFormState>((set) => ({
  isOpen: false,
  openInvoice: () => set({ isOpen: true }),
  closeInvoice: () => set({ isOpen: false }),
}))
