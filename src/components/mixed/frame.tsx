import React, { CSSProperties, ReactNode } from 'react'
import { colorVariables } from '@/src/app/design/colors'

type FrameProp = {
    variant: "hug" | "stretch" | "custom" | "page",
    scroll?: boolean,
    specificStyle?: CSSProperties
    rounded?: boolean | "xs" | "sm" | "md" | "lg",
    children?: ReactNode,
    scrollbar?: boolean,
    direction?: "row" | "column",
    padding?: "xs" | "sm" | "md" | "lg"
    border?: boolean,
    centered?: boolean
}

export default function Frame({
  variant, 
  border, 
  scrollbar, 
  padding, 
  rounded, 
  scroll, 
  direction, 
  children, 
  specificStyle,
  centered
}:FrameProp) {

  const roundSizes: Record<string, string> = {
    xs: "4px",
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "40px"
  }

  const borderRadiusValue = rounded
    ? typeof rounded === 'string'
      ? roundSizes[rounded]
      : roundSizes.lg
    : undefined

  const baseStyle = 
  `${direction === "column"? "flex-col" : "flex-row"} 
  ${border && "border-[0.5px] border-[var(--outline-color1)]"} relative flex 
  ${centered && "justify-center items-center"}
  ${padding === "xs"? "p-1" : padding === "sm"? "p-2" : padding === "md"? "p-4" : padding === "lg"? "p-8" : null} 
  ${direction === "row"? (scroll? "overflow-x-scroll" : "overflow-x-visible") : (scroll? "overflow-y-scroll" : "overflow-y-visible") } [&>*]:shrink-0`

  const hugStyle = `w-[max-content] h-[max-content] flex`
  const stretchStyle = `w-full h-full flex`
  const scrollStyle = `shrink-0 ${scrollbar? "scrollVisible" : null}`
  const pageStyle = `w-full h-[max-content] min-h-[100vh]`

  const applyHugStyle = variant === "hug" && hugStyle
  const applyStretchStyle = variant === "stretch" && stretchStyle
  const applyScrollStyle = scroll && scrollStyle
  const applyPageStyle = variant === "page" && pageStyle

  const frameStyle = `${baseStyle} ${applyHugStyle} ${applyStretchStyle} ${applyScrollStyle} ${applyPageStyle}`

  const mergedStyle: CSSProperties = {
    ...specificStyle,
    borderRadius: borderRadiusValue
  }

  return (
    <div className={`
        ${frameStyle}
    `} style={{...mergedStyle, ...colorVariables}}>
        {children}
    </div>
  )
}
