"use client"

import React, { ReactNode } from 'react'
import Frame from '../primitives/frame'
import { CSSProperties } from 'react'
import { FrameSizeType, SizeType } from '@/src/types/types'
import { useTheme } from '../../app/themeProvider'
import { shadow2 } from '@/src/app/design/shadows'

type CardProps = {
    children: ReactNode,
    rounded?: SizeType,
    padding: SizeType,
    width: FrameSizeType,
    height: FrameSizeType,
    specificStyles?: CSSProperties,
    justify?: CSSProperties["justifyContent"],
    align?: CSSProperties["alignItems"]
    className?: string
    scroll?: "hidden" | "visible"
    gap?: SizeType
}

export default function Card({
  children, 
  width, 
  height, 
  padding, 
  rounded = "md", 
  specificStyles,
  className,
  gap,
  scroll,
  justify,
  align
}: CardProps) {
  const {colors} = useTheme()
  return (
    <Frame width={width} border justify={justify} align={align} scroll={scroll} height={height} gap={gap} rounded={rounded} direction="column" padding={padding} className={`${className}`}
      specificStyles={{
        backgroundColor: colors["white"],
        ...specificStyles,
        }}>
      {children}
    </Frame>
  )
}
