"use client"

import ReceiptHeader from "@/src/components/app/receiptHeader"
import ReceiptLine from "@/src/components/app/receiptLine"
import Section from "@/src/components/layout/section"
import Dropdown from "@/src/components/ui/composites/dropdown"
import List from "@/src/components/ui/composites/list"
import Button from "@/src/components/ui/primitives/button"
import Frame from "@/src/components/ui/primitives/frame"
import Heading from "@/src/components/ui/primitives/heading"
import Paragraph from "@/src/components/ui/primitives/paragraph"
import type { Receipt } from "@/src/data/receipts"
import { http } from "@/src/http/client"
import { useBackdropState } from "@/src/store/backdropState"
import type { kpiObjectProps } from "@/src/types/types"
import { useParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"

type ReceiptKpiResponse = {
  kpis: kpiObjectProps[]
}

export default function ReceiptsPage() {
  const { businessId } = useParams<{ businessId: string }>()
  const [receipts, setReceipts] = useState<Receipt[]>([])
  const [receiptKpis, setReceiptKpis] = useState<kpiObjectProps[]>([])
  const [isReceiptKpisLoading, setIsReceiptKpisLoading] = useState(true)
  const [selectedReceiptFilter, setSelectedReceiptFilter] = useState("all")
  const { setBackdropContent, setBackdropOpen } = useBackdropState()

  useEffect(() => {
    if (!businessId) return

    http<Receipt[]>(`/api/businesses/${businessId}/receipts`, undefined, { method: "GET" })
      .then(setReceipts)
      .catch(() => setReceipts([]))
  }, [businessId])

  useEffect(() => {
    if (!businessId) return

    http<ReceiptKpiResponse>(`/api/businesses/${businessId}/receipts/kpis`, undefined, { method: "GET" })
      .then((response) => setReceiptKpis(response.kpis))
      .catch(() => setReceiptKpis([]))
      .finally(() => setIsReceiptKpisLoading(false))
  }, [businessId])

  const filteredReceipts = useMemo(() => {
    if (selectedReceiptFilter === "all") {
      return receipts
    }

    return receipts.reduce<Receipt[]>((filteredReceipts, receipt) => {
      const matchingRecipients = receipt.sentTo.filter(
        (recipient) => recipient.paymentStatus === selectedReceiptFilter
      )

      if (matchingRecipients.length > 0) {
        filteredReceipts.push({
          ...receipt,
          sentTo: matchingRecipients,
        })
      }

      return filteredReceipts
    }, [])
  }, [receipts, selectedReceiptFilter])

  const handleReceiptFilterChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedReceiptFilter(event.target.value)
  }

  const createReceipt = () => {
    setBackdropOpen(true)
    setBackdropContent("create-receipt-form")
  }

  return (
    <Frame className="w-full h-max flex flex-col gap-[var(--space-lg)]">
      <Frame className="w-full h-max flex justify-between">
        <Frame className="w-full h-max flex flex-col gap-[var(--space-xs)]">
          <Heading size="xl" type="h1">Receipts</Heading>
          <Paragraph size="sm" weight="light">
            Create, manage and track your receipts.
          </Paragraph>
        </Frame>

        <Frame>
          <Button
            variant="outline"
            size="sm"
            iconPosition="left"
            iconName="icon-plus"
            func={createReceipt}
          >
            New Receipt
          </Button>
        </Frame>
      </Frame>

      <Section width="stretch">
        <Frame className="w-full h-max flex flex-col gap-[var(--space-md)]">
          <Frame className="w-full h-max flex items-center justify-between">
            <Heading size="md" type="h2">Recent Receipts</Heading>

            <Dropdown
              name="receiptFilter"
              width="max-content"
              defaultValue="all"
              value={selectedReceiptFilter}
              options={["all", "paid", "pending", "overdue", "cancelled"]}
              size="sm"
              formFunc={handleReceiptFilterChange}
            />
          </Frame>

          <Frame className="w-full h-full">
            <List width="stretch" height="stretch" scroll="hidden">
              <ReceiptHeader />
              {filteredReceipts.map((receipt) => (
                <ReceiptLine key={receipt.id} receipt={receipt} />
              ))}
            </List>
          </Frame>
        </Frame>
      </Section>
    </Frame>
  )
}
