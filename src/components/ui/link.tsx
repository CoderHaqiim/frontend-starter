import React, { ReactNode } from 'react'
import Link from 'next/link'

type LinkCompProps = {
    children: ReactNode
    href: string
    variant: "stretch" | "hug"
    underline?: boolean
}

export default function LinkComponent({variant, underline, children, href}: LinkCompProps) {
    const baseStyle = `${variant === "hug"? "w-[max-content]" : "w-full"} font-[700] text-[var(--accent-color1)] overflow-hidden h-[max-content]`
    const lineStyle = underline? `border-b-[1px] border-b-[var(--text-color1)]` : ""
    const linkStyle  = `${baseStyle} ${lineStyle}`
    return (
    <Link href= {href} className={`${linkStyle}`}>
        {children}
    </Link>
  )
}
