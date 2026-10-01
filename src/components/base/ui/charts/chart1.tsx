"use client"

import { ChartPeriod, ChartPoint } from "@/src/types/types"
import { CSSProperties } from "react"
import { Bar, BarChart, CartesianGrid, Line, LineChart } from "recharts"
import { useTheme } from "../../../providers/themeProvider"
import Spinner from "../composites/spinner"
import Frame from "../primitives/frame"
import Paragraph from "../primitives/paragraph"
import { LegendComponent, TooltipComponent, XAxisComponent, YAxisComponent } from "./chart.utils"

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
  const { colors } = useTheme()


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
        // The loading state holds the footprint the chart will take, so the
        // chart does not jump sideways when it arrives.
        <Frame className="w-full justify-center items-center" specificStyles={{ ...chartStyle, backgroundColor: "transparent" }}>
          <Spinner />
        </Frame>
      ) : data.length === 0 ? (
        // A chart with nothing behind it says so rather than drawing an empty
        // grid: the points are only ever the records the app holds, and none are
        // ever made up to fill it. The message takes the footprint the chart
        // would have drawn in, so it sits centred exactly where the chart
        // would be.
        <Frame className="w-full justify-center items-center" specificStyles={{ ...chartStyle, backgroundColor: "transparent" }}>
          <Paragraph size="sm" color="textColor2">Not enough data yet</Paragraph>
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
