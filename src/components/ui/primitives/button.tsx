"use client"

import { CSSProperties, ReactNode } from "react"
import Icon, {IconType} from "./icon"
import { elementSizes } from "@/src/app/design/sizes"
import { colorVariables} from "@/src/app/design/colors"
import { spaceVariables, space } from "@/src/app/design/spacing"
import { fontWeight, fontWeightVariables } from "@/src/app/design/typograhy"
import { bodySize } from "@/src/app/design/typograhy"
import { Sizes } from "@/src/types/types"
import { paddingSizes } from "@/src/app/design/sizes"

type baseProps = {
    specificStyles?: CSSProperties | undefined,
    func?: (arg?: number | string) => void | Promise<void>
    propagate?: boolean
    role?: "button" | "submit" | "reset"
    size: Sizes
}

type regularProps = baseProps & {
    variant: "regular"
    text: string,
}

type textIconProps = baseProps & {
    variant: "textIcon",
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

    const baseStyle: string = `flex justify-center pointer-events-auto cursor-pointer transition-[0.1s_ease-out] items-center relative overflow-visible leading-none rounded-[8px]`
    const hoverStyles = `after:absolute after:pointer-events-none after:w-[calc(100%+8px)] after:h-[calc(100%+8px)] after:rounded-[inherit] hover:after:border-[var(--accent1)] focus:after:border-[var(--text-color1)] hover:after:border-[2px] focus:after:border-[2px]`
    const variantStyle = {
        "textIcon": `${hoverStyles} ${paddingVariables} w-[max-content] bg-[var(--accent1)] text-[var(--background1)] justify-center font-[400] rounded-[40px]`,
        "regular": `${hoverStyles} ${paddingVariables} font-[400] w-[max-content] bg-[var(--accent1)] text-[var(--background1)] justify-center gap-2 rounded-[100px]`,
        "icon": `${hoverStyles} justify-center`,
        "custom": " "
    }

    const renderContent = () => {
        switch(variant){
            case "regular" : return props.text
            case "textIcon": {
                const {text,iconName,iconColor,iconPosition} = props

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
    `} style={{
        ...defaultStyles,
        ...specificStyles,
        ...colorVariables,
        ...spaceVariables,
        ...fontWeightVariables
        }}>
        {renderContent()}
    </button>
  )
}
