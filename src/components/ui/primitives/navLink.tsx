"use client"

import React, { CSSProperties, ReactNode } from 'react'
import Link from 'next/link'
import Icon, { IconType } from './icon'
import { useSelectedNavState } from '@/src/store/navState'
import { elementSizes } from '@/src/app/design/sizes'
import { colors } from '@/src/app/design/colors'
import { bodySize } from '@/src/app/design/typograhy'
import { FrameSizeType, SizeType } from '@/src/types/types'
import { usePathname, useParams } from 'next/navigation'

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
    const params = useParams();

    let cleanPath = pathname;

    Object.values(params).forEach((value) => {
        if (typeof value === "string") {
            cleanPath = cleanPath.replace(`/${value}`, "");
        }
    });

    const textSize = props.size ?? "md"
    const staticTextSize = ["xl", "lg"]
    const isSelected = cleanPath === href

    const defaultStyles: CSSProperties = {
        height: elementSizes["lg"],
        fontSize: staticTextSize.includes(textSize)? bodySize["md"] : bodySize[textSize]
    }
    const baseStyle = `flex cursor-pointer transition-[0.1s_ease-out] items-center relative`
    const navStyle = `${isSelected? "bg-[var(--color-accent2)] text-[var(--color-textColor1)] px-6 font-[var(--fontWeight-bold)]" : "text-[var(--color-textColor2)] font-[var(--color-fontWeight-medium)] hover:bg-[var(--color-background2)] bg-transparent px-4"} origin-center w-full justify-left py-1 gap-4 rounded-[var(--radius-xl)]`
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
