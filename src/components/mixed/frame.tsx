import React, { CSSProperties, ReactNode } from 'react'

interface FrameProp{
    variant: "frame-fixed" | "frame-hug" | "frame-stretch",
    scroll?: boolean,
    specificStyle?: CSSProperties
    rounded?: boolean,
    children?: ReactNode
}

export default function Frame({variant, rounded, children, specificStyle}:FrameProp) {

  const baseStyle = `flex gap-2 ${rounded? "rounded-[8px]" : ""} p-4`
  const hugStyle = `w-[max-content] h-[max-content] flex gap-2 ${rounded? "rounded-[8px]" : ""}`
  const stretchStyle = `w-full h-full flex gap-2 ${rounded? "rounded-[8px]" : ""}`

  return (
    variant === "frame-fixed"?
    <div className={`${baseStyle}`} style={specificStyle}>
        {children}
    </div>:
    variant === "frame-hug"?
    <div className={`${baseStyle} ${hugStyle}`} style={specificStyle}>
        {children}
    </div>:
    variant === "frame-stretch"?
    <div className={`${baseStyle} ${stretchStyle}`} style={specificStyle}>
        {children}
    </div>: null
  )
}
