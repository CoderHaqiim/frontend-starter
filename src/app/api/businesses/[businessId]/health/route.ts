import { NextResponse } from "next/server"
import { Duration } from "@/src/types/types"
import { businessHealthRecords, toBusinessHealthResponse } from "@/src/utils/businessHealthResponse"

export async function GET(request: Request, { params }: { params: Promise<{ businessId: string }> }) {
  const { businessId } = await params
  const { searchParams } = new URL(request.url)
  const period = (searchParams.get("period") ?? "weekly") as Duration

  const health = businessHealthRecords.find(item => item.businessId === businessId && item.period === period)

  if (!health) {
    return NextResponse.json(
      { message: "Business health not found" },
      { status: 404 }
    )
  }

  return NextResponse.json(toBusinessHealthResponse(health))
}
