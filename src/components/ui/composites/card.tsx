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
    specificStyles?: CSSProperties
}

export default function Card({
  children, 
  width, 
  height, 
  padding, 
  rounded, 
  specificStyles
}: CardProps) {
  return (
    <Frame 
      width={width} 
      height={height} 
      rounded={rounded} 
      direction="column" 
      border 
      padding={padding}
    specificStyles={{
      boxShadow:"0px 2px 2px -3px black",
      ...specificStyles
    }}>
      {children}
    </Frame>
  )
}
