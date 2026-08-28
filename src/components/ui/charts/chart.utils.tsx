"use client"

import { fontWeight, bodySize } from "@/src/app/design/typograhy"
import { radius } from "@/src/app/design/radius"
import { XAxis, YAxis, Tooltip, Legend } from "recharts"
import { useTheme } from "../../providers/themeProvider"
import { space } from "@/src/app/design/spacing"

export const LegendComponent = () => {
  const { colors } = useTheme()

  return (
    <Legend
      wrapperStyle={{
        fontSize: bodySize["xxs"],
        fontWeight: fontWeight["medium"],
        backgroundColor: colors["background2"],
        borderRadius: radius["sm"],
        padding: space["sm"],
        position: "absolute",
        left: "16px",
        bottom: "8px",
        transform: "translateY(0)",
        border: "none",
        boxShadow: "none",
        width: "fit-content",
        maxWidth: "none",
      }}
      align="left"
      iconType="square"
      iconSize={5}
      fontSize="8px"
      verticalAlign="bottom"
    />
  )
}

export const TooltipComponent = () => {
  const { colors } = useTheme()

  return (
    <Tooltip
      cursor={{
        stroke: "var(--textColor2)",
      }}
      contentStyle={{
        backgroundColor: colors["background1"],
        borderColor: colors["outline2"],
        borderRadius: radius["sm"],
        boxShadow: "0px 2px 3px #00000080",
      }}
    />
  )
}

export function XAxisComponent() {
  const { colors } = useTheme()

  return (
    <XAxis
      dataKey="date"
      axisLine={{
        stroke: colors["outline1"],
      }}
      tick={{
        fontWeight: fontWeight["normal"],
        fontSize: bodySize["xxs"],
        fill: colors["textColor2"],
      }}
      tickLine={{
        stroke: colors["outline1"],
      }}
    />
  )
}

export function YAxisComponent() {
  const { colors } = useTheme()

  return (
    <YAxis
      width="auto"
      axisLine={{
        stroke: colors["outline1"],
      }}
      tick={{
        fontWeight: fontWeight["normal"],
        fontSize: bodySize["xxs"],
        fill: colors["textColor2"],
      }}
      tickLine={{
        stroke: colors["outline1"],
      }}
    />
  )
}