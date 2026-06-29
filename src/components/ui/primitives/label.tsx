import { CSSProperties } from 'react'
import { bodySize } from '@/src/app/design/typograhy'
import { fontWeightVariables, fontWeight } from '@/src/app/design/typograhy'
import { colorVariables } from '@/src/app/design/colors'
import { space, spaceVariables } from '@/src/app/design/spacing'

type LabelProps = {
 text: string | undefined,
 size: "xs" | "sm" | "md",
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
      ...spaceVariables,
      ...colorVariables,
      ...fontWeightVariables
      }}>
      {text}
    </label>
  )
}
