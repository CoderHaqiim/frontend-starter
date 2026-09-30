import { account } from "@/src/data/account"
import { receipts } from "@/src/data/receipts"
import { parseAmount } from "@/src/utils/amount"
import { formatWholeAmount } from "@/src/utils/formatAmount"
import { NextResponse } from "next/server"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ businessId: string }> }
) {
  const { businessId } = await params

  const businessReceipts = receipts.filter((receipt) => receipt.businessId === businessId)

  const totalAmount = businessReceipts.reduce(
    (total, receipt) => total + parseAmount(receipt.amount),
    0
  )
  const paidAmount = businessReceipts
    .filter((receipt) => receipt.customer.paymentStatus === "paid")
    .reduce((total, receipt) => total + parseAmount(receipt.amount), 0)
  const overdueAmount = businessReceipts
    .filter((receipt) => receipt.customer.paymentStatus === "overdue")
    .reduce((total, receipt) => total + parseAmount(receipt.amount), 0)
  // A receipt only carries a payment status once one has been set, so a receipt
  // without a status is counted as outstanding.
  const outstandingAmount = businessReceipts
    .filter((receipt) => !receipt.customer.paymentStatus
      || receipt.customer.paymentStatus === "pending")
    .reduce((total, receipt) => total + parseAmount(receipt.amount), 0)

  return NextResponse.json({
    kpis: [
      {
        id: "totalReceipts",
        title: "Total Receipts",
        value: String(businessReceipts.length),
        meaning: "Total number of receipts",
        description: `${businessReceipts.length} customers`,
      },
      {
        id: "totalMoney",
        title: "Total Amount",
        value: formatWholeAmount(account.currency, totalAmount),
        meaning: "Total amount received",
      },
      {
        id: "outstanding",
        title: "Outstanding",
        value: formatWholeAmount(account.currency, outstandingAmount),
        meaning: "Pending receipt value",
      },
      {
        id: "overdue",
        title: "Overdue",
        value: formatWholeAmount(account.currency, overdueAmount),
        meaning: "Overdue receipt value",
      },
      {
        id: "paid",
        title: "Paid",
        value: formatWholeAmount(account.currency, paidAmount),
        meaning: "Collected receipt value",
      },
    ],
  })
}
