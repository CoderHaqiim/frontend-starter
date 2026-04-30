import React, { JSXElementConstructor } from 'react'

type HeadingProps = {
    text: string,
    type: "heading1" | "heading2" | "heading3" | "heading4"
}

export default function Heading({text, type}: HeadingProps){
  const baseStyle = `text-[#101010]`
  return (
    type === "heading1"?
    <h1 className={`${baseStyle} font-800 text-[24px]`}>{text}</h1>:
    type === "heading2"?
    <h2 className={`${baseStyle} font-800 text-[20px]`}>{text}</h2>:
    type === "heading3"?
    <h3 className={`${baseStyle} font-800 text-[16px]`}>{text}</h3>:
    type === "heading4"?
    <h4 className={`${baseStyle} font-800 text-[14px]`}>{text}</h4>: null
  )
}
