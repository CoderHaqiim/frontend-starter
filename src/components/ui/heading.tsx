import React from 'react'

type HeadingProps = {
    text: string,
    type: "heading1" | "heading2" | "heading3" | "heading4"
}

export default function Heading({text, type}: HeadingProps){
  const baseStyle = `text-[var(--text-color1)]`
  return (
    type === "heading1"?
    <h1 className={`${baseStyle} w-full font-[600] mb-6 text-[1.602rem]`}>{text}</h1>:
    type === "heading2"?
    <h2 className={`${baseStyle} w-full font-[600] text-[1.266rem]`}>{text}</h2>:
    type === "heading3"?
    <h3 className={`${baseStyle} w-full font-[600] text-[1.266rem]`}>{text}</h3>:
    type === "heading4"?
    <h4 className={`${baseStyle} w-full font-[600] text-[0.889rem]`}>{text}</h4>: null
  )
}
