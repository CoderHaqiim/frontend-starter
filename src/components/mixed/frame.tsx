import React, { CSSProperties, ReactNode } from 'react'

type FrameProp = {
    variant: "hug" | "stretch" | "custom",
    scroll?: boolean,
    specificStyle?: CSSProperties
    rounded?: boolean,
    children?: ReactNode,
    scrollbar?: boolean,
    direction?: "row" | "column"
    padded?: boolean
}

export default function Frame({variant, scrollbar, padded, rounded, scroll, direction, children, specificStyle}:FrameProp) {

  const baseStyle = 
  `${direction === "column"? "flex-col" : "flex-row"} flex ${rounded? "rounded-[8px]" : ""} ${padded? "p-4" : ""} ${direction === "row"? (scroll? "overflow-x-scroll" : "overflow-hidden") : (scroll? "overflow-y-scroll" : "overflow-hidden") } [&>*]:shrink-0`

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
