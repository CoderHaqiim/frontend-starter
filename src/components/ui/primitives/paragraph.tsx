import React, { CSSProperties, ReactNode } from 'react'
import { SizeType } from '@/src/types/types'
import { bodySize } from '@/src/app/design/typograhy'

type ParagraphProps = {
    children?: ReactNode,
    size: SizeType
    specificStyle?: CSSProperties
}

export default function Paragraph({children, size ="md", specificStyle}: ParagraphProps) {
  const baseClass = `break-words text-[var(--color-textColor2)] w-full flex`

  const defaultStyle: CSSProperties = {
    fontSize: bodySize[size],
  }

  return (
    <p className={baseClass} 
      style={{
        ...defaultStyle, 
        ...specificStyle
        }}
    >
        {children}
    </p>
  )
}
