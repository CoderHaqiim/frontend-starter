import { getFinancialTrends } from "@/src/data/financialTrends"
import { ChartPeriod } from "@/src/types/types"
import {
  badRequestResponse,
  businessNotFoundResponse,
  findBusiness,
} from "@/src/utils/mockApi"
import { NextResponse } from "next/server"

const chartPeriods: ChartPeriod[] = ["7d", "30d", "12m"]

// The trend chart for one business: its own transactions bucketed into the days
// or months the period measures. A period with too little recorded to draw
// answers with no points, which the chart reports as not enough data.
export async function GET(
  request: Request,
  { params }: { params: Promise<{ businessId: string }> }
) {
  const { businessId } = await params

  if (!findBusiness(businessId)) {
    return businessNotFoundResponse()
  }

  const period = new URL(request.url).searchParams.get("period") as ChartPeriod | null

  if (!period || !chartPeriods.includes(period)) {
    return badRequestResponse("Invalid period. Use 7d, 30d, or 12m.")
  }

  return NextResponse.json({
    success: true,
    data: {
      period,
      points: getFinancialTrends(period, businessId),
    },
  })
}
