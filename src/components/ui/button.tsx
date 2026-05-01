"use client"

import { CSSProperties, ReactNode } from "react"
import Icon, { IconName } from "./icon"

type baseProps = {
    specificStyle?: CSSProperties | undefined,
}

type regularProps = baseProps & {
    variant: "regular"
    text: string,
}

type navProps = baseProps & {
    variant: "nav",
    text: string,
    iconName: IconName,
    iconColor?: string,
    iconPosition: "left" | "right"
}

type textIconProps = baseProps & {
    variant: "textIcon",
    text: string,
    iconName: IconName,
    iconColor?: string,
    iconPosition: "left" | "right"
}

type customProps = baseProps & {
    variant: "custom",
    children: ReactNode,
}

type IconProps = baseProps & {
    variant: "icon",
    iconName: IconName,
    iconColor?: string,
    size: "sm" | "md" | "lg" | "xl"
}

type ButtonProps = regularProps | navProps | textIconProps | customProps | IconProps

export default function Button(props: ButtonProps) {
    const {specificStyle, variant} = props
    
    const iconButtonSizes = {
        "sm": "h-[30px] w-[30px]",
        "md": "h-[35px] w-[35px]",
        "lg": "h-[40px] w-[40px]",
        "xl": "h-[45px] w-[45px]"
    }

    const baseStyle: string = `flex items-center text-[12px] rounded-[4px] font-[600]`

    const buttonSize = variant === "icon" && iconButtonSizes[props.size]

    const variantStyle = {
        "textIcon": `w-[max-content] bg-[var(--text-color)] text-[var(--background1)] h-[35px] justify-center py-1 px-4 gap-2 rounded-[40px]`,
        "regular": `w-[max-content] bg-[var(--text-color)] text-[var(--background1)] h-[35px] justify-center py-1 px-4 gap-2 rounded-[40px]`,
        "nav": `w-full h-[35px] text-[12px] justify-left py-1 px-3 gap-4 rounded-[8px]`,
        "icon": `${buttonSize} justify-center`,
        "custom": ""
    }

    const renderContent = () => {
        switch(variant){
            case "regular" : return props.text
            case "nav":
            case "textIcon": {
                const {text,iconName,iconColor,iconPosition} = props

                const icon = (<Icon name={iconName} color={iconColor} size="md"/>)

                return (
                    <>
                        {iconPosition === "left" && icon}
                        {text}
                        {iconPosition === "right" && icon}
                    </>
                )
            }
            case "icon" : {
                const {iconName, iconColor, size} = props

                return (
                    <Icon name={iconName} color={iconColor} size={size}/>
                )
            }
            case "custom": return props.children
        }
    }

  return (
    <button className={`
        ${baseStyle}
        ${variantStyle[variant]}
    `} style={specificStyle}>
        {renderContent()}
    </button>
  )
}
