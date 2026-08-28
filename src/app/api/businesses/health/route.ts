import { NextResponse } from "next/server"
import { businessHealth } from "@/src/data/businessHealth"
import { Duration } from "@/src/types/types"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const period = (searchParams.get("period") ?? "weekly") as Duration

  return NextResponse.json(
    businessHealth.filter(item => item.period === period)
  )
}
