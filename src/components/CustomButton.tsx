import { type ButtonVariant, type Size } from '@/styles/theme/Button'
import { Button, type ButtonProps } from '@chakra-ui/react'

import { cloneElement } from 'react'

interface SizeProperty {
  width: string
  height: string
}

export const iconSizes: Record<string, SizeProperty> = {
  sm: {
    width: '16px',
    height: '16px',
  },
  md: {
    width: '20px',
    height: '20px',
  },
  lg: {
    width: '24px',
    height: '24px',
  },
}

interface CustomButtonProps extends ButtonProps {
  size: Size
  variant: ButtonVariant
  icon?: React.ReactElement
}

export default function CustomButton({ size, variant, icon, ...rest }: CustomButtonProps) {
  return (
    <Button {...rest} size={size} variant={variant}>
      {icon && cloneElement(icon, { ...iconSizes[size] })}
      {rest.children}
    </Button>
  )
}
