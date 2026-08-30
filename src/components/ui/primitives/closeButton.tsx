import Button from './button'
import { FunctionType, SizeType } from '@/src/types/types'
import { useTheme } from '../../providers/themeProvider'

type CloseButtonProps = {
  func?: FunctionType
  size?: SizeType
  className?: string
}

export default function CloseButton({
  func,
  size = 'xs',
  className,
}: CloseButtonProps) {
  const { colors } = useTheme()

  return (
    <Button
      variant="ghost"
      size={size}
      isIcon
      iconName="icon-x"
      func={func}
      className={className}
      specificStyles={{
        backgroundColor: colors['white'],
        borderColor: colors['error2'],
      }}
    />
  )
}
