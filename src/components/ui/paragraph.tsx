import React, { CSSProperties } from 'react'

type ParagraphProps = {
    text: string,
    size: "sm" | "md" | "lg",
    specificStyle: CSSProperties
}

export default function Paragraph({text, size, specificStyle}: ParagraphProps) {
  const baseStyle = `leading-[1rem] break-words text-[#010101] overflow-wrap font-[300]`
  const smStyle = `text-[12px]`
  const mdStyle = `text-[14px]`
  const lgStyle = `text-[16px]`

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
        {text}
    </p>
  )
}
