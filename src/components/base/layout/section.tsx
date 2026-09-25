import { FrameSizeType } from '@/src/types/types'
import { CSSProperties, ReactNode } from 'react'
import Frame from '../ui/primitives/frame'

type SectionProps = {
  children: ReactNode
  width?: FrameSizeType,
  height?: FrameSizeType,
  className?: string,
  specificStyles?: CSSProperties
  emptyState?: boolean
}

export default function Section({
  children,
  width="stretch",
  height="hug",
  className,
  emptyState= false,
  specificStyles
}: SectionProps) {
  return (
    <Frame className={`flex-col border-b-[0.5px] border-b-[var(--color-outline1)] gap-[var(--space-lg)] py-[var(--space-lg)] px-[var(--space-lg)] ${className}`} 
    specificStyles={{
      width: width,
      height: height,
      minHeight: emptyState? "200px" : 0,
      ...specificStyles,
    }}>
        {children}
    </Frame>
  )
}
