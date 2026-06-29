"use client"
import { elementSizes } from '@/src/app/design/sizes'
import React, { useState, CSSProperties } from 'react'
import Button from './button'
import { bodySize } from '@/src/app/design/typograhy'
import { colorVariables } from '@/src/app/design/colors'
import { Sizes } from '@/src/types/types'

type InputProp = {
    type: React.HTMLInputTypeAttribute,
    specificStyle?: CSSProperties,
    placeholder?: string,
    border?: boolean,
    outline?: boolean,
    size?: Sizes
    variant: "password" | "checkbox" | "radio" | "default"
    name: string,
    func?: () => void
    formFunc? : (e:React.ChangeEvent<HTMLInputElement>) => void
}


export default function Input({
    type, 
    name, 
    func, 
    formFunc, 
    outline, 
    variant, 
    specificStyle, 
    border, 
    size, 
    placeholder
}: InputProp){

    const [showText, setShowText] = useState<boolean>(false)

    const toggleText = () => {
        setShowText(prev => !prev)
    }


    const defaultStyles: CSSProperties= {
        height: size ? elementSizes[size] : elementSizes["md"],
        fontSize: size? bodySize[size] : bodySize["md"]
    }

    const typeCheck = variant === "password"? (showText? "text":"password") : type

  return (
      <div className='w-auto flex flex-1 justify-center flex-col '>
        <input
            onChange={formFunc} 
            type={typeCheck} 
            onFocus={func} 
            onBlur={func} 
            name={name} 
            autoComplete="true" 
            placeholder={placeholder} 
            className={
                `w-auto flex p-[8px] outline-none 
                ${outline && "focus:border-[2px] hover:border-[1px] focus:border-[var(--accent1)] hover:border-[var(--accent1)]"} 
                items-[center] placeholder-[#999999] rounded-[8px] 
                ${border && "border-[var(--outline-color2)] border-[0.5px]"}
            `} 
            style={{
                ...defaultStyles, 
                ...specificStyle, 
                ...colorVariables 
            }}
        />
        {
            variant === "password" && 
                <Button 
                    func={toggleText} 
                    variant="icon" 
                    size={size ?? "md"} iconName={showText? "icon-eye-off" : "icon-eye"}
                    specificStyles={{position:"absolute", right:"0px"}}
                />
            }
      </div>
  )
}
