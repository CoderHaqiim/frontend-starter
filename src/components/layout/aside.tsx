import React, { CSSProperties, ReactNode } from 'react'
import { navItems } from '@/src/utils/navItems'
import LinkComponent from '../ui/link'
import Button from '../ui/button'


type AsideProps = {
    children: ReactNode,
    variant: "right" | "left",
    specificStyles?: CSSProperties
}

export default function Aside({children, variant, specificStyles}: AsideProps){
  return (
    <aside className={`h-full px-2 py-4 ${variant === "left"? "border-r-[0.5px] border-r-[var(--outline-color1)]" : "border-l-[0.5px] border-l-[var(--outline-color1)]"}`} style={specificStyles}>
       {children}
    </aside>
  )
}
