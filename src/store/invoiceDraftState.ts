import { create } from "zustand"

export type InvoiceDraft = {
  customer: string
  customerEmail: string
  customerAddress: string
  amount: string
  currency: string
  issueDate: string
  dueDate: string
  vat: string
  discount: string
  invoiceNo: string
  template: string
}

export type InvoiceItem = {
  id: string
  name: string
  description: string
  quantity: number
  price: number
  amount: number
}

export type InvoiceItemDraft = Omit<InvoiceItem, "id" | "amount">

const getItemAmount = (item: Pick<InvoiceItem, "quantity" | "price">) => item.quantity * item.price
const roundAmount = (amount: number) => Math.round(amount * 100) / 100
export const getItemsSubtotal = (items: Pick<InvoiceItem, "amount">[]) => roundAmount(items.reduce((subtotal, item) => subtotal + item.amount, 0))

const getNextItemId = (items: InvoiceItem[]) => {
  const highestId = items.reduce((highest, item) => {
    const numericId = Number(item.id.replace(/\D/g, ""))

    return Number.isNaN(numericId) ? highest : Math.max(highest, numericId)
  }, 0)

  return `item-${highestId + 1}`
}

const withItemsAmount = (items: InvoiceItem[]) => ({
  items,
  amount: items.length > 0 ? String(getItemsSubtotal(items)) : "",
})





type InvoiceDraftState = InvoiceDraft & {
  setInvoiceField: (field: keyof InvoiceDraft, value: string) => void
  resetDraft: () => void
  items: InvoiceItem[]
  addItem: (item: InvoiceItemDraft) => void
  updateItem: (id: string, item: InvoiceItemDraft) => void
  removeItem: (id: string) => void
}

// A blank draft. Also used to clear the form so every new invoice starts fresh.
export const initialInvoiceDraft: InvoiceDraft = {
  customer: "",
  customerEmail: "",
  customerAddress: "",
  amount: "",
  currency: "NGN",
  issueDate: "",
  dueDate: "",
  vat: "0",
  discount: "0",
  invoiceNo: "",
  template: "invoice-1",
}

export const useInvoiceDraft = create<InvoiceDraftState>((set) => ({
  ...initialInvoiceDraft,
  items: [],

  setInvoiceField: (field, value) => set({ [field]: value } as Partial<InvoiceDraftState>),
  resetDraft: () => set({ ...initialInvoiceDraft, items: [] }),
  addItem: (item) => set((state) => withItemsAmount([
    ...state.items,
    {
      id: getNextItemId(state.items),
      ...item,
      amount: roundAmount(getItemAmount(item)),
    },
  ])),
  updateItem: (id, item) => set((state) => withItemsAmount(
    state.items.map((existingItem) => existingItem.id === id
      ? {
          ...existingItem,
          ...item,
          amount: roundAmount(getItemAmount(item)),
        }
      : existingItem,
    ),
  )),
  removeItem: (id) => set((state) =>
    withItemsAmount(state.items.filter((item) => item.id !== id)),
  ),
}))
