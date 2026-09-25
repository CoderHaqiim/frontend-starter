"use client"

import { ColorTypes } from "@/src/app/design/colors"
import { radius } from "@/src/app/design/radius"
import { elementSizes, paddingSizes } from "@/src/app/design/sizes"
import { bodySize } from "@/src/app/design/typograhy"
import { FrameSizeType, FunctionType, SizeType } from "@/src/types/types"
import { CSSProperties, ReactNode } from "react"
import { useTheme } from "../../../providers/themeProvider"
import Icon, { IconType } from "./icon"

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
    showFocusRing?: boolean
    disabled?: boolean
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
    showFocusRing = true,
    disabled = false,
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
           variant === "ghost"? "transparent":
           variant === "outline"? colors["background3"]:
           "",
        color: 
            variant === "fill"? colors["white"]:
            variant === "outline"? colors["textColor1"]:
            variant === "ghost"? colors["textColor1"]:
            "",
        border: 
            variant === "outline"? `solid 1px var(--color-outline3)` : "",
        height: elementSizes[size] ?? height ,
        fontSize: staticTextSize.includes(size)? bodySize["md"] : bodySize[size],
        justifyContent: justify,
        cursor: disabled ? "not-allowed" : "pointer",
        pointerEvents: disabled ? "none" : "all",
        opacity: disabled ? 0.55 : 1,
    }

    const hoverStyles = ""

    const renderContent = () => {
        return (
            <>
                {iconName && iconPosition === "left" && <Icon buttonVariant={variant} name={iconName} fill={iconFill && colors[iconFill]} color={iconColor ?? (variant === "fill"? "white" : undefined)} size={size} stroke="2"/>}
                {children}
                {iconName && iconPosition === "right" && <Icon buttonVariant={variant} name={iconName} fill={iconFill && colors[iconFill]} color={iconColor ?? (variant === "fill"? "white": undefined)}  size={size} stroke="2"/>}
            </>
        )
    }

     const clickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (disabled) {
            event.preventDefault()
            event.stopPropagation()
            return
        }

        if(!propagate){
            event.preventDefault()
        }

        {func && func()}
    }

  return (
    <button 
    type={role}
    onClick={clickHandler}
    disabled={disabled}
    className={`
            ${className}
            ${derivedPadding}
            ${showFocusRing ? hoverStyles : ""}
            whitespace-nowrap
            transition-transform
            duration-100
            ease-out
            shrink-0
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

