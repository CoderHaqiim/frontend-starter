import { invoices } from "@/src/data/invoices"
import { NextResponse } from "next/server"

type InvoiceItemPayload = {
  id?: string
  name?: string
  description?: string
  quantity?: number | string
  price?: number | string
  amount?: number | string
}

// Payload submitted by the create invoice form.
// "discount" and "vat" arrive as the percentages typed on the form, and the
// line items are the source of truth for the money figures.
export type CreateInvoicePayload = {
  template?: string
  businessId?:string
  customer?: {
    name?: string
    email?: string
    address?: string
  }
  currency?: string
  items?: InvoiceItemPayload[]
  amount?: number | string
  subtotal?: number | string
  discount?: number | string
  vat?: number | string
  total?: number | string
  issueDate?: string
  dueDate?: string
}

const roundAmount = (amount: number) => Math.round(amount * 100) / 100

const toNumber = (value: unknown) => {
  const parsed = Number(value)

  return Number.isFinite(parsed) ? parsed : 0
}

const toText = (value: unknown) => (typeof value === "string" ? value.trim() : "")

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

const parseItems = (items: InvoiceItemPayload[] = []) =>
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
    const body = (await request.json()) as CreateInvoicePayload
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
