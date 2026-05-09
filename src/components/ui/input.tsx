"use client"
import React, { useState, CSSProperties } from 'react'
import Button from './button'

type InputProp = {
    type: React.HTMLInputTypeAttribute,
    specificStyle?: CSSProperties,
    placeholder?: string,
    border?: boolean,
    outline?: boolean,
    size: "sm" | "md" | "lg" | "xl"
    variant: "password" | "default"
}


export default function Input({type, outline, variant, specificStyle, border, size, placeholder}: InputProp){

    const [showText, setShowText] = useState<boolean>(false)

    const toggleText = () => {
        setShowText(prev => !prev)
    }

    const sizes = {
        "sm": "h-[25px]",
        "md": "h-[35px]",
        "lg": "h-[45px]",
        "xl": "h-[45px]",
    }

    const height = size && sizes[size]

    const typeCheck = variant === "password"? (showText? "text":"password") : type

  return (
      <div className='w-auto flex flex-1 justify-center flex-col '>
        <input type={typeCheck} autoComplete="true" placeholder={placeholder ?? undefined} className={`w-auto flex p-[8px] outline-none ${outline && "hover:border-[1px] hover:border-[var(--accent-color)]"} text-[14px] ${height} placeholder-[#999999] rounded-[8px] ${border && "border-[var(--outline-color1)] border-[0.5px]"}`} style={specificStyle}/>
        {variant === "password" && <Button variant="icon" size={size} iconName="icon-eye" id="xyz" specificStyle={{position:"absolute", right:"0px"}}/>}
      </div>
  )
}
