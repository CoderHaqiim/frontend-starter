import React from 'react'
import Card from '../ui/composites/card'
import Frame from '../ui/primitives/frame'
import Heading from '../ui/primitives/heading'
import Dropdown from '../ui/composites/dropdown'
import { ReactNode } from 'react'
import { FrameSizeType } from '@/src/types/types'

type SectionProps = {
  children: ReactNode
  width?: FrameSizeType,
  height?: FrameSizeType
}

export default function Section({
  children,
  width="stretch",
  height="hug"
}: SectionProps) {
  return (
    <Frame width={width} border direction='column' height={height} gap="md" padding="lg" rounded='md' className="bg-[var(--color-white)]">
        {children}
    </Frame>
  )
}
