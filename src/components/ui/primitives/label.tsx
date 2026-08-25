import { CSSProperties } from 'react'
import { bodySize, fontWeight, FontWeightTypes } from '@/src/app/design/typograhy'
import { space } from '@/src/app/design/spacing'
import {SizeType} from '@/src/types/types'
import { ColorTypes, colors} from '@/src/app/design/colors'

type LabelProps = {
 text: string,
 size: SizeType,
 specificStyle?: CSSProperties
 className?: string
 weight?: FontWeightTypes
 color?: ColorTypes
}

export default function Label({weight, color, text, size, specificStyle, className}: LabelProps) {
  const baseStyle = `leading-[1] text-[var(--color-textColor1)] text-left w-full h-[max-content]`

  const defaultStyle: CSSProperties = {
    fontSize: bodySize[size],
    marginBottom: space["xs"],
    fontWeight: (weight && fontWeight[weight]) ?? fontWeight["medium"],
    color: (color && colors[color]) ?? colors["textColor1"],
  }

  return (
    <label className={`${baseStyle} ${className}`} style={{ ...defaultStyle, ...specificStyle}}>
      {text}
    </label>
  )
}
