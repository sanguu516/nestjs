import { type IconButtonVariant, type Size, iconButtonTheme } from '@/styles/theme/IconButton'
import { Button, type ButtonProps } from '@chakra-ui/react'
import { cloneElement } from 'react'

interface CustomIconButtonProps extends ButtonProps {
  size: Size
  variant: IconButtonVariant
  icon: React.ReactElement
}

export default function CustomIConButton({
  size,
  variant,
  icon,
  sx,
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
      borderRadius="50%"
      p={0}
    >
      {icon && cloneElement(icon, { ...iconSize, ...icon.props })}
    </Button>
  )
}
