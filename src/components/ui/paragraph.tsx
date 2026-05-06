import React, { CSSProperties, ReactNode } from 'react'

type ParagraphProps = {
    children?: ReactNode,
    size: "sm" | "md" | "lg",
    specificStyle?: CSSProperties
}

export default function Paragraph({children, size, specificStyle}: ParagraphProps) {
  const baseStyle = `leading-[1rem] break-words text-[var(--text-color2)] flex items-center w-full overflow-wrap font-[400]`
  const smStyle = `text-[0.7rem]`
  const mdStyle = `text-[0.8rem]`
  const lgStyle = `text-[1rem]`

  const applySmStyle = size === "sm"? smStyle : null
  const applyMdStyle = size === "md"? mdStyle : null
  const applyLgStyle = size === "lg"? lgStyle : null
  return (
    <p className={`
        ${baseStyle}
        ${applySmStyle}
        ${applyMdStyle}
        ${applyLgStyle}
    `} style={specificStyle}>
        {children}
    </p>
  )
}
