"use client"

import { ColorTypes, colors } from "@/src/app/design/colors"
import { CSSProperties } from "react"
import Paragraph from "../primitives/paragraph"
import { stringToNumber } from "@/src/utils/numberStringCheck"
import { SizeType } from "@/src/types/types"

type HorizontalScoreProps = {
  score: number | string
  color?: ColorTypes
  height?: number
  specificStyle?: CSSProperties
  textSize?: SizeType
  showPercentage?: boolean
}

export default function LinearProgress({
  score,
  color,
  height = 8,
  specificStyle,
  textSize = "xs",
  showPercentage = true,
}: HorizontalScoreProps) {
  const normalizedScore = Math.min(
    Math.max(stringToNumber(score), 0),
    100
  )

  return (
    <div
      className="flex items-center gap-[var(--space-sm)] w-full"
      style={specificStyle}
    >
      <div
        className="relative overflow-hidden flex-1 rounded-full"
        style={{
          height,
          backgroundColor: "var(--color-background3)",
        }}
      >
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${normalizedScore}%`,
            backgroundColor: color
              ? colors[color]
              : colors["accent1"],
          }}
        />
      </div>

      {showPercentage && (
        <Paragraph
          size={textSize}
          weight="semiBold"
          color={color}
        >
          {normalizedScore}%
        </Paragraph>
      )}
    </div>
  )
}