import { fontWeight, FontWeightTypes, headingSize } from "@/src/app/design/typograhy"
import { CSSProperties } from "react"
import { SizeType} from "@/src/types/types"
import { ReactNode } from "react"
import { colors, ColorTypes } from "@/src/app/design/colors"

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

  const HeadingTag = type 

  const weightType = {
    "h1" : "semiBold",
    "h2" : "semiBold",
    "h3" : "medium",
    "h4" : "medium"
  } as const

  const Weight = weightType[type]

  const defaultStyle: CSSProperties = {
    fontSize: headingSize[size],
    fontWeight: (weight && fontWeight[weight]) ?? fontWeight[Weight],
    color: colors[color] ?? colors["textColor1"]
  }

  return(
    <HeadingTag className={`${className} w-max`} style={{...defaultStyle, ...specificStyles}}>
      {children}
    </HeadingTag>
  )
}
