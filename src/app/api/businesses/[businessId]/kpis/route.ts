import { businessKpiSummaries } from "@/src/data/kpis"
import { Duration } from "@/src/types/types"
import { NextResponse } from "next/server"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ businessId: string }> }
) {
  const { businessId } = await params
  const { searchParams } = new URL(request.url)
  const period = searchParams.get("period") as Duration | null
  const selectedPeriod = period ?? "monthly"

  if (!["weekly", "monthly", "annual"].includes(selectedPeriod)) {
    return NextResponse.json(
      { message: "Invalid period. Use weekly, monthly, or annual." },
      { status: 400 }
    )
  }

  const kpis = businessKpiSummaries[selectedPeriod].find(item => item.businessId === businessId)

  if (!kpis) {
    return NextResponse.json(
      { message: "Business KPIs not found" },
      { status: 404 }
    )
  }

  return NextResponse.json(kpis)
}
