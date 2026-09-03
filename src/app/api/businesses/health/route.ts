import { NextResponse } from "next/server"
import { Duration } from "@/src/types/types"
import { businessHealthRecords, toBusinessHealthResponse } from "@/src/utils/businessHealthResponse"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const period = (searchParams.get("period") ?? "weekly") as Duration

  return NextResponse.json(
    businessHealthRecords
      .filter(item => item.period === period)
      .map(toBusinessHealthResponse)
  )
}
