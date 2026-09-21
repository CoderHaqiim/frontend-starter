import { getInventoryStatus, inventoryByBusinessId } from "@/src/data/inventory"
import { NextResponse } from "next/server"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ businessId: string }> }
) {
  const { businessId } = await params

  const inventoryItems = (inventoryByBusinessId[businessId] ?? []).map((item) => ({
    ...item,
    Status: getInventoryStatus(item.Stock),
  }))

  return NextResponse.json(inventoryItems)
}
