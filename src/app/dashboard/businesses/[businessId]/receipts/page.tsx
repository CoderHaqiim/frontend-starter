"use client"

import ReceiptHeader from "@/src/components/app/receiptHeader"
import ReceiptLine from "@/src/components/app/receiptLine"
import Section from "@/src/components/base/layout/section"
import Dropdown from "@/src/components/base/ui/composites/dropdown"
import List from "@/src/components/base/ui/composites/list"
import Button from "@/src/components/base/ui/primitives/button"
import Frame from "@/src/components/base/ui/primitives/frame"
import Heading from "@/src/components/base/ui/primitives/heading"
import Paragraph from "@/src/components/base/ui/primitives/paragraph"
import type { Receipt } from "@/src/data/receipts"
import { deleteReceipt, getReceiptKpis, getReceipts, receiptKpisQueryKey, receiptsQueryKey } from "@/src/services/receiptService"
import { useReceiptDraft } from "@/src/store/receiptDraftState"
import { useReceiptFormState } from "@/src/store/receiptFormState"
import { useToastState } from "@/src/store/toastState"
import type { ToastType } from "@/src/types/types"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useParams, useRouter } from "next/navigation"
import { useMemo, useState } from "react"

// Stable empty fallback. A fresh `[]` literal on every render would change the
// query data reference each time and retrigger consumers.
const EMPTY_RECEIPTS: Receipt[] = []

export default function ReceiptsPage() {
  const { businessId } = useParams<{ businessId: string }>()
  const router = useRouter()
  const queryClient = useQueryClient()
  const { data } = useQuery({
    queryKey: receiptsQueryKey(businessId),
    queryFn: () => getReceipts(businessId),
    enabled: Boolean(businessId),
  })
  const receipts = data ?? EMPTY_RECEIPTS
  useQuery({
    queryKey: receiptKpisQueryKey(businessId),
    queryFn: () => getReceiptKpis(businessId),
    select: (response) => response.kpis,
  })
  const [selectedReceiptFilter, setSelectedReceiptFilter] = useState("all")
  const openReceipt = useReceiptFormState((state) => state.openReceipt)
  const setDraftState = useReceiptDraft.setState
  const { toastState, setToastState } = useToastState()

  const showToast = (toast: ToastType) => {
    setToastState([...toastState, toast])
  }

  const filteredReceipts = useMemo(() => {
    if (selectedReceiptFilter === "all") {
      return receipts
    }

    return receipts.filter((receipt) => receipt.customer.amount === selectedReceiptFilter)
  }, [receipts, selectedReceiptFilter])

  const handleReceiptFilterChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedReceiptFilter(event.target.value)
  }

  const createReceipt = () => {
    openReceipt()
  }

  const handleViewReceipt = (receiptId: string) => {
    const receipt = receipts.find((item) => item.id === receiptId)

    if (!receipt) return

    setDraftState({
      receiptNo: receipt.id,
      customer: receipt.customer.name,
      customerEmail: receipt.customer.email,
      amount: String(receipt.total),
      currency: receipt.currency,
      paymentDate: receipt.paymentDate,
      template: receipt.template,
      items: receipt.items.map((item) => ({ ...item })),
    })

    router.push("/dashboard/view-receipt")
  }

  const handleDeleteReceipt = async (receiptId: string) => {
    try {
      // Sends the delete request through the http client. The API removes the
      // receipt from the shared receipt store, so the list and KPI routes
      // reflect the deletion on their next fetch.
      await deleteReceipt(businessId, receiptId)

      // Remove the receipt from the query cache so the list reflects the
      // deletion immediately, then refetch the KPIs from the server.
      queryClient.setQueryData<Receipt[]>(
        receiptsQueryKey(businessId),
        (currentReceipts) =>
          (currentReceipts ?? []).filter((receipt) => receipt.id !== receiptId),
      )
      queryClient.invalidateQueries({ queryKey: receiptKpisQueryKey(businessId) })

      showToast({
        variant: "success",
        title: "Receipt deleted",
        message: `Receipt ${receiptId} was deleted successfully.`,
      })
    } catch (error) {
      console.error("Failed to delete the receipt:", error)

      showToast({
        variant: "error",
        title: "Delete failed",
        message: "The receipt could not be deleted. Please try again.",
      })
    }
  }

  return (
    <Frame className="w-full h-max flex flex-col">
      <Section>
        <Frame className="justify-between">
          <Frame className="gap-[var(--space-xs)] h-max flex-col">
            <Heading size="xl" type="h1">Receipts</Heading>
            <Paragraph size="sm" weight="light">
              Create, manage and track your receipts.
            </Paragraph>
          </Frame>

          <Frame>
            <Button
              variant="fill"
              size="sm"
              iconPosition="left"
              iconName="icon-plus"
              func={createReceipt}
            >
              New Receipt
            </Button>
          </Frame>
        </Frame>
      </Section>

      <Section>
        <Frame className="w-full h-max flex flex-col gap-[var(--space-md)]">
          <Frame className="w-full h-max flex items-center justify-between">
            <Heading size="md" type="h2">Receipts</Heading>

            <Dropdown
              name="receiptFilter"
              width="max-content"
              defaultValue="all"
              value={selectedReceiptFilter}
              options={["all"]}
              size="sm"
              formFunc={handleReceiptFilterChange}
            />
          </Frame>

          <Frame className="w-full h-full">
            <List width="stretch" height="stretch" scroll="hidden">
              <ReceiptHeader />
              {filteredReceipts.map((receipt) => (
                <ReceiptLine
                  key={receipt.id}
                  receipt={receipt}
                  onView={handleViewReceipt}
                  onDelete={handleDeleteReceipt}
                />
              ))}
            </List>
          </Frame>
        </Frame>
      </Section>
    </Frame>
  )
}
