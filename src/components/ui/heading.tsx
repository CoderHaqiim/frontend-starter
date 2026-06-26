import { headingSize } from "@/src/app/design/fontSize"
import { CSSProperties } from "react"
import { fontWeightVariables } from "@/src/app/design/fontWeight"

type HeadingProps = {
    text: string,
    type: "h1" | "h2" | "h3" | "h4" | "display"
}

export default function Heading({text, type}: HeadingProps){

  const headingType = {
    "display": "h1",
    "h1": "h1",
    "h2": "h2",
    "h3": "h3",
    "h4": "h4"
  } as const

  const baseClass = `w-full text-[var(--text-color1)] font-[var(--semi-bold)]`

  const HeadingTag = headingType[type]
  const defaultStyle: CSSProperties = {
    fontSize: headingSize[type]
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
