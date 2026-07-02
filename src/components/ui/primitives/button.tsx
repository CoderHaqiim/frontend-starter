"use client"

import { CSSProperties, ReactNode } from "react"
import Icon, {IconType} from "./icon"
import { elementSizes } from "@/src/app/design/sizes"
import { bodySize } from "@/src/app/design/typograhy"
import { SizeType } from "@/src/types/types"
import { paddingSizes } from "@/src/app/design/sizes"
import { FunctionType } from "@/src/types/types"

type baseProps = {
    specificStyles?: CSSProperties | undefined,
    func?: FunctionType
    propagate?: boolean
    role?: "button" | "submit" | "reset"
    size: SizeType,
}

type regularProps = baseProps & {
    variant: "text"
    text: string,
}

type textIconProps = baseProps & {
    variant: "text-icon",
    text: string,
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
    children?: ReactNode
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
    };

    const paddingVariables = paddingSizes[props.size]

    const baseStyle = `flex justify-center pointer-events-auto cursor-pointer transition-[0.1s_ease-out] items-center relative overflow-visible leading-none rounded-[var(--md)] font-[var(--medium)]`
    const hoverStyles = `after:absolute after:pointer-events-none after:w-[calc(100%+8px)] after:h-[calc(100%+8px)] after:rounded-[inherit] hover:after:border-[var(--accent1)] focus:after:border-[var(--text-color1)] hover:after:border-[2px] focus:after:border-[2px]`

    const variantStyle = {
        "text-icon": 
        `${hoverStyles} 
         ${paddingVariables} 
         w-max bg-[var(--accent1)] text-[var(--background1)] font-[var(--medium)] rounded-[var(--lg)]`,

        "text": 
        `${hoverStyles}
         ${paddingVariables} 
         font-[var(--medium)] w-max bg-[var(--accent1)] text-[var(--background1)] rounded-[var(--lg)]`,

        "icon": `${hoverStyles}`,

        "custom": " "
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
