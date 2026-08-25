"use client"

import { fontWeight, FontWeightTypes, headingSize } from "@/src/app/design/typograhy"
import { CSSProperties } from "react"
import { SizeType} from "@/src/types/types"
import { ReactNode } from "react"
import { ColorTypes, colors} from "@/src/app/design/colors"
import { useTheme } from "../../app/themeProvider"

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
    "h1" : "medium",
    "h2" : "medium",
    "h3" : "medium",
    "h4" : "medium"
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
