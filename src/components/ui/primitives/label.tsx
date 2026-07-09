import { CSSProperties } from 'react'
import { bodySize } from '@/src/app/design/typograhy'
import { space } from '@/src/app/design/spacing'
import {SizeType} from '@/src/types/types'

type LabelProps = {
 text: string,
 size: SizeType,
 specificStyle?: CSSProperties
 className?: string
}

export default function Label({text, size, specificStyle, className}: LabelProps) {
  const baseStyle = `font-[var(--fontWeight-medium)] leading-[1] text-[var(--color-textColor1)] text-left w-full h-[max-content]`

  const defaultStyle: CSSProperties = {
    fontSize: bodySize[size],
    marginBottom: space["sm"]
  }

  return (
    <label className={`${baseStyle} ${className}`} style={{ ...defaultStyle, ...specificStyle}}>
      {text}
    </label>
  )
}
