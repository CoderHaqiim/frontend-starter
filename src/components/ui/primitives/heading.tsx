import { headingSize } from "@/src/app/design/typograhy"
import { CSSProperties } from "react"
import { Sizes } from "@/src/types/types"
import { fontWeightVariables } from "@/src/app/design/typograhy"
import { colorVariables } from "@/src/app/design/colors"

type HeadingProps = {
    text: string,
    type: "h1" | "h2" | "h3" | "h4",
    size: Sizes,
    specificStyles?: CSSProperties
}

export default function Heading({text, size, type, specificStyles}: HeadingProps){

  const baseClass = `w-full text-[var(--textColor1)] font-[var(--semi-bold)]`

  const HeadingTag = type 
  const defaultStyle: CSSProperties = {
    fontSize: headingSize[size]
  }

  return(
    <HeadingTag className={`${baseClass}`} 
    style={{
      ...defaultStyle,
      ...specificStyles,
      ...fontWeightVariables,
      ...colorVariables
      }}>
      {text}
    </HeadingTag>
  )
}
