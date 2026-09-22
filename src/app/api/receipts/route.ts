import { NextResponse } from "next/server"

export type ReceiptItemPayload = {
  id?: string
  name?: string
  description?: string
  quantity?: number | string
  price?: number | string
  amount?: number | string
}

// Payload submitted by the create receipt form.
export type CreateReceiptPayload = {
  template?: string
  businessId?: string
  customer?: {
    name?: string
    email?: string
  }
  currency?: string
  items?: ReceiptItemPayload[]
  amount?: string
  subtotal?: number | string
  paymentDate?: string
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CreateReceiptPayload

    console.log("Create receipt payload received:", body)

    const receiptNo = `RCP-${Date.now().toString().slice(-4)}`

    return NextResponse.json({
      message: "Receipt received successfully",
      data: {
        receiptNo,
      },
    })
  } catch (error) {
    console.error("Failed to parse create receipt payload:", error)

    return NextResponse.json(
      { message: "Invalid JSON payload" },
      { status: 400 },
    )
  }
}

export async function GET() {
  return NextResponse.json({ message: "Receipts API" })
}
