import React, { ReactNode } from 'react'
import Frame from '../primitives/frame'
import { CSSProperties } from 'react'
import { FrameSizeType, SizeType } from '@/src/types/types'

type CardProps = {
    children: ReactNode,
    rounded?: SizeType,
    padding: SizeType,
    width: FrameSizeType,
    height: FrameSizeType,
    specificStyles?: CSSProperties,
    className?: string
    scroll?: boolean
}

export default function Card({
  children, 
  width, 
  height, 
  padding, 
  rounded, 
  specificStyles,
  className,
  scroll
}: CardProps) {
  return (
    <Frame width={width} scroll="hidden" height={height} rounded={rounded} direction="column" border padding={padding} className={className}
      specificStyles={{...specificStyles }}>
      {children}
    </Frame>
  )
}
