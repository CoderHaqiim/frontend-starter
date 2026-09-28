"use client"

import { FunctionType, SizeType } from '@/src/types/types'
import { useState } from 'react'
import { useTheme } from '../../../providers/themeProvider'
import Button from './button'

type CloseButtonProps = {
  func?: FunctionType
  size?: SizeType
  className?: string
}

export default function CloseButton({ func, size = 'xs', className}: CloseButtonProps) {
  const { colors } = useTheme()
  const [isHovered, setIsHovered] = useState(false)

  // The button paints its background and its icon colour inline, so the hover
  // colours are swapped through state instead of a `hover:` class.
  return (
    <Button variant="ghost" size={size} isIcon iconName="icon-x" func={func}
      className={className}
      iconColor={isHovered ? 'error' : 'textColor1'}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      specificStyles={{
        backgroundColor: isHovered ? colors['error2'] : colors['white'],
        borderColor: colors['error2'],
        zIndex:"50"
      }}
    />
  )
}
