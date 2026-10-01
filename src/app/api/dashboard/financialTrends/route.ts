import { getFinancialTrends } from "@/src/data/financialTrends"
import { ChartPeriod } from "@/src/types/types"
import { NextRequest, NextResponse } from "next/server";

const chartPeriods: ChartPeriod[] = ["7d", "30d", "12m"]

// The trend chart for the dashboard: every business's transactions bucketed into
// the days or months the period measures. A period with too little recorded to
// draw answers with no points, which the chart reports as not enough data.
export async function GET(request: NextRequest) {
  const period = request.nextUrl.searchParams.get("period") as ChartPeriod | null;

  if (!period || !chartPeriods.includes(period)) {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid period. Use 7d, 30d, or 12m.",
      },
      { status: 400 }
    );
  }

  return NextResponse.json({
    success: true,
    data: {
      period,
      points: getFinancialTrends(period),
    },
  });
}
