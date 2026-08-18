"use client"

import { ColorTypes } from "@/src/app/design/colors"
import { CSSProperties } from "react"
import Paragraph from "../primitives/paragraph"
import { stringToNumber } from "@/src/utils/numberStringCheck"
import { SizeType } from "@/src/types/types"
import Frame from "../primitives/frame"
import { useTheme } from "../../app/themeProvider"

type HorizontalScoreProps = {
  score: number | string
  color?: ColorTypes
  height?: number
  specificStyle?: CSSProperties
  textSize?: SizeType
  showPercentage?: boolean
  insertedText?: boolean | string
}

export default function LinearProgress({
  score,
  insertedText = false,
  color = "accent",
  height = 8,
  specificStyle,
  textSize = "xs",
  showPercentage = true,
}: HorizontalScoreProps) {
  const {colors} = useTheme()
  const normalizedScore = Math.min(
    Math.max(stringToNumber(score), 0),
    100
  )

  return (
    <Frame className="gap-[var(--space-sm)] w-full items-center">
      <Frame className={` rounded-[var(--radius-xl)]  bg-[var(--color-background3)] overflow-hidden flex-1`}
        specificStyles={{
          height: height
        }}>
        <Frame className=" h-full rounded-[var(--radius-md)] transition-all duration-500"
          specificStyles={{
            width: `${normalizedScore}%`,
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
      {(!showPercentage && insertedText) && (
        <Paragraph
          size={textSize}
          weight="semiBold"
          color={color}
        >
          {insertedText}
        </Paragraph>
      )}
    </Frame>
  )
}