"use client"

import { ColorTypes, colors } from "@/src/app/design/colors"
import { CSSProperties } from "react"
import Paragraph from "../primitives/paragraph"
import { stringToNumber } from "@/src/utils/numberStringCheck"
import { SizeType } from "@/src/types/types"
import Frame from "../primitives/frame"

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
  color = "accent1",
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
    <Frame gap="sm" width="stretch" align="center">
      <Frame rounded="xl" height={height} className="bg-[var(--color-background3)] overflow-hidden flex-1">
        <Frame width={`${normalizedScore}%`} height="stretch" rounded="md" className="transition-all duration-500"
          specificStyles={{
            backgroundColor: colors[color]
          }}
        />
      </Frame>

      {showPercentage && (
        <Paragraph
          size={textSize}
          weight="semiBold"
          color={color}
        >
          {normalizedScore}%
        </Paragraph>
      )}
    </Frame>
  )
}