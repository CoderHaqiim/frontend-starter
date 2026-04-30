import React, { CSSProperties } from 'react'

type InputProp = {
    type: React.HTMLInputTypeAttribute,
    specificStyle?: CSSProperties,
    placeholder?: string
}

export default function Input({type, specificStyle, placeholder}: InputProp) {
  return (
      <input type={type} placeholder={placeholder ?? undefined} className='w-full p-[8px] text-[14px] h-[30px] border-[0.5px] placeholder-[#999999] rounded-[8px] border-[#010101]' style={specificStyle}/>
  )
}
