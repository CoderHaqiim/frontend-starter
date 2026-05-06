import React, { CSSProperties } from 'react'

type InputProp = {
    type: React.HTMLInputTypeAttribute,
    specificStyle?: CSSProperties,
    placeholder?: string,
    border?: boolean,
    outline?: boolean,
    size?: "sm" | "md" | "lg"
}


export default function Input({type, outline, specificStyle, border, size, placeholder}: InputProp){

    const sizes = {
        "sm": "h-[25px]",
        "md": "h-[35px]",
        "lg": "h-[45px]"
    }

    const height = size && sizes[size]

  return (
      <input type={type} placeholder={placeholder ?? undefined} className={`w-auto flex p-[8px] ${outline &&  "hover:border-[1px] hover:border-[var(--accent-color)]"} text-[14px] ${height} placeholder-[#999999] rounded-[8px] ${border && "border-[var(--outline-color1)] border-[0.5px]"}`} style={specificStyle}/>
  )
}
