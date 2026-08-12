"use client"

import { CSSProperties, ReactNode } from "react"
import Icon, {IconType} from "./icon"
import { elementSizes } from "@/src/app/design/sizes"
import { bodySize } from "@/src/app/design/typograhy"
import { SizeType } from "@/src/types/types"
import { paddingSizes } from "@/src/app/design/sizes"
import { FunctionType } from "@/src/types/types"
import { ColorTypes } from "@/src/app/design/colors"
import { FrameSizeType } from "@/src/types/types"
import { radius } from "@/src/app/design/radius"
import { useTheme } from "../../app/themeProvider"

type ButtonProps = {
    variant: "ghost" | "fill" | "outline",
    rounded?: SizeType,
    iconName?: IconType,
    iconColor?: ColorTypes,
    iconPosition?: "left" | "right"
    children?: ReactNode,
    iconFill?: ColorTypes,
    size?: SizeType,
    width?: FrameSizeType
    specificStyles?: CSSProperties,
    func?: FunctionType
    role?: "submit" | "button" | "reset"
    propagate?: boolean
    justify?: "start" | "end"| "center",
    isIcon?: boolean
    className?: string
    height?: CSSProperties
}

export default function Button({
    variant, 
    rounded = "lg",
    iconName,
    isIcon = false,
    iconColor,
    iconPosition = "left",
    children,
    size = "md",
    iconFill,
    specificStyles,
    width = "hug",
    role = "button",
    propagate = false,
    justify = "center",
    className,
    height,
    func
}: ButtonProps) {

    const {colors} = useTheme()
    const derivedPadding = !isIcon &&  paddingSizes[size]
    const staticTextSize = ["xl", "lg", "xxl"]
    const defaultStyles: CSSProperties = {
        width: 
            isIcon? elementSizes[size] :
            width === "hug"? "max-content" : 
            width === "stretch"? "100%" : 
            width,
        borderRadius: 
            rounded && radius[rounded],
        backgroundColor: 
           variant === "fill"? colors["accent"]:
           variant === "ghost"? colors["background1"]:
           "",
        color: 
            variant === "fill"? colors["white"]:
            variant === "outline"? colors["textColor1"]:
            variant === "ghost"? colors["textColor1"]:
            "",
        border: 
            variant === "outline"? `solid 1px ${colors["outline2"]}` : "",
        height: elementSizes[size] ?? height ,
        fontSize: staticTextSize.includes(size)? bodySize["md"] : bodySize[size],
        justifyContent: justify,
        cursor: "pointer",
        pointerEvents:"all"
    }

    const hoverStyles = `
    after:self-center
    after:absolute after:pointer-events-none 
    after:w-[calc(100%+8px)] after:h-[calc(100%+8px)] 
    after:rounded-[inherit] hover:after:border-[var(--color-accent)] 
    focus:after:border-[var(--color-textColor1)] hover:after:border-[2px] 
    focus:after:border-[2px]`

    const renderContent = () => {
        return (
            <>
                {iconName && iconPosition === "left" && <Icon name={iconName} fill={iconFill && colors[iconFill]} color={iconColor ?? (variant === "fill"? "white" : undefined)} size={size} stroke="2"/>}
                {children}
                {iconName && iconPosition === "right" && <Icon name={iconName} fill={iconFill && colors[iconFill]} color={iconColor ?? (variant === "fill"? "white": undefined)}  size={size} stroke="2"/>}
            </>
        )
    }

     const clickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        if(!propagate){
            event.preventDefault()
        }

        {func && func()}
    }

  return (
    <button 
    type={role}
    onClick={clickHandler}
    className={`
            ${className}
            ${derivedPadding}
            ${hoverStyles}
            whitespace-nowrap
            transition-transform
            duration-100
            ease-out
            active:scale-92
            justify-center items-center relative flex font-[var(--fontWeight-medium)]
        `}
    style={{
        ...defaultStyles,
        ...specificStyles
    }}>
        {renderContent()}
    </button>
  )
}

