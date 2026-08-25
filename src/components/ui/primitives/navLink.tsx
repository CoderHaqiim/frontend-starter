"use client"

import React, { CSSProperties, ReactNode } from 'react'
import Link from 'next/link'
import Icon, { IconType } from './icon'
import { elementSizes } from '@/src/app/design/sizes'
import { bodySize } from '@/src/app/design/typograhy'
import { FrameSizeType, SizeType } from '@/src/types/types'
import { usePathname } from 'next/navigation'

type NavLinkProps = {
    iconName: IconType
    iconColor?: string
    iconPosition: "left" | "right"
    size: SizeType
    className?: string
    width?: FrameSizeType
    href: string
    specificStyle?: CSSProperties
    children?: ReactNode
}

export default function NavLink(props: NavLinkProps) {
    const {href, children, specificStyle, iconName,iconPosition} = props
    const pathname = usePathname();

    const textSize = props.size ?? "md"
    const staticTextSize = ["xl", "lg"]
    const normalizedPath = pathname.replace(/\/$/, "") || "/"
    const normalizedHref = href.replace(/\/$/, "") || "/"
    const isSelected = normalizedPath === normalizedHref ||
        (normalizedHref !== "/dashboard" && normalizedPath.startsWith(`${normalizedHref}/`))

    const defaultStyles: CSSProperties = {
        height: `${isSelected? elementSizes["md"] : elementSizes["md"]}`,
        fontSize: staticTextSize.includes(textSize)? bodySize["md"] : bodySize[textSize]
    }
    const baseStyle = `flex cursor-pointer transition-[0.1s_ease-out] items-center relative`
    const navStyle = `${isSelected? "bg-[var(--color-accent2)] text-[var(--color-textColor1)] px-6 font-[var(--fontWeight-bold)]" : "text-[var(--color-textColor2)] hover:bg-[var(--color-shadow)] bg-transparent px-4"} origin-center w-full justify-left py-1 gap-4 rounded-[var(--radius-sm)]`
    const icon = (<Icon name={iconName} stroke={isSelected? "2" : "1.5"} color={isSelected? "textColor1" : "textColor2" } size={textSize}/>)
    return (
        <Link
            href={href}
            className={`${baseStyle} ${navStyle}`}
            style={{
                ...defaultStyles,
                ...specificStyle,
            }}>
            {iconPosition === "left" && icon}
            {children}
            {iconPosition === "right" && icon}
        </Link>
    )
}
