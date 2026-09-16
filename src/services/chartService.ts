import { http } from "@/src/http/client"
import { ChartPeriod, ChartResponse } from "@/src/types/types"

export function chartQueryKey(chartUrl: string, period: ChartPeriod) {
  return ["chart", chartUrl, period]
}

export async function getChartData(chartUrl: string, period: ChartPeriod) {
  const separator = chartUrl.includes("?") ? "&" : "?"
  const response = await http<ChartResponse>(`${chartUrl}${separator}period=${period}`, undefined, { method: "GET" })

  return response.data.points
}
