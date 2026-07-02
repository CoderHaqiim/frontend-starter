"use client"

import React, { CSSProperties, ReactNode } from 'react'
import Link from 'next/link'
import Icon, { IconType } from './icon'
import { useSelectedNavState } from '@/src/store/navState'
import { elementSizes } from '@/src/app/design/sizes'
import { colors } from '@/src/app/design/colors'
import { bodySize } from '@/src/app/design/typograhy'
import { SizeType } from '@/src/types/types'

type BaseLinkProps = {
    href: string
    specificStyle?: CSSProperties
}

type DefaultLinkProps = BaseLinkProps & {
    children: ReactNode
    variant: "stretch" | "hug"
    underline?: boolean
}

type NavLinkProps = BaseLinkProps & {
    variant: "nav-link"
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

    if(variant === "nav-link"){
        const {id, text, iconName, iconColor, iconPosition} = props
        const size = props.size ?? "md"
        const staticTextSize = ["xl", "lg"]
        const isSelected = id === selectedNavState
        const defaultStyles: CSSProperties = {
            height: elementSizes[size],
            fontSize: staticTextSize.includes(size)? bodySize["md"] : bodySize[size],
        }

        const baseStyle = `flex cursor-pointer transition-[0.1s_ease-out] items-center relative`
        const navStyle = `${isSelected? "bg-[var(--background3)] text-[var(--accent1)] px-6 font-[var(--bold)]" : "text-[var(--textColor2)] font-[var(--medium)] hover:bg-[var(--background2)] bg-transparent px-4"} origin-center w-full justify-left py-1 gap-4 rounded-[var(--md)]`
        const icon = (<Icon name={iconName} stroke={isSelected? 2 : 1.5} color={isSelected? colors["accent1"] : colors["textColor2"] } size={size}/>)

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

    const baseStyle = `${variant === "hug"? "w-max" : "w-full"} font-[var(--medium)] flex cursor-pointer transition-[0.1s_ease-out] text-[var(--textColor1)] items-center relative`
    const {underline, children} = props
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
