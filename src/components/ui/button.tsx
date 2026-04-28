"use client"

import { CSSProperties, ReactNode } from "react"
import Icon, { IconName } from "./icon"

type ButtonProps = 
{
    children?: never,
    specificStyle?: CSSProperties | undefined,
    variant: "btn-regular-icon-left" | "btn-regular-icon-right" | "btn-nav-icon-right" | "btn-nav-icon-left",
    icon: IconName
    background: string,
    color: string,
    text: string
} | {
    children?: never,
    specificStyle?: CSSProperties | undefined,
    variant: "btn-regular",
    background: string,
    color:string,
    text: string,
    icon?: never
} | {
    children?: never,
    specificStyle?: CSSProperties | undefined,
    variant: "btn-icon",
    background: string,
    color:string,
    text?: never,
    icon: string
} | {
    children: ReactNode,
    specificStyle?: CSSProperties | undefined,
    variant: "btn-custom",
    text?: never,
    icon?: never,
    background?: never,
    color?:never,
} 

export default function Button({
    children, 
    specificStyle, 
    text, 
    variant,
    icon,
    background,
    color
}: ButtonProps) {
    const regularStyle: string = `items-center bg-[${background}] text-[${color}] text-[12px] justify-center py-1 px-3 font-600 flex gap-1 rounded-[40px]`
    const navStyle: string = `items-center text-white bg-[background] text-[color] text-[12px] justify-center py-1 px-3 font-600 flex gap-1 rounded-[40px]`

  return (
    <button>
        {
            variant === "btn-regular-icon-left"? 
            <Icon variant="icon-md" name={icon} color={color}/>:null
        }
        {
            variant !== "btn-custom"? text : null
        }
        {
            variant === "btn-regular-icon-right"? 
            <Icon variant="icon-md" name={icon} color={color}/>:null
        }
        { 
            variant === "btn-custom"? children : null
        }
    </button>
  )
}
