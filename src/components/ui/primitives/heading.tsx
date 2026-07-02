import { headingSize } from "@/src/app/design/typograhy"
import { CSSProperties } from "react"
import { SizeType} from "@/src/types/types"

type HeadingProps = {
    text: string,
    type: "h1" | "h2" | "h3" | "h4",
    size: SizeType,
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
      }}>
      {text}
    </HeadingTag>
  )
}
