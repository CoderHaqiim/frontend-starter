"use client"

import { CSSProperties, ReactNode } from "react"
import Icon, {IconType} from "./icon"
import { elementSizes } from "@/src/app/design/sizes"
import { bodySize } from "@/src/app/design/typograhy"
import { SizeType } from "@/src/types/types"
import { paddingSizes } from "@/src/app/design/sizes"
import { FunctionType } from "@/src/types/types"
import { colors } from "@/src/app/design/colors"
import { FrameSizeType } from "@/src/types/types"
import { radius } from "@/src/app/design/radius"

type ButtonProps = {
    variant: "ghost" | "fill" | "outline",
    rounded?: SizeType,
    iconName?: IconType,
    iconColor?: CSSProperties["color"],
    iconPosition?: "left" | "right"
    children?: ReactNode,
    size?: SizeType,
    width?: FrameSizeType
    specificStyles?: CSSProperties,
    func?: FunctionType
    role?: "submit" | "button" | "reset"
    propagate?: boolean
    justify?: "start" | "end"| "center",
    isIcon?: boolean
}

export default function Button({
    variant, 
    rounded = "sm",
    iconName,
    isIcon = false,
    iconColor,
    iconPosition = "left",
    children,
    size = "md",
    specificStyles,
    width = "hug",
    role = "button",
    propagate = false,
    justify = "center",
    func
}: ButtonProps) {

    const derivedPadding = !isIcon &&  paddingSizes[size]
    const staticTextSize = ["xl", "lg", "xxl"]
    const defaultStyles = {
        width: 
            isIcon? elementSizes[size] :
            width === "hug"? "max-content" : 
            width === "stretch"? "100%" : 
            width,
        borderRadius: 
            rounded && radius[rounded],
        backgroundColor: 
           variant === "fill"? colors["accent1"]:
           variant === "ghost"? colors["background2"]
           :"",
        color: 
            variant === "fill"? colors["white"]: 
            variant === "outline"? colors["textColor1"]:
            variant === "ghost"? colors["textColor1"]:
            "",
        border: 
            variant === "outline"? `solid 1px ${colors["outline"]}` : "",
        height: elementSizes[size],
        fontSize: staticTextSize.includes(size)? bodySize["md"] : bodySize[size],
        justifyContent: justify
    }

    const hoverStyles = `
    after:self-center
    after:absolute after:pointer-events-none 
    after:w-[calc(100%+8px)] after:h-[calc(100%+8px)] 
    after:rounded-[inherit] hover:after:border-[var(--color-accent1)] 
    focus:after:border-[var(--color-textColor1)] hover:after:border-[2px] 
    focus:after:border-[2px]`

    const renderContent = () => {
        return (
            <>
                {iconName && iconPosition === "left" && <Icon name={iconName} color={iconColor ?? (variant === "fill"? colors["white"] : undefined)} size={size} stroke={2}/>}
                {children}
                {iconName && iconPosition === "right" && <Icon name={iconName} color={iconColor ?? (variant === "fill"? colors["white"] : undefined)}  size={size} stroke={2}/>}
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
            ${derivedPadding}
            ${hoverStyles}
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

