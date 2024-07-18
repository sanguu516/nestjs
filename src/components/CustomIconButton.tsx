import { Colors } from '@/styles/colors'
import { fontStyles } from '@/styles/font'
import { type IconButtonVariant, type Size, iconButtonTheme } from '@/styles/theme/IconButton'
import { Button, type ButtonProps } from '@chakra-ui/react'
import { cloneElement } from 'react'

interface CustomIconButtonProps extends ButtonProps {
  size: Size
  variant: IconButtonVariant
  icon: React.ReactElement
  title?: string
}

export default function CustomIConButton({
  size,
  variant,
  icon,
  sx,
  title,
  ...rest
}: CustomIconButtonProps) {
  const { sizes, floatSizes, variants } = iconButtonTheme
  const propSize = size !== undefined && variant === 'floating' ? floatSizes[size] : sizes[size]
  const { icon: iconSize, button: buttonSize } = propSize

  return (
    <Button
      {...rest}
      {...buttonSize}
      variant={variant}
      _disabled={{ opacity: 1 }}
      sx={{ ...variants[variant], ...sx }}
      borderRadius="48px"
      p={0}
      {...fontStyles.semibold_16}
    >
      {icon && cloneElement(icon, { ...iconSize, ...icon.props, style: { marginRight: '5px' } })}
      {title ?? title}
    </Button>
  )
}
