import React, { CSSProperties, ReactNode } from 'react'

type FrameProp = {
    variant: "hug" | "stretch" | "custom" | "page",
    scroll?: boolean,
    specificStyle?: CSSProperties
    rounded?: boolean,
    children?: ReactNode,
    scrollbar?: boolean,
    direction?: "row" | "column",
    padding?: "sm" | "md" | "lg" | "xl"
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

  const baseStyle = 
  `${direction === "column"? "flex-col" : "flex-row"} 
  ${border && "border-[0.5px] border-[var(--outline-color1)]"} relative flex 
  ${rounded &&  "rounded-[16px]"} 
  ${centered && "justify-center items-center"}
  ${padding === "sm"? "p-1" : padding === "md"? "p-2" : padding === "lg"? "p-4" : padding === "xl"? "p-8" : null} 
  ${direction === "row"? (scroll? "overflow-x-scroll" : "overflow-hidden") : (scroll? "overflow-y-scroll" : "overflow-hidden") } [&>*]:shrink-0`

  const hugStyle = `w-[max-content] h-[max-content] flex ${rounded? "rounded-[8px]" : ""}`
  const stretchStyle = `w-full h-full flex ${rounded? "rounded-[8px]" : ""}`
  const scrollStyle = `shrink-0 ${scrollbar? "scrollVisible" : null}`
  const pageStyle = `w-[full] h-[max-content] min-h-[100vh]`

  const applyHugStyle = variant === "hug" && hugStyle
  const applyStretchStyle = variant === "stretch" && stretchStyle
  const applyScrollStyle = scroll && scrollStyle
  const applyPageStyle = variant === "page" && pageStyle

  const frameStyle = `${baseStyle} ${applyHugStyle} ${applyStretchStyle} ${applyScrollStyle} ${applyPageStyle}`

  return (
    <div className={`
        ${frameStyle}
    `} style={specificStyle}>
        {children}
    </div>
  )
}
