"use client"
import React, { CSSProperties, ReactNode } from 'react'
import { SizeType } from '@/src/types/types'
import { bodySize, FontWeightTypes } from '@/src/app/design/typograhy'
import { ColorTypes } from '@/src/app/design/colors'
import { fontWeight } from '@/src/app/design/typograhy'
import { useTheme } from '../../providers/themeProvider'

type ParagraphProps = {
    children?: ReactNode,
    size: SizeType
    specificStyle?: CSSProperties
    className?: string,
    color?: ColorTypes,
    weight?: FontWeightTypes
}

export default function Paragraph({
  children, 
  size ="md", 
  specificStyle,
  className,
  weight = "light",
  color = "textColor2"
}: ParagraphProps) {
  const {colors} = useTheme()
  const baseClass = `break-words text-[var(--color-textColor2)] flex`

  const defaultStyle: CSSProperties = {
    fontSize: bodySize[size],
    color: colors[color],
    fontWeight:fontWeight[weight]
  }

  return (
    <p className={`${baseClass} ${className}`} style={{...defaultStyle, ...specificStyle}}>
        {children}
    </p>
  )
}
