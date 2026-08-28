import { NextResponse } from "next/server"
import { businessHealth } from "@/src/data/businessHealth"
import { Duration } from "@/src/types/types"

export async function GET(request: Request, { params }: { params: Promise<{ businessId: string }> }) {
  const { businessId } = await params
  const { searchParams } = new URL(request.url)
  const period = (searchParams.get("period") ?? "weekly") as Duration

  const health = businessHealth.find(item => item.businessId === businessId && item.period === period)

  if (!health) {
    return NextResponse.json(
      { message: "Business health not found" },
      { status: 404 }
    )
  }

  return NextResponse.json(health)
}
