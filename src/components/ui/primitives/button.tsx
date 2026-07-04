"use client"

import { CSSProperties, ReactNode } from "react"
import Icon, {IconType} from "./icon"
import { elementSizes } from "@/src/app/design/sizes"
import { bodySize } from "@/src/app/design/typograhy"
import { SizeType } from "@/src/types/types"
import { paddingSizes } from "@/src/app/design/sizes"
import { FunctionType } from "@/src/types/types"
import { colors } from "@/src/app/design/colors"

type baseProps = {
    specificStyles?: CSSProperties | undefined,
    func?: FunctionType
    propagate?: boolean
    role?: "button" | "submit" | "reset"
    size: SizeType,
    border?: boolean
}

type regularProps = baseProps & {
    variant: "text"
    text: string | number,
}

type textIconProps = baseProps & {
    variant: "text-icon",
    text: string | number,
    iconName: IconType,
    iconColor?: string,
    iconPosition: "left" | "right"
}

type customProps = baseProps & {
    variant: "custom",
    children: ReactNode,
}

type IconProps = baseProps & {
    variant: "icon",
    iconName: IconType,
    iconColor?: string,
    children?: ReactNode,
    border?: boolean
}

type ButtonProps = regularProps | textIconProps | customProps | IconProps

export default function Button(props: ButtonProps) {
    const {specificStyles, variant} = props

    const size = props.size ?? "md";

    const staticTextSize = ["xl", "lg", "xxl"]

    const defaultStyles: CSSProperties = {
        height: elementSizes[size],
        fontSize: staticTextSize.includes(size)? bodySize["md"] : bodySize[size],
        width: variant === "icon" ? elementSizes[size] : undefined,
        border: props.border? `solid 1px ${colors["outline"]}` : ""
    }

    const paddingVariables = paddingSizes[props.size]

    const baseStyle = `flex justify-center pointer-events-auto cursor-pointer transition-[0.1s_ease-out] items-center relative overflow-visible leading-none font-[var(--fontWeight-medium)]`
    const hoverStyles = `after:absolute after:pointer-events-none after:w-[calc(100%+8px)] after:h-[calc(100%+8px)] after:rounded-[inherit] hover:after:border-[var(--color-accent1)] focus:after:border-[var(--color-textColor1)] hover:after:border-[2px] focus:after:border-[2px]`

    const variantStyle = {
        "text-icon": 
        `${hoverStyles} 
         ${paddingVariables} 
         w-max bg-[var(--color-accent1)] text-[var(--color-background1)] font-[var(--fontWeight-medium)] rounded-[var(--radius-lg)]`,

        "text": 
        `${hoverStyles}
         ${paddingVariables} 
         font-[var(--fontWeight-medium)] w-max bg-[var(--color-accent1)] text-[var(--color-background1)] rounded-[var(--radius-lg)]`,

        "icon": `${hoverStyles} rounded-[var(--radius-sm)]`,

        "custom": `${paddingVariables} `
    }

    const renderContent = () => {
        switch(variant){
            case "text" : return props.text
            case "text-icon": {
                const { text, iconName, iconColor, iconPosition } = props

                const icon = (<Icon name={iconName} color={iconColor} size={props.size}/>)

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
                    <>
                        <Icon name={iconName} color={iconColor} stroke={2} size={size}/>
                        {props.children && props.children}
                    </>
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
    }

  return (
    <button 
        type={props.role ?? "button"}
        onClick={clickHandler}
        className={`
            ${baseStyle}
            ${variantStyle[variant]}
        `} 
        style={{
            ...defaultStyles,
            ...specificStyles,
        }}>
            {renderContent()}
    </button>
  )
}
