import { CSSProperties } from 'react'
import { bodySize } from '@/src/app/design/typograhy'
import { space } from '@/src/app/design/spacing'
import {SizeType} from '@/src/types/types'

type LabelProps = {
 text: string | undefined,
 size: SizeType,
 specificStyle?: CSSProperties
}

export default function Label({text, size, specificStyle}: LabelProps) {
  const baseStyle = `font-[var(--medium)] leading-[1] text-[var(--text-color1)] text-left w-full h-[max-content]`

  const defaultStyle: CSSProperties = {
    fontSize: bodySize[size],
    marginBottom: space["sm"]
  }

  return (
    <label className={`
      ${baseStyle}
    `} style={{
      ...defaultStyle, 
      ...specificStyle,
      }}>
      {text}
    </label>
  )
}
