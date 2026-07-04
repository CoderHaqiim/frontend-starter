import { CSSProperties, ReactNode } from 'react'

type AsideProps = {
    children: ReactNode,
    variant: "right" | "left",
    specificStyles?: CSSProperties
}

export default function Aside({children, specificStyles}: AsideProps){
  return (
    <aside className={`h-full p-(--space-lg)`} 
      style={{
        ...specificStyles, 
        }}
    >
       {children}
    </aside>
  )
}
