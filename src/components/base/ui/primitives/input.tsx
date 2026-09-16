"use client"
import { radius } from '@/src/app/design/radius'
import { elementSizes } from '@/src/app/design/sizes'
import { bodySize } from '@/src/app/design/typograhy'
import { SizeType } from '@/src/types/types'
import React, { CSSProperties, useState } from 'react'
import Button from './button'

type InputProp = {
    type: React.HTMLInputTypeAttribute,
    specificStyle?: CSSProperties,
    placeholder?: string,
    border?: boolean,
    outline?: boolean,
    required?:boolean,
    size?: SizeType
    rounded?: SizeType
    variant: "password" | "checkbox" | "radio" | "default"
    name: string,
    func?: () => void
    formFunc? : (e:React.ChangeEvent<HTMLInputElement>) => void
}


export default function Input({
    type, 
    name, 
    func, 
    required = false,
    formFunc, 
    outline, 
    variant, 
    specificStyle, 
    border, 
    size = "md", 
    rounded,
    placeholder
}: InputProp){

    const [showText, setShowText] = useState<boolean>(false)

    const toggleText = () => {
        setShowText(prev => !prev)
    }

    const staticTextSize = ["xl", "lg", "xxl"]
    const fontSize = size ?? "md"

    const defaultStyles: CSSProperties= {
        height: elementSizes[size],
        borderRadius: rounded && radius[rounded],
        fontSize: staticTextSize.includes(fontSize)? bodySize["md"] : bodySize[fontSize],
    }

    const typeCheck = variant === "password"? (showText? "text":"password") : type

  return (
      <div className='w-auto flex flex-1 justify-center overflow-y-hidden flex-col '>
        <input required={required} onChange={formFunc} type={typeCheck} onFocus={func} onBlur={func} name={name} autoComplete="true" placeholder={placeholder} 
            className={
                `w-auto flex p-[var(--space-lg)] outline-none 
                ${outline && "focus:border-[2px] hover:border-[1px] focus:border-[var(--color-accent)] hover:border-[var(--color-accent)]"} 
                items-[center] placeholder-[var(--color-outline1)]
                ${border && "border-[var(--color-outline1)] border-[0.5px]"}
            `} 
            style={{
                ...defaultStyles, 
                ...specificStyle
            }}
        />
        {
            variant === "password" && 
                <Button 
                    func={toggleText} 
                    variant="ghost" 
                    size={"xs"} iconName={showText? "icon-eye-off" : "icon-eye"}
                    specificStyles={{
                        backgroundColor:"transparent",
                        position:"absolute", 
                        right:"0px"
                    }}
                />
            }
      </div>
  )
}
