import Card from '../ui/composites/card'
import Frame from '../ui/primitives/frame'
import Heading from '../ui/primitives/heading'
import Dropdown from '../ui/composites/dropdown'
import { ReactNode } from 'react'
import { useTheme } from '../providers/themeProvider'
import { FrameSizeType } from '@/src/types/types'
import { CSSProperties } from 'react'

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
    <Frame className={`flex-col border border-[var(--color-outline1)] gap-[var(--space-md)] p-[var(--space-lg)] bg-[var(--color-white)] rounded-[var(--radius-md)] ${className}`} 
    specificStyles={{
      width: width,
      height: height,
      minHeight: emptyState? "200px" : 0,
      ...specificStyles,
      backgroundColor: colors["background2"]
    }}>
        {children}
    </Frame>
  )
}
