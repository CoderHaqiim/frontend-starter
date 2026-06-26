import { CSSProperties, ReactNode } from 'react'
import { space, spaceVariables } from '@/src/app/design/space'


type AsideProps = {
    children: ReactNode,
    variant: "right" | "left",
    specificStyles?: CSSProperties
}

export default function Aside({children, variant, specificStyles}: AsideProps){
  return (
    <aside className={`h-full bg-[white] p-[var(--lg)]`} style={{...specificStyles, ...spaceVariables}}>
       {children}
    </aside>
  )
}
