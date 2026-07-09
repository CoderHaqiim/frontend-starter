import { CSSProperties, ReactNode } from 'react'

type AsideProps = {
    children: ReactNode,
    variant: "right" | "left",
    specificStyles?: CSSProperties,
    className?: string
}

export default function Aside({children, className, specificStyles}: AsideProps){
  return (
    <aside className={`h-full flex p-[var(--space-lg)] ${className}`} style={{...specificStyles }}>
       {children}
    </aside>
  )
}
