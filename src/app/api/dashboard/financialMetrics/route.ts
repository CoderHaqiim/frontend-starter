import { getGeneralKpis } from "@/src/data/kpis"
import { Duration } from "@/src/types/types"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest){
  const period = request.nextUrl.searchParams.get("period") as Duration | null
  const selectedPeriod = period ?? "monthly"

  if (!["weekly", "monthly", "annual"].includes(selectedPeriod)) {
    return NextResponse.json(
      { message: "Invalid period. Use weekly, monthly, or annual." },
      { status: 400 }
    )
  }

  return NextResponse.json(getGeneralKpis(selectedPeriod))
}
