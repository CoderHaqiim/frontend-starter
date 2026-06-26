import React, { CSSProperties, ReactNode } from 'react'
import { ObjectRecord } from '@/src/types/types'
import { bodySize } from '@/src/app/design/fontSize'

type ParagraphProps = {
    children?: ReactNode,
    size: "xs" | "sm" | "md",
    specificStyle?: CSSProperties
}

export default function Paragraph({children, size, specificStyle}: ParagraphProps) {
  const baseClass = `break-words text-[var(--text-color2)] w-full flex`

  const sizeMap: ObjectRecord = {
    "xs": bodySize.xs,
    "sm": bodySize.sm,
    "md": bodySize.md
  }

  const defaultStyle: CSSProperties = {
    fontSize: `${sizeMap[size]}`,
    color: 'var(--text-color2)'
  }

  return (
    <p className={baseClass} style={{...defaultStyle, ...specificStyle}}>
        {children}
    </p>
  )
}
