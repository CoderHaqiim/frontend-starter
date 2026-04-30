import React from 'react'

type LabelProps = {
 text: string,
 size: "sm" | "md" | "lg"
}

export default function Label({text, size}: LabelProps) {
  const baseStyle = `text-[#010101] text-left font-[500] w-full h-[max-content]`
  const smStyle = `text-[12px]`
  const mdStyle = `text-[14px]`
  const lgStyle = `text-[16px]`

  const applySmStyle = size === "sm"? smStyle : null
  const applyMdStyle = size === "md"? mdStyle : null
  const applyLgStyle = size === "lg"? lgStyle : null

  return (
    <label className={`
      ${baseStyle}
      ${applyMdStyle}
      ${applySmStyle}
      ${applyLgStyle}
    `}>
      {text}
    </label>
  )
}
