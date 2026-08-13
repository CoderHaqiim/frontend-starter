import React from 'react'
import Card from '../ui/composites/card'
import Frame from '../ui/primitives/frame'
import Heading from '../ui/primitives/heading'
import Dropdown from '../ui/composites/dropdown'
import { ReactNode } from 'react'
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
  return (
    <Frame width={width} direction='column' border height={height} gap="md" padding="lg" rounded='md' 
    className={`bg-[var(--color-white)] ${className}`} 
    specificStyles={{
      minHeight: emptyState? "200px" : 0,
      ...specificStyles
    }}>
        {children}
    </Frame>
  )
}
