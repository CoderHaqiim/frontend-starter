import { FrameSizeType } from '@/src/types/types'
import { CSSProperties, ReactNode } from 'react'
import { useTheme } from '../providers/themeProvider'
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
  const {colors} = useTheme()
  return (
    <Frame className={`flex-col border-[1px] border-[var(--color-outline1)] gap-[var(--space-md)] p-[var(--space-lg)] bg-[var(--color-background2)] rounded-[var(--radius-md)] ${className}`} 
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
