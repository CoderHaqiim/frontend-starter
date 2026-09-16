"use client"

import useExtendedChart from "@/src/hooks/extendChart"
import { chartQueryKey, getChartData } from "@/src/services/chartService"
import { ChartPeriod, chartTypes } from "@/src/types/types"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import Section from "../base/layout/section"
import Chart1 from "../base/ui/charts/chart1"
import Dropdown from "../base/ui/composites/dropdown"
import Tooltip from "../base/ui/composites/tooltip"
import Button from "../base/ui/primitives/button"
import Frame from "../base/ui/primitives/frame"
import Heading from "../base/ui/primitives/heading"

type ChartSectionProps = {
  chartUrl: string
}

export default function ChartSection({ chartUrl }: ChartSectionProps) {
  const reportDuration = ["weekly", "monthly", "annual"]
  const chartOptions = ["Line chart", "Bar chart"]
  const [selectedChart, setSelectedChart] = useState<chartTypes>("Line chart")
  const [selectedPeriod, setSelectedPeriod] = useState<ChartPeriod>("7d")
  const { data: chartData = [], isLoading: isChartLoading } = useQuery({
    queryKey: chartQueryKey(chartUrl, selectedPeriod),
    queryFn: () => getChartData(chartUrl, selectedPeriod),
  })
  const { openChart } = useExtendedChart()

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
          <Dropdown name="chart" width="max-content" size="sm" options={chartOptions} formFunc={chartChangeHandler} />
          <Dropdown name="report" width="max-content" size="sm" options={reportDuration} formFunc={reportChangeHandler} />
          <Tooltip content="expand chart">
            <Button func={() => openChart(chartData, selectedChart, selectedPeriod)} size="sm" variant="outline" isIcon iconName="icon-expand" />
          </Tooltip>
        </Frame>
      </Frame>

      <Chart1 height="auto" fixedRatio variant={selectedChart} data={chartData} isLoading={isChartLoading} selectedPeriod={selectedPeriod} />
    </Section>
  )
}
