import React, { CSSProperties, ReactNode } from 'react'
import { colorVariables } from '@/src/app/design/colors'
import { radius, radiusVariables } from '@/src/app/design/radius'
import { space } from '@/src/app/design/space'


type FrameProp = {
    variant: "hug" | "stretch" | "custom" | "page",
    scroll?: boolean,
    specificStyle?: CSSProperties
    rounded?: "round" | "xs" | "sm" | "md" | "lg" | "xl"
    children?: ReactNode,
    scrollbar?: boolean,
    direction?: "row" | "column",
    padding?: "xs" | "sm" | "md" | "lg" | "xl"
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

  const borderRadiusValue = rounded? (rounded === "round"? "50%": radius["rounded"]): undefined

  const baseStyle = 
  `${direction === "column"? "flex-col" : "flex-row"} 
  ${border && "border-[0.5px] border-[var(--outline-color1)]"} relative flex 
  ${centered && "justify-center items-center"}
  ${padding === "xs"? "p-1" : padding === "sm"? "p-2" : padding === "md"? "p-4" : padding === "lg"? "p-8" : null} 
  ${direction === "row"? (scroll? "overflow-x-scroll" : "overflow-x-visible") : (scroll? "overflow-y-scroll" : "overflow-y-visible") } [&>*]:shrink-0}`

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
    borderRadius: borderRadiusValue,
    ...specificStyle,
  }

  return (
    <div className={`
        ${frameStyle}
    `} style={{...mergedStyle, ...colorVariables}}>
        {children}
    </div>
  )
}
