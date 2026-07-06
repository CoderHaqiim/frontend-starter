"use client"

import React, { CSSProperties, ReactNode } from 'react'
import Link from 'next/link'
import Icon, { IconType } from './icon'
import { useSelectedNavState } from '@/src/store/navState'
import { elementSizes } from '@/src/app/design/sizes'
import { colors } from '@/src/app/design/colors'
import { bodySize } from '@/src/app/design/typograhy'
import { FrameSizeType, SizeType } from '@/src/types/types'

type BaseLinkProps = {
    href: string
    specificStyle?: CSSProperties
    width?: FrameSizeType
}

type DefaultLinkProps = BaseLinkProps & {
    children: ReactNode
    variant: "inline"
    underline?: boolean
}

type NavLinkProps = BaseLinkProps & {
    variant: "nav"
    text: string
    id?: string | number
    iconName: IconType
    iconColor?: string
    iconPosition: "left" | "right"
    size: SizeType
}

type LinkCompProps = DefaultLinkProps | NavLinkProps

export default function LinkComponent(props: LinkCompProps) {
    const {selectedNavState, setSelectedNavState} = useSelectedNavState()
    const {variant, href, specificStyle} = props

    if(variant === "nav"){
        const {id, text, iconName, iconColor, iconPosition} = props
        const size = props.size ?? "md"
        const staticTextSize = ["xl", "lg"]
        const isSelected = id === selectedNavState

        const defaultStyles: CSSProperties = {
            height: isSelected? elementSizes["lg"] : elementSizes[size],
            fontSize: staticTextSize.includes(size)? bodySize["md"] : bodySize[size],
        }

        const baseStyle = `flex cursor-pointer transition-[0.1s_ease-out] items-center relative`
        const navStyle = `${isSelected? "bg-[var(--color-accent2)] text-[var(--color-textColor1)] px-6 font-[var(--fontWeight-bold)]" : "text-[var(--color-textColor2)] font-[var(--color-fontWeight-medium)] hover:bg-[var(--color-background2)] bg-transparent px-4"} origin-center w-full justify-left py-1 gap-4 rounded-[var(--radius-xl)]`
        const icon = (<Icon name={iconName} stroke={isSelected? 2 : 1.5} color={isSelected? colors["textColor1"] : colors["textColor2"] } size={size}/>)

        return (
            <Link
                href={href}
                onClick={() => id !== undefined && setSelectedNavState(id)}
                className={`${baseStyle} ${navStyle}`}
                style={{
                    ...defaultStyles,
                    ...specificStyle,
                }}
            >
                {iconPosition === "left" && icon}
                {text}
                {iconPosition === "right" && icon}
            </Link>
        )
    }

    const baseStyle = `${variant === "inline"? "w-max" : "w-full"} font-[var(--medium)] flex cursor-pointer transition-[0.1s_ease-out] text-[var(--textColor1)] items-center relative`
    const { underline, children } = props
    const lineStyle = underline? `border-b-[1px] border-b-[var(--textColor1)]` : ""
    const linkStyle  = `${baseStyle} ${lineStyle}`

    return (
    <Link href= {href} className={`${linkStyle}`} 
        style={{
            ...specificStyle
        }}
    >
        {children}
    </Link>
  )
}
