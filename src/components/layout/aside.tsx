import { CSSProperties, ReactNode } from 'react'
import { FrameSizeType } from '@/src/types/types'

type AsideProps = {
    children: ReactNode
    specificStyles?: CSSProperties,
    className?: string,
    width?: FrameSizeType
}

export default function Aside({children, width, className, specificStyles}: AsideProps){
  return (
    <aside className={`h-full flex flex-col p-[var(--space-xl)] ${className}`} 
      style={{
        width: (width && width) ?? "max-content",
        ...specificStyles 
      }}>
       {children}
    </aside>
  )
}
