import { headingSize } from "@/src/app/design/typograhy"
import { CSSProperties } from "react"
import { Sizes } from "@/src/types/types"
import { fontWeightVariables } from "@/src/app/design/typograhy"

type HeadingProps = {
    text: string,
    type: "h1" | "h2" | "h3" | "h4",
    size: Sizes
}

export default function Heading({text, size, type}: HeadingProps){

  const baseClass = `w-full text-[var(--text-color1)] font-[var(--semi-bold)]`

  const HeadingTag = type 
  const defaultStyle: CSSProperties = {
    fontSize: headingSize[size]
  }

  return(
    <HeadingTag className={`${baseClass}`} 
    style={{
      ...defaultStyle,
      ...fontWeightVariables
      }}>
      {text}
    </HeadingTag>
  )
}
