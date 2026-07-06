import { headingSize } from "@/src/app/design/typograhy"
import { CSSProperties } from "react"
import { SizeType} from "@/src/types/types"
import { ReactNode } from "react"

type HeadingProps = {
    children: ReactNode
    type: "h1" | "h2" | "h3" | "h4",
    size: SizeType,
    specificStyles?: CSSProperties
}

export default function Heading({children, size, type, specificStyles}: HeadingProps){

  const baseClass = `w-max text-[var(--color-textColor1)] font-[var(--fontWeight-semiBold)]`

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
      {children}
    </HeadingTag>
  )
}
