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
}

export default function Section({
  children,
  width="stretch",
  height="hug",
  className,
  specificStyles
}: SectionProps) {
  return (
    <Frame width={width} border direction='column'  height={height} gap="md" padding="lg" rounded='md' className={`bg-[var(--color-white)] ${className}`} specificStyles={{...specificStyles}}>
        {children}
    </Frame>
  )
}
