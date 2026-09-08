import { invoices } from "@/src/data/invoices"
import { NextResponse } from "next/server"

const parseAmount = (amount: string) => Number(amount.replace(/[^0-9.-]+/g, ""))

const formatAmount = (amount: number) => `$${amount.toLocaleString()}`

export async function GET() {
  const sentInvoices = invoices.flatMap((invoice) =>
    invoice.sentTo.map((recipient) => ({
      amount: parseAmount(invoice.amount),
      paymentStatus: recipient.paymentStatus,
    }))
  )

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
  const recipientCount = sentInvoices.length

  return NextResponse.json({
    kpis: [
      {
        id: "totalInvoices",
        title: "Total Invoices",
        value: String(invoices.length),
        meaning: "Total number of sent invoices",
        description: `${recipientCount} recipients`,
      },
      {
        id: "totalMoney",
        title: "Total Amount",
        value: formatAmount(totalAmount),
        meaning: "Total amount of sent invoices",
      },
      {
        id: "outstanding",
        title: "Outstanding",
        value: formatAmount(outstandingAmount),
        meaning: "Unpaid invoice amount",
      },
      {
        id: "overdue",
        title: "Overdue",
        value: formatAmount(overdueAmount),
        meaning: "Overdue invoice amount",
      },
      {
        id: "paid",
        title: "Paid",
        value: formatAmount(paidAmount),
        meaning: "Paid invoice amount",
      },
    ],
  })
}