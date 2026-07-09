import { fontWeight, headingSize } from "@/src/app/design/typograhy"
import { CSSProperties } from "react"
import { SizeType} from "@/src/types/types"
import { ReactNode } from "react"
import { colors } from "@/src/app/design/colors"

type HeadingProps = {
    children: ReactNode
    type: "h1" | "h2" | "h3" | "h4",
    size: SizeType,
    specificStyles?: CSSProperties
    className?: string
    color?: string
}

export default function Heading({children, size, type, color = colors["textColor1"], className, specificStyles}: HeadingProps){

  const HeadingTag = type 

  const weightType = {
    "h1" : "bold",
    "h2" : "semiBold",
    "h3" : "medium",
    "h4" : "medium"
  } as const

  const weight = weightType[type]

  const defaultStyle: CSSProperties = {
    fontSize: headingSize[size],
    fontWeight: fontWeight[weight],
    color: color
  }

  return(
    <HeadingTag className={`${className} w-max`} style={{...defaultStyle, ...specificStyles}}>
      {children}
    </HeadingTag>
  )
}
