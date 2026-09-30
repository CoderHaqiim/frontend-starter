import { account } from "@/src/data/account"
import { invoices } from "@/src/data/invoices"
import { parseAmount } from "@/src/utils/amount"
import { formatWholeAmount } from "@/src/utils/formatAmount"
import { NextResponse } from "next/server"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ businessId: string }> }
) {
  const { businessId } = await params

  const businessInvoices = invoices.filter((invoice) => invoice.businessId === businessId)
  const totalAmount = businessInvoices.reduce((total, invoice) => total + parseAmount(invoice.amount), 0)
  const paidAmount = businessInvoices
    .filter((invoice) => invoice.customer.paymentStatus === "paid")
    .reduce((total, invoice) => total + parseAmount(invoice.amount), 0)
  const overdueAmount = businessInvoices
    .filter((invoice) => invoice.customer.paymentStatus === "overdue")
    .reduce((total, invoice) => total + parseAmount(invoice.amount), 0)
  const outstandingAmount = businessInvoices
    .filter((invoice) => invoice.customer.paymentStatus === "pending")
    .reduce((total, invoice) => total + parseAmount(invoice.amount), 0)

  return NextResponse.json({
    kpis: [
      {
        id: "totalInvoices",
        title: "Total Invoices",
        value: String(businessInvoices.length),
        meaning: "Total invoices for this business",
        description: `${businessInvoices.length} customers`,
      },
      {
        id: "totalMoney",
        title: "Total Amount",
        value: formatWholeAmount(account.currency, totalAmount),
        meaning: "Total amount of this business's invoices",
      },
      {
        id: "outstanding",
        title: "Outstanding",
        value: formatWholeAmount(account.currency, outstandingAmount),
        meaning: "Unpaid invoice amount",
      },
      {
        id: "overdue",
        title: "Overdue",
        value: formatWholeAmount(account.currency, overdueAmount),
        meaning: "Overdue invoice amount",
      },
      {
        id: "paid",
        title: "Paid",
        value: formatWholeAmount(account.currency, paidAmount),
        meaning: "Paid invoice amount",
      },
    ],
  })
}
