"use client"

import { businessesQueryKey, getBusinesses } from "@/src/services/businessService"
import { useBackdropState } from "@/src/store/backdropState"
import { useQuery } from "@tanstack/react-query"
import Card from "../../base/ui/composites/card"
import Button from "../../base/ui/primitives/button"
import Frame from "../../base/ui/primitives/frame"
import Heading from "../../base/ui/primitives/heading"
import { useTheme } from "../../providers/themeProvider"
import CreateTransactionForm from "../forms/createTransaction"

type QuickAction = {
  label: string
  open: () => void
}

export default function QuickActions() {
  const { setBackdropContent, setBackdropOpen } = useBackdropState()
  const { colors } = useTheme()
  const { data: businesses = [] } = useQuery({
    queryKey: businessesQueryKey,
    queryFn: getBusinesses,
  })
  const businessId = businesses[0]?.id ?? ""

  const openBackdrop = (content: string) => {
    setBackdropOpen(true)
    setBackdropContent(content)
  }

  const createTransaction = () => {
    if (!businessId) return

    setBackdropContent(<CreateTransactionForm businessId={businessId} />)
    setBackdropOpen(true)
  }

  const actions: QuickAction[] = [
    { label: "New Task", open: () => openBackdrop("create-task-form") },
    { label: "Add Customer", open: () => openBackdrop("create-customer-form") },
    { label: "Add inventory item", open: () => openBackdrop("create-inventory-item-form") },
    { label: "New Invoice", open: () => openBackdrop("create-invoice-form") },
    { label: "New Receipt", open: () => openBackdrop("create-receipt-form") },
    { label: "Add Transaction", open: createTransaction },
  ]

  return (
    <Card padding="lg" rounded="md" width="300px" height="max-content">
      <Frame className="pb-[var(--space-sm)] mb-[var(--space-sm)] flex w-full h-max items-center justify-between">
        <Heading type="h2" size="sm">Quick Actions</Heading>
      </Frame>

      <Frame className="flex w-full h-max flex-row flex-wrap gap-[var(--space-sm)]">
        {
          actions.map((action) => (
            <Button
              key={action.label}
              variant="outline"
              size="xs"
              width="max-content"
              iconName={action.label === "Edit Business" ? "icon-pencil" : "icon-plus"}
              func={action.open}
              justify="start"
            >
              {action.label}
            </Button>
          ))
        }
      </Frame>
    </Card>
  )
}
