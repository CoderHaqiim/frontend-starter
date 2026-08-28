"use client"

import React, { ReactNode } from 'react'
import Frame from '../primitives/frame'
import { CSSProperties } from 'react'
import { FrameSizeType, SizeType } from '@/src/types/types'
import { useTheme } from '../../providers/themeProvider'
import { shadow2 } from '@/src/app/design/shadows'
import { space } from '@/src/app/design/spacing'
import { radius } from '@/src/app/design/radius'

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
    <Frame scroll={scroll} className={`border-[1px] flex-col border-[var(--color-outline1)] ${className}`}
      specificStyles={{
        width: width,
        justifyContent: justify,
        alignItems: align,
        height: height,
        gap: gap && space[gap],
        borderRadius: rounded && radius[rounded],
        padding: padding && space[padding],
        backgroundColor: colors["white"],
        ...specificStyles,
        }}>
      {children}
    </Frame>
  )
}
