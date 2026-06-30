import React, { CSSProperties, ReactNode } from 'react'
import { Sizes } from '@/src/types/types'
import { bodySize } from '@/src/app/design/typograhy'
import { colors } from '@/src/app/design/colors'

type ParagraphProps = {
    children?: ReactNode,
    size: Sizes
    specificStyle?: CSSProperties
}

export default function Paragraph({children, size ="md", specificStyle}: ParagraphProps) {
  const baseClass = `break-words text-[var(--text-color2)] w-full flex`

  const defaultStyle: CSSProperties = {
    fontSize: bodySize[size],
    color: colors["textColor2"]
  }

  return (
    <p className={baseClass} style={{...defaultStyle, ...specificStyle}}>
        {children}
    </p>
  )
}
