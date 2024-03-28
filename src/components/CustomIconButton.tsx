import { type Size, type IconButtonVariant, iconButtonTheme } from '@/styles/theme/IconButton'
import { Button } from '@chakra-ui/react'
import { cloneElement } from 'react'

interface CustomIconButtonProps {
  size: Size
  variant: IconButtonVariant
  icon: React.ReactElement
  isDisabled?: boolean
  onClick?: () => void
}

export default function CustomIConButton({
  size,
  variant,
  icon,
  isDisabled,
  onClick,
}: CustomIconButtonProps) {
  const { sizes, floatSizes, variants } = iconButtonTheme
  const iconSize = size !== undefined && variant === 'floating' ? floatSizes[size] : sizes[size]

  return (
    <Button
      w="auto"
      variant={variant}
      isDisabled={isDisabled}
      _disabled={{ opacity: 1 }}
      sx={{ ...variants[variant] }}
      borderRadius="50%"
      p={0}
      onClick={onClick}
    >
      {icon && cloneElement(icon, { ...iconSize, ...icon.props })}
    </Button>
  )
}
