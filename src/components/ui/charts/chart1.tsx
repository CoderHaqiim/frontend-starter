"use client"

import { LineChart, Line, BarChart, Bar, CartesianGrid } from "recharts"
import { XAxisComponent, YAxisComponent, LegendComponent, TooltipComponent } from "./chart.utils"
import { ChartPeriod, ChartPoint } from "@/src/types/types"
import { useTheme } from "../../providers/themeProvider"
import Frame from "../primitives/frame"
import Spinner from "../composites/spinner"
import { CSSProperties } from "react"
import { useState } from "react"

type ChartProps = {
  variant: "Line chart" | "Bar chart"
  data: ChartPoint[]
  isLoading: boolean
  height: CSSProperties["height"]
  fixedRatio: boolean
  selectedPeriod: ChartPeriod
}

export default function Chart1({
  variant,
  isLoading,
  data,
  fixedRatio,
  selectedPeriod,
  height = "none"
}: ChartProps) {
  const  [downloadOpen, setDownloadOpen] = useState<boolean>(false)
  const { colors } = useTheme()

  const openDownloadDialogue = () => {
    setDownloadOpen(true)
  }

  const closeDownloadDialogue = () => {
    setDownloadOpen(false)
  }

  const chartStyle = {
    width: "100%",
    maxWidth: "none",
    height: fixedRatio? "100%" : height ,
    aspectRatio: fixedRatio? 1.5 : "auto",
    outline: "none",
    backgroundColor: colors["white"],
    padding: "var(--space-md)",
    boxSizing: "border-box" as const,
  }

  return (
    <Frame className="w-full rounded-[var(--radius-md)] p-[var(--space-lg)] border-[1px] border-[var(--color-outline1)] bg-[var(--color-white)] justify-center items-center">
      {isLoading ? (
        <Frame className="w-full h-[372px] justify-center items-center">
          <Spinner />
        </Frame>
      ) : variant === "Line chart" ? (
        <LineChart
          style={chartStyle}
          responsive
          data={data}
          margin={{
            top: 5,
            right: 0,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={colors["outline1"]}
          />

          <XAxisComponent selectedPeriod={selectedPeriod} />
          <YAxisComponent />
          <TooltipComponent />
          <LegendComponent />

          <Line
            type="monotone"
            dataKey="income"
            stroke={colors["accent"]}
            dot={{
              fill: colors["accent"],
            }}
            activeDot={{
              r: 5,
              stroke: colors["accent"],
            }}
          />

          <Line
            type="monotone"
            dataKey="expenses"
            stroke={colors["error"]}
            dot={{
              fill: colors["error"],
            }}
            activeDot={{
              r: 5,
              stroke: colors["error"],
            }}
          />

          <Line
            type="monotone"
            dataKey="profit"
            stroke={colors["success"]}
            dot={{
              fill: "#217cc7",
            }}
            activeDot={{
              r: 5,
              stroke: colors["success"],
            }}
          />
        </LineChart>
      ) : (
        <BarChart
          style={chartStyle}
          responsive
          data={data}
          margin={{
            top: 5,
            right: 0,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={colors["outline1"]}
          />

          <XAxisComponent selectedPeriod={selectedPeriod} />
          <YAxisComponent />
          <TooltipComponent />
          <LegendComponent />

          <Bar
            dataKey="income"
            fill={colors["accent"]}
            activeBar={{
              fill: colors["accent"],
            }}
            radius={[4, 4, 0, 0]}
          />

          <Bar
            dataKey="expenses"
            fill={colors["error"]}
            activeBar={{
              fill: colors["error"],
            }}
            radius={[4, 4, 0, 0]}
          />

          <Bar
            dataKey="profit"
            fill={colors["success"]}
            activeBar={{
              fill: colors["success"],
            }}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      )}
    </Frame>
  )
}
