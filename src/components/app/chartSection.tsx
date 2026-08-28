"use client"

import { useEffect, useState } from "react"
import { ChartPeriod, ChartResponse, chartTypes } from "@/src/types/types"
import { http } from "@/src/http/client"
import Section from "../layout/section"
import Frame from "../ui/primitives/frame"
import Heading from "../ui/primitives/heading"
import Dropdown from "../ui/composites/dropdown"
import Tooltip from "../ui/composites/tooltip"
import Button from "../ui/primitives/button"
import Chart1 from "../ui/charts/chart1"
import useExtendedChart from "@/src/hooks/extendChart"

type ChartSectionProps = {
  chartUrl: string
}

export default function ChartSection({ chartUrl }: ChartSectionProps) {
  const reportDuration = ["weekly", "monthly", "annual"]
  const chartOptions = ["Line chart", "Bar chart"]
  const [selectedChart, setSelectedChart] = useState<chartTypes>("Line chart")
  const [selectedPeriod, setSelectedPeriod] = useState<ChartPeriod>("7d")
  const [chartData, setChartData] = useState<ChartResponse["data"]["points"]>([])
  const [isChartLoading, setIsChartLoading] = useState(true)
  const { openChart } = useExtendedChart()

  useEffect(() => {
    async function fetchChartData() {
      try {
        setIsChartLoading(true)
        const separator = chartUrl.includes("?") ? "&" : "?"
        const response = await http<ChartResponse>(`${chartUrl}${separator}period=${selectedPeriod}`, undefined, { method: "GET" })
        setChartData(response.data.points)
      } catch (error) {
        console.error("Failed to fetch chart data:", error)
        setChartData([])
      } finally {
        setIsChartLoading(false)
      }
    }

    fetchChartData()
  }, [chartUrl, selectedPeriod])

  const chartChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value as chartTypes
    setSelectedChart(selectedValue)
  }

  const reportChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value

    const periodMap: Record<string, ChartPeriod> = {
      weekly: "7d",
      monthly: "30d",
      annual: "12m",
    }

    setSelectedPeriod(periodMap[value])
  }

  return (
    <Section>
      <Frame className="w-full items-center h-max justify-between mb-[var(--space-md)]">
        <Frame className="flex-col">
          <Heading size="md" type="h2">
            Financial Performance
          </Heading>
        </Frame>

        <Frame className="w-auto h-max items-center gap-[var(--space-sm)]">
          <Dropdown name="chart" size="sm" options={chartOptions} formFunc={chartChangeHandler} />
          <Dropdown name="report" size="sm" options={reportDuration} formFunc={reportChangeHandler} />
          <Tooltip content="expand chart">
            <Button func={() => openChart(chartData, selectedChart, selectedPeriod)} size="sm" variant="outline" isIcon iconName="icon-expand" />
          </Tooltip>
        </Frame>
      </Frame>

      <Chart1 height="auto" fixedRatio variant={selectedChart} data={chartData} isLoading={isChartLoading} selectedPeriod={selectedPeriod} />
    </Section>
  )
}
