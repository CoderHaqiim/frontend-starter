"use client"
import { ColorTypes } from "@/src/app/design/colors"
import { CSSProperties, useEffect } from "react"
import { colors } from "@/src/app/design/colors"
import Paragraph from "../primitives/paragraph"
import { stringToNumber } from "@/src/utils/numberStringCheck"
import { SizeType } from "@/src/types/types"

type ScoreProps = {
  score: number | string
  size?: number
  color?: ColorTypes
  strokeWidth?: number
  specificStyle?: CSSProperties
  textSize?: SizeType
}

export default function RadialProgress({
  score,
  size = 120,
  strokeWidth = 10,
  specificStyle,
  color,
  textSize
}: ScoreProps) {
  const normalizedScore = Math.min(Math.max(stringToNumber(score), 0), 100)

  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius

  const progress = (normalizedScore / 100) * circumference

  return (
    <div
      className="relative inline-flex items-center justify-center"
      style={{
        width: size,
        height: size,
        ...specificStyle,
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--color-background3)"
          strokeWidth={strokeWidth}
        />

        {/* Score circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={(color && colors[color]) ?? colors["accent1"]}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={(circumference - progress)}
          className="transition-all duration-500"
        />
      </svg>

      <Paragraph size={textSize ?? "lg"} weight="semiBold" color={color} className="absolute">
        {normalizedScore}%
      </Paragraph>
    </div>
  )
}