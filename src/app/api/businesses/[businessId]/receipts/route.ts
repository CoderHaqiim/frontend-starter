import { receipts } from "@/src/data/receipts"
import { NextResponse } from "next/server"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ businessId: string }> }
) {
  const { businessId } = await params

  return NextResponse.json(
    receipts.filter((receipt) => receipt.businessId === businessId)
  )
}
