"use client"

import React, { ReactNode } from 'react'
import Frame from '../primitives/frame'
import { CSSProperties } from 'react'
import { FrameSizeType, SizeType } from '@/src/types/types'
import { useTheme } from '../../app/themeProvider'
import { shadow3 } from '@/src/app/design/shadows'

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
    <Frame width={width} justify={justify} align={align} scroll={scroll} height={height} gap={gap} rounded={rounded} direction="column" border padding={padding} className={`${className} ${shadow3}`}
      specificStyles={{
        backgroundColor: colors["white"],
        border: `solid 1px ${colors["outline1"]}`,
        ...specificStyles,
        }}>
      {children}
    </Frame>
  )
}
