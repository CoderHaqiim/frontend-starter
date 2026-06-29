import { CSSProperties, ReactNode } from 'react'
import { space, spaceVariables } from '@/src/app/design/spacing'


type AsideProps = {
    children: ReactNode,
    variant: "right" | "left",
    specificStyles?: CSSProperties
}

export default function Aside({children, variant, specificStyles}: AsideProps){
  return (
    <aside className={`h-full p-[var(--lg)]`} style={{...specificStyles, ...spaceVariables}}>
       {children}
    </aside>
  )
}
