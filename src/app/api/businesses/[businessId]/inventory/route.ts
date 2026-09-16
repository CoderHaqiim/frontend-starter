import { inventoryByBusinessId } from "@/src/data/inventory"
import { NextResponse } from "next/server"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ businessId: string }> }
) {
  const { businessId } = await params

  return NextResponse.json(inventoryByBusinessId[businessId] ?? [])
}
