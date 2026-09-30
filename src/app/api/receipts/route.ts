import type { ReceiptRoutePayload } from "@/src/types/types"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ReceiptRoutePayload

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
