import { create } from "zustand"

export type InvoiceDraft = {
  customer: string
  customerEmail: string
  customerAddress: string
  amount: string
  issueDate: string
  dueDate: string
  vat: string
  discount: string
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

const getItemAmount = (item: Pick<InvoiceItem, "quantity" | "price">) =>
  item.quantity * item.price

const roundAmount = (amount: number) => Math.round(amount * 100) / 100

export const getItemsSubtotal = (items: Pick<InvoiceItem, "amount">[]) =>
  roundAmount(items.reduce((subtotal, item) => subtotal + item.amount, 0))

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
  items: InvoiceItem[]
  addItem: (item: InvoiceItemDraft) => void
  removeItem: (id: string) => void
}

export const useInvoiceDraft = create<InvoiceDraftState>((set) => ({
  customer: "",
  customerEmail: "",
  customerAddress: "",
  amount: "",
  issueDate: "",
  dueDate: "",
  vat: "0",
  discount: "0",
  items: [],

  setInvoiceField: (field, value) => set({ [field]: value } as Partial<InvoiceDraftState>),
  addItem: (item) => set((state) => withItemsAmount([
    ...state.items,
    {
      id: getNextItemId(state.items),
      ...item,
      amount: roundAmount(getItemAmount(item)),
    },
  ])),
  removeItem: (id) => set((state) =>
    withItemsAmount(state.items.filter((item) => item.id !== id)),
  ),
}))
