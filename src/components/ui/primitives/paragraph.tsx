import React, { CSSProperties, ReactNode } from 'react'
import { SizeType } from '@/src/types/types'
import { bodySize } from '@/src/app/design/typograhy'
import { colors } from '@/src/app/design/colors'
import { fontWeight } from '@/src/app/design/typograhy'

type ParagraphProps = {
    children?: ReactNode,
    size: SizeType
    specificStyle?: CSSProperties
    className?: string,
    color?: string,
    weight?: string
}

export default function Paragraph({
  children, 
  size ="md", 
  specificStyle,
  className,
  weight = "normal",
  color = "textColor2"
}: ParagraphProps) {
  const baseClass = `break-words text-[var(--color-textColor2)] flex`

  const defaultStyle: CSSProperties = {
    fontSize: bodySize[size],
    color: color,
    fontWeight:weight
  }

  return (
    <p className={`${baseClass} ${className}`} style={{...defaultStyle, ...specificStyle}}>
        {children}
    </p>
  )
}
