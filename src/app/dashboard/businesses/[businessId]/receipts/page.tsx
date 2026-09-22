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
import { getReceiptKpis, getReceipts, receiptKpisQueryKey, receiptsQueryKey } from "@/src/services/receiptService"
import { useReceiptFormState } from "@/src/store/receiptFormState"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "next/navigation"
import { useMemo, useState } from "react"

export default function ReceiptsPage() {
  const { businessId } = useParams<{ businessId: string }>()
  const { data: receipts = [] } = useQuery({
    queryKey: receiptsQueryKey(businessId),
    queryFn: () => getReceipts(businessId),
  })
  useQuery({
    queryKey: receiptKpisQueryKey(businessId),
    queryFn: () => getReceiptKpis(businessId),
    select: (response) => response.kpis,
  })
  const [selectedReceiptFilter, setSelectedReceiptFilter] = useState("all")
  const openReceipt = useReceiptFormState((state) => state.openReceipt)

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
    openReceipt()
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
