"use client"

import { Children, CSSProperties, ReactNode } from "react"
import Icon, {IconType} from "./icon"
import { elementSizes } from "@/src/app/design/elementSize"
import { colorVariables} from "@/src/app/design/colors"
import { spaceVariables } from "@/src/app/design/space"
import { fontWeightVariables } from "@/src/app/design/fontWeight"
import { bodySize } from "@/src/app/design/fontSize"

type baseProps = {
    specificStyle?: CSSProperties | undefined,
    id: number | string,
    func?: (arg?: number | string) => void | Promise<void>
    propagate?: boolean
    role?: "button" | "submit" | "reset"
    size: "xs" | "sm" | "md" | "lg" | "xl"
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
    const {specificStyle, variant} = props

    const size = props.size ?? "md";

    const staticTextSize = ["xl", "lg"]

    const defaultStyles: CSSProperties = {
        height: elementSizes[size],
        fontSize: staticTextSize.includes(size)? bodySize["medium"] : bodySize[size],
        width: variant === "icon" ? elementSizes[size] : undefined,
    };

    const baseStyle: string = `flex pointer-events-auto cursor-pointer transition-[0.1s_ease-out] items-center relative overflow-visible rounded-[8px]`
    const hoverStyles = `after:absolute after:pointer-events-none after:w-[calc(100%+8px)] after:h-[calc(100%+8px)] after:rounded-[inherit] hover:after:border-[var(--accent1)] focus:after:border-[var(--text-color1)] hover:after:border-[2px] focus:after:border-[2px]`
    const variantStyle = {
        "textIcon": `${hoverStyles} w-[max-content] bg-[var(--text-color1)] text-[var(--background1)] justify-center py-1 px-4 gap-2 font-[400] rounded-[40px]`,
        "regular": `${hoverStyles} font-[400] w-[max-content] bg-[var(--accent1)] text-[var(--background1)] justify-center py-1 px-4 gap-2 rounded-[100px]`,
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
        ...specificStyle,
        ...colorVariables,
        ...spaceVariables,
        ...fontWeightVariables
        }}>
        {renderContent()}
    </button>
  )
}
