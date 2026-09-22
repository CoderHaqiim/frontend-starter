"use client"

/*
 * TEMPORARY verification page. Hydrates the real receipt draft store and renders
 * the real ViewReceipt component so the sticky header stacking can be measured in
 * a browser. Delete this route once the visual check is done.
 */
import ViewReceipt from "@/src/components/app/viewReceipt"
import { ReceiptItem, useReceiptDraft } from "@/src/store/receiptDraftState"
import { useSelectedBusiness } from "@/src/store/selectedBusinessState"
import { useEffect, useState } from "react"

const unitPrice = 25000

const items: ReceiptItem[] = Array.from({ length: 12 }, (_, index) => ({
  id: `item-${index + 1}`,
  name: `Consulting service ${index + 1}`,
  description: "Monthly retainer",
  quantity: 1,
  price: unitPrice,
  amount: unitPrice,
}))

export default function TmpScrollCheckPage() {
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    useReceiptDraft.setState({
      receiptNo: "RCP-0001",
      customer: "Ada Okafor",
      customerEmail: "ada@example.com",
      currency: "NGN",
      amount: String(items.length * unitPrice),
      paymentDate: "2026-09-21",
      template: "receipt-1",
      items,
    })

    useSelectedBusiness.setState({
      selectedBusiness: {
        id: "biz-1",
        businessName: "BrightWorks Ltd",
        tagLine: "Operations and consulting",
        email: "hello@brightworks.test",
        phone: "+234 801 000 0000",
        address: "12 Marina Road",
        website: "brightworks.test",
        industry: "Consulting",
        establishedYear: 2018,
        country: "Nigeria",
        state: "Lagos",
        customers: 42,
        health: "healthy",
        healthScore: 82,
      },
    })

    setIsHydrated(true)
  }, [])

  if (!isHydrated) return null

  return <ViewReceipt />
}