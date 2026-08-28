import { NextRequest, NextResponse } from "next/server";
import { financialTrends } from "@/src/data/financialTrends";

type Period = "7d" | "30d" | "12m";

export async function GET(request: NextRequest) {
  const period = request.nextUrl.searchParams.get("period") as Period;

  if (!period || !financialTrends[period]) {
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
      points: financialTrends[period],
    },
  });
}
