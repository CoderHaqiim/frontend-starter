"use client"

import React, { CSSProperties, ReactNode } from 'react'
import Link from 'next/link'
import Icon, { IconType } from './icon'
import { useSelectedNavState } from '@/src/store/navState'
import { elementSizes } from '@/src/app/design/elementSize'
import { colorVariables, colors } from '@/src/app/design/colors'
import { spaceVariables } from '@/src/app/design/space'
import { fontWeightVariables } from '@/src/app/design/fontWeight'
import { bodySize } from '@/src/app/design/fontSize'

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
    size: "xs" | "sm" | "md" | "lg" | "xl"
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
            fontSize: staticTextSize.includes(size)? bodySize["medium"] : bodySize[size],
        }
        const baseStyle = `flex cursor-pointer transition-[0.1s_ease-out] items-center relative overflow-visible rounded-[8px]`
        const navStyle = `${isSelected? "border-[1px] border[var(--accent1)] bg-[var(--background3)] text-[var(--accent1)] px-6 font-[var(--bold)]" : "text-[var(--text-color2)] font-[var(--medium)] hover:bg-[var(--background2)] bg-transparent px-4"} origin-center w-full justify-left py-1 gap-4 rounded-[var(--md)]`
        const icon = (<Icon name={iconName} stroke={isSelected? 2 : 1.5} color={isSelected? colors["accent1"] : iconColor } size={size}/>)

        return (
            <Link
                href={href}
                onClick={() => id !== undefined && setSelectedNavState(id)}
                className={`${baseStyle} ${navStyle}`}
                style={{
                    ...defaultStyles,
                    ...specificStyle,
                    ...colorVariables,
                    ...spaceVariables,
                    ...fontWeightVariables
                }}
            >
                {iconPosition === "left" && icon}
                {text}
                {iconPosition === "right" && icon}
            </Link>
        )
    }

    const {underline, children} = props
    const baseStyle = `${variant === "hug"? "w-[max-content]" : "w-full"} relative cursor-pointer transition-[0.1s_ease-out] font-[700] text-[var(--accent-color1)] overflow-hidden h-[max-content] flex`
    const lineStyle = underline? `border-b-[1px] border-b-[var(--text-color1)]` : ""
    const linkStyle  = `${baseStyle} ${lineStyle}`

    return (
    <Link href= {href} className={`${linkStyle}`} style={specificStyle}>
        {children}
    </Link>
  )
}
