import { create } from "zustand"
import { customers } from "../data/customers"

export type MailGroup = {
  id: string
  name: string
  customerIds: string[]
}

const initialMailGroups: MailGroup[] = [
  {
    id: "group-active",
    name: "Active Customers",
    customerIds: customers.filter((customer) => customer.status === "Active").map((customer) => customer.id),
  },
  {
    id: "group-watchlist",
    name: "Watchlist",
    customerIds: customers.filter((customer) => customer.status === "Watchlist").map((customer) => customer.id),
  },
]

type MailGroupState = {
  mailGroups: MailGroup[]
  selectedGroupId: string
  addMailGroup: (group: MailGroup) => void
  setSelectedGroupId: (groupId: string) => void
}

export const useMailGroupState = create<MailGroupState>((set) => ({
  mailGroups: initialMailGroups,
  selectedGroupId: initialMailGroups[0]?.id ?? "",
  addMailGroup: (group) =>
    set((state) => ({
      mailGroups: [group, ...state.mailGroups],
      selectedGroupId: group.id,
    })),
  setSelectedGroupId: (groupId) => set({ selectedGroupId: groupId }),
}))
