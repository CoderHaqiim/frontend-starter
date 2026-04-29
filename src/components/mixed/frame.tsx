import React, { CSSProperties, ReactNode } from 'react'

interface FrameProp{
    variant: "fixed" | "hug" | "stretch" | "custom",
    scroll?: boolean,
    specificStyle?: CSSProperties
    rounded?: boolean,
    children?: ReactNode
}

export default function Frame({variant, rounded, scroll, children, specificStyle}:FrameProp) {

  const baseStyle = `flex gap-2 ${rounded? "rounded-[8px]" : ""} p-4 ${scroll? "overflow-y-scroll" : "overflow-y-hidden"}`
  const hugStyle = `w-[max-content] h-[max-content] flex gap-2 ${rounded? "rounded-[8px]" : ""}`

  const stretchStyle = `w-full h-full flex gap-2 ${rounded? "rounded-[8px]" : ""}`
  const applyHugStyle = variant === "hug"? hugStyle : null
  const applyStretchStyle = variant === "stretch"? stretchStyle : null

  return (
    <div className={`
        ${baseStyle}
        ${applyHugStyle}
        ${applyStretchStyle}
    `} style={specificStyle}>
        {children}
    </div>
  )
}
