import { colors, ColorTypes } from '@/src/app/design/colors'
import { space } from '@/src/app/design/spacing'
import { bodySize, fontWeight, FontWeightTypes } from '@/src/app/design/typograhy'
import { SizeType } from '@/src/types/types'
import { CSSProperties } from 'react'

type LabelProps = {
 text: string,
 size: SizeType,
 specificStyle?: CSSProperties
 className?: string
 weight?: FontWeightTypes
 color?: ColorTypes
 required?: boolean
}

export default function Label({weight, required= false, color, text, size, specificStyle, className}: LabelProps) {
  const baseStyle = `leading-[1] flex items-center gap-[var(--space-sm)] text-[var(--color-textColor1)] text-left w-full h-[max-content]`

  const defaultStyle: CSSProperties = {
    fontSize: bodySize[size],
    marginBottom: space["xs"],
    fontWeight: (weight && fontWeight[weight]) ?? fontWeight["medium"],
    color: (color && colors[color]) ?? colors["textColor1"],
  }

  return (
    <label className={`${baseStyle} ${className}`} style={{ ...defaultStyle, ...specificStyle}}>
      {text}
      {required?<span className='text-[var(--color-error)]'>*</span> : ""}
    </label>
  )
}
