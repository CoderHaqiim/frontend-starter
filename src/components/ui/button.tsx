"use client"

import { CSSProperties, ReactNode } from "react"
import Icon, { IconName } from "./icon"

type ButtonProps = 
{
    children?: never,
    specificStyle?: CSSProperties | undefined,
    variant: "regular",
    iconPosition?: never,
    iconName?: never,
    text: string,
    iconColor?: never
} | {
    children?: never,
    specificStyle?: CSSProperties | undefined,
    variant: "nav" | "text-icon",
    iconPosition: "left" | "right",
    iconName: IconName,
    text: string,
    iconColor: string
} | {
    children: ReactNode,
    specificStyle?: CSSProperties | undefined,
    variant: "custom",
    iconPosition?: never,
    text?: never,
    iconName?: never,
    iconColor?: never
} | {
    children?: never,
    specificStyle?: CSSProperties | undefined,
    variant: "icon",
    iconPosition?: never,
    text?: never,
    iconName: IconName,
    iconColor: string
}

export default function Button({
    children, 
    specificStyle, 
    text, 
    variant,
    iconPosition,
    iconName,
    iconColor
}: ButtonProps) {
    const baseStyle: string = `flex items-center text-[12px] h-[36px] rounded-[4px] font-600`
    const regularStyle: string = `w-[max-content] justify-center py-1 px-4 gap-2 rounded-[40px]`
    const navStyle: string = `w-full text-white text-[12px] justify-left py-1 px-3 gap-4 rounded-[8px]`
    const iconStyle: string = `w-[35px] justify-center`

    const applyRegularStyle = variant === "regular" || variant === "text-icon"? regularStyle : null
    const applyNavStyle = variant === "nav"? navStyle : null
    const applyIconStyle = variant === "icon"? iconStyle : null

  return (
    <button className={`
        ${baseStyle}
        ${applyRegularStyle}
        ${applyNavStyle}
        ${applyIconStyle}
    `} style={specificStyle}>
        {iconName && iconPosition === "left" && <Icon variant="icon-md" name={iconName} color={iconColor}/>}
        {text && text}
        {iconName && iconPosition === "right" && <Icon variant="icon-md" name={iconName} color={iconColor}/>}
        {children && children}
        {iconName && variant === "icon" && <Icon variant="icon-md" name={iconName} color={iconColor}/>}
    </button>
  )
}
