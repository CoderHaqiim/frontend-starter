import { account } from "@/src/data/account"
import { invoices } from "@/src/data/invoices"
import { parseAmount } from "@/src/utils/amount"
import { formatWholeAmount } from "@/src/utils/formatAmount"
import { NextResponse } from "next/server"

export async function GET() {

  const sentInvoices = invoices.map((invoice) => ({
    amount: parseAmount(invoice.amount),
    paymentStatus: invoice.customer.paymentStatus,
  }))

  const totalAmount = sentInvoices
    .reduce((total, invoice) => total + invoice.amount, 0)

  const paidAmount = sentInvoices
    .filter((invoice) => invoice.paymentStatus === "paid")
    .reduce((total, invoice) => total + invoice.amount, 0)

  const overdueAmount = sentInvoices
    .filter((invoice) => invoice.paymentStatus === "overdue")
    .reduce((total, invoice) => total + invoice.amount, 0)

  const outstandingAmount = sentInvoices
    .filter((invoice) => invoice.paymentStatus === "pending")
    .reduce((total, invoice) => total + invoice.amount, 0)
  const customerCount = sentInvoices.length

  return NextResponse.json({
    kpis: [
      {
        id: "totalInvoices",
        title: "Total Invoices",
        value: String(invoices.length),
        meaning: "Total number of sent invoices",
        description: `${customerCount} customers`,
      },
      {
        id: "totalMoney",
        title: "Total Amount",
        value: formatWholeAmount(account.currency, totalAmount),
        meaning: "Total amount of sent invoices",
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