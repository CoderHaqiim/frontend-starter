import { invoices } from "@/src/data/invoices"
import type { InvoiceRoutePayload, LineItemPayload } from "@/src/types/types"
import { roundAmount } from "@/src/utils/amount"
import { toNumber, toText } from "@/src/utils/mockApi"
import { NextResponse } from "next/server"

// Keeps the console readable when the business logo was uploaded as a data URL.
const getLoggableLogo = (logo: string) =>
  logo.startsWith("data:") ? `${logo.slice(0, 24)}...(${logo.length} characters)` : logo

const getNextInvoiceNo = () => {
  const highestNumber = invoices.reduce((highest, invoice) => {
    const numericId = Number(invoice.id.replace(/\D/g, ""))

    return Number.isNaN(numericId) ? highest : Math.max(highest, numericId)
  }, 0)

  return `INV-${String(highestNumber + 1).padStart(3, "0")}`
}

// Reads the line items the request carries, deriving each amount from the
// quantity and price when the client did not send one.
const parseItems = (items: LineItemPayload[] = []) =>
  items.map((item, index) => {
    const quantity = toNumber(item.quantity)
    const price = toNumber(item.price)
    const amount = roundAmount(toNumber(item.amount) || quantity * price)

    return {
      id: toText(item.id) || `item-${index + 1}`,
      name: toText(item.name),
      description: toText(item.description),
      quantity,
      price: roundAmount(price),
      amount,
    }
  })

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as InvoiceRoutePayload
    const invoice = getNextInvoiceNo()

    return NextResponse.json({
      message: "Invoice received successfully",
      data: {
        invoiceNo: invoice,
      },
    })
  } catch (error) {
    console.error("Failed to parse create invoice payload:", error)

    return NextResponse.json(
      { message: "Invalid JSON payload" },
      { status: 400 }
    )
  }
}

export async function GET() {
  return NextResponse.json(invoices)
}
