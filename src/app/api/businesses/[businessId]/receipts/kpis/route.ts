import { receipts } from "@/src/data/receipts"
import { NextResponse } from "next/server"

const parseAmount = (amount: string) => Number(amount.replace(/[^0-9.-]+/g, ""))

const formatAmount = (amount: number) => `$${amount.toLocaleString()}`

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ businessId: string }> }
) {
  const { businessId } = await params
  const businessReceipts = receipts.filter((receipt) => receipt.businessId === businessId)

  const sentReceipts = businessReceipts.flatMap((receipt) =>
    receipt.sentTo.map((recipient) => ({
      amount: parseAmount(recipient.amount),
      paymentStatus: recipient.paymentStatus,
    }))
  )

  const totalAmount = sentReceipts.reduce((total, receipt) => total + receipt.amount, 0)
  const paidAmount = sentReceipts
    .filter((receipt) => receipt.paymentStatus === "paid")
    .reduce((total, receipt) => total + receipt.amount, 0)
  const overdueAmount = sentReceipts
    .filter((receipt) => receipt.paymentStatus === "overdue")
    .reduce((total, receipt) => total + receipt.amount, 0)
  const outstandingAmount = sentReceipts
    .filter((receipt) => receipt.paymentStatus === "pending")
    .reduce((total, receipt) => total + receipt.amount, 0)
  const recipientCount = sentReceipts.length

  return NextResponse.json({
    kpis: [
      {
        id: "totalReceipts",
        title: "Total Receipts",
        value: String(businessReceipts.length),
        meaning: "Total number of receipts",
        description: `${recipientCount} recipients`,
      },
      {
        id: "totalMoney",
        title: "Total Amount",
        value: formatAmount(totalAmount),
        meaning: "Total amount received",
      },
      {
        id: "outstanding",
        title: "Outstanding",
        value: formatAmount(outstandingAmount),
        meaning: "Pending receipt value",
      },
      {
        id: "overdue",
        title: "Overdue",
        value: formatAmount(overdueAmount),
        meaning: "Overdue receipt value",
      },
      {
        id: "paid",
        title: "Paid",
        value: formatAmount(paidAmount),
        meaning: "Collected receipt value",
      },
    ],
  })
}
