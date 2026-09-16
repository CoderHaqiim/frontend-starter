"use client"

import { ColorTypes } from "@/src/app/design/colors"
import { fontWeight, FontWeightTypes, headingSize } from "@/src/app/design/typograhy"
import { SizeType } from "@/src/types/types"
import { CSSProperties, ReactNode } from "react"
import { useTheme } from "../../../providers/themeProvider"

type HeadingProps = {
    children: ReactNode
    type: "h1" | "h2" | "h3" | "h4",
    size: SizeType,
    specificStyles?: CSSProperties
    className?: string
    color?: ColorTypes
    weight?: FontWeightTypes
}

export default function Heading({weight, children, size, type, color ="textColor1", className, specificStyles}: HeadingProps){

  const {colors} = useTheme()
  const HeadingTag = type 

  const weightType = {
    "h1" : "semiBold",
    "h2" : "medium",
    "h3" : "medium",
    "h4" : "normal"
  } as const

  const Weight = weightType[type]

  const defaultStyle: CSSProperties = {
    fontSize: headingSize[size],
    fontWeight: (weight && fontWeight[weight]) ?? fontWeight[Weight],
    color: colors[color],
    lineHeight: "1"
  }

  return(
    <HeadingTag className={`${className} w-max h-max`} style={{...defaultStyle, ...specificStyles}}>
      {children}
    </HeadingTag>
  )
}
