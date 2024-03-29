import { type Size, type IconButtonVariant, iconButtonTheme } from '@/styles/theme/IconButton'
import { Button, type ButtonProps } from '@chakra-ui/react'
import { cloneElement } from 'react'

interface CustomIconButtonProps extends ButtonProps {
  size: Size
  variant: IconButtonVariant
  icon: React.ReactElement
}

export default function CustomIConButton({ size, variant, icon, ...rest }: CustomIconButtonProps) {
  const { sizes, floatSizes, variants } = iconButtonTheme
  const iconSize = size !== undefined && variant === 'floating' ? floatSizes[size] : sizes[size]

  return (
    <Button
      {...rest}
      w="auto"
      variant={variant}
      _disabled={{ opacity: 1 }}
      sx={{ ...variants[variant] }}
      borderRadius="50%"
      p={0}
    >
      {icon && cloneElement(icon, { ...iconSize, ...icon.props })}
    </Button>
  )
}
