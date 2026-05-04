import React, { CSSProperties, ReactNode } from 'react'

type FrameProp = {
    variant: "hug" | "stretch" | "custom",
    scroll?: boolean,
    specificStyle?: CSSProperties
    rounded?: boolean,
    children?: ReactNode,
    scrollbar?: boolean,
    direction?: "row" | "column",
    padding?: "sm" | "md" | "lg"
    border?: boolean
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
  specificStyle
}:FrameProp) {

  const baseStyle = 
  `${direction === "column"? "flex-col" : "flex-row"} 
  ${border? "border-[0.5px] border-[var(--outline-color1)]" : ""} relative flex 
  ${rounded? "rounded-[8px]" : ""} 
  ${padding === "sm"? "p-1" :
    padding === "md"? "p-2" :
    padding === "lg"? "p-4" : null
  } 
  ${direction === "row"? (scroll? "overflow-x-scroll" : "overflow-hidden") : (scroll? "overflow-y-scroll" : "overflow-hidden") } [&>*]:shrink-0`

  const hugStyle = `w-[max-content] h-[max-content] flex ${rounded? "rounded-[8px]" : ""}`
  const stretchStyle = `w-full h-full flex ${rounded? "rounded-[8px]" : ""}`
  const scrollStyle = `shrink-0 ${scrollbar? "scrollVisible" : null}`

  const applyHugStyle = variant === "hug"? hugStyle : null
  const applyStretchStyle = variant === "stretch"? stretchStyle : null
  const applyScrollStyle = scroll? scrollStyle : null

  return (
    <div className={`
        ${baseStyle}
        ${applyHugStyle}
        ${applyStretchStyle}
        ${applyScrollStyle}
    `} style={specificStyle}>
        {children}
    </div>
  )
}
