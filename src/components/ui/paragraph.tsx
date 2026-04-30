import React from 'react'

type ParagraphProps = {
    text: string,
    size: "sm" | "md" | "lg"
}

export default function Paragraph({text, size}: ParagraphProps) {
  const baseStyle = `leading-[1rem] text-[#010101] font-[300]`
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
    `}>
        {text}
    </p>
  )
}
