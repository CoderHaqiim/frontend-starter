"use client"

import { CSSProperties, ReactNode } from "react"
import Icon, { IconName } from "./icon"
import { useSelectedNavState } from "@/src/store/navState"

type baseProps = {
    specificStyle?: CSSProperties | undefined,
    id: number | string,
    func?: (arg?: number | string) => void | Promise<void>
    propagate?: boolean
    role?: "button" | "submit"
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
    const {selectedNavState, setSelectedNavState} = useSelectedNavState()
    const {specificStyle, variant} = props
    
    const iconButtonSizes = {
        "sm": "h-[30px] w-[30px]",
        "md": "h-[35px] w-[35px]",
        "lg": "h-[40px] w-[40px]",
        "xl": "h-[45px] w-[45px]"
    }

    const baseStyle: string = `flex cursor-pointer transition-[0.1s_ease-out] items-center relative overflow-visible rounded-[8px]`

    const buttonSize = variant === "icon" && iconButtonSizes[props.size]

    const variantStyle = {
        "textIcon": `w-[max-content] bg-[var(--text-color1)] text-[var(--background1)] h-[35px] justify-center py-1 px-4 gap-2 rounded-[40px]`,
        "regular": `after:absolute after:pointer-events-none after:w-[calc(100%+8px)] after:h-[calc(100%+8px)] after:rounded-[inherit] hover:after:border-[var(--text-color1)] focus:after:border-[var(--text-color1)] hover:after:border-[2px] focus:after:border-[2px] w-[max-content] bg-[var(--accent-color1)] text-[var(--background1)] h-[35px] justify-center py-1 px-4 gap-2 rounded-[100px]`,
        "nav": `${props.id === selectedNavState? "bg-[var(--background3)] text-[var(--text-color1)] border-[0.5px] border-[var(--outline-color1)] h-[40px] text-[0.8rem] px-6 font-[600]" : "text-[var(--text-color2)] hover:bg-[var(--background2)] bg-transparent text-[0.8rem] px-4 h-[40px] font-[400]"} origin-center w-full font-[400] justify-left py-1  gap-4 rounded-[100px]`,
        "icon": `${buttonSize} justify-center`,
        "custom": " "
    }

    const renderContent = () => {
        switch(variant){
            case "regular" : return props.text
            case "nav":
            case "textIcon": {
                const {text,iconName,iconColor,iconPosition} = props

                const icon = (<Icon name={iconName} stroke={selectedNavState === props.id? 2 : 1.5} color={selectedNavState === props.id? "var(--text-color1)" : iconColor } size="md"/>)

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
                    <Icon name={iconName} color={iconColor} stroke={2} size={size}/>
                )
            }
            case "custom": return props.children;
            default: return
        }
    }

    const clickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {

        if(!props.propagate){
            event.preventDefault()
        }

        if(props.func){
            props.func()
        }

        switch(variant){
            case "nav" : (setSelectedNavState(props.id))
        }
    }

  return (
    <button 
    type={props.role ?? "button"}
    onClick={clickHandler}
    className={`
        ${baseStyle}
        ${variantStyle[variant]}
    `} style={specificStyle}>
        {renderContent()}
    </button>
  )
}
