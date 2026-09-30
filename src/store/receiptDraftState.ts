import type { LineItem } from "@/src/types/types"
import { getItemAmount, roundAmount, sumLineItems } from "@/src/utils/amount"
import { create } from "zustand"

export type ReceiptDraft = {
  receiptNo: string
  customer: string
  customerEmail: string
  // Derived from the item lines by the store, so it is never typed in by hand.
  amount: string
  currency: string
  paymentDate: string
  template: string
}

export type ReceiptItemDraft = Omit<LineItem, "id" | "amount">

const getNextItemId = (items: LineItem[]) => {
  const highestId = items.reduce((highest, item) => {
    const numericId = Number(item.id.replace(/\D/g, ""))

    return Number.isNaN(numericId) ? highest : Math.max(highest, numericId)
  }, 0)

  return `item-${highestId + 1}`
}

const withItemsAmount = (items: LineItem[]) => ({
  items,
  amount: items.length > 0 ? String(sumLineItems(items)) : "",
})

type ReceiptDraftState = ReceiptDraft & {
  setReceiptField: (field: keyof ReceiptDraft, value: string) => void
  resetDraft: () => void
  items: LineItem[]
  addItem: (item: ReceiptItemDraft) => void
  updateItem: (id: string, item: ReceiptItemDraft) => void
  removeItem: (id: string) => void
}

export const initialReceiptDraft: ReceiptDraft = {
  receiptNo: "",
  customer: "",
  customerEmail: "",
  amount: "",
  currency: "NGN",
  paymentDate: "",
  template: "receipt-1",
}

export const useReceiptDraft = create<ReceiptDraftState>((set) => ({
  ...initialReceiptDraft,
  items: [],

  setReceiptField: (field, value) =>
    set({ [field]: value } as Partial<ReceiptDraftState>),
  resetDraft: () => set({ ...initialReceiptDraft, items: [] }),
  addItem: (item) =>
    set((state) =>
      withItemsAmount([
        ...state.items,
        {
          id: getNextItemId(state.items),
          ...item,
          amount: roundAmount(getItemAmount(item)),
        },
      ]),
    ),
  updateItem: (id: string, item: ReceiptItemDraft) =>
    set((state) =>
      withItemsAmount(
        state.items.map((existingItem) =>
          existingItem.id === id
            ? {
                ...existingItem,
                ...item,
                amount: roundAmount(getItemAmount(item)),
              }
            : existingItem,
        ),
      ),
    ),
  removeItem: (id: string) =>
    set((state) => withItemsAmount(state.items.filter((item) => item.id !== id))),
}))
