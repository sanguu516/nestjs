// import { iconSizes } from '@/styles/theme/Button'
import { type ButtonVariant, type Size } from '@/styles/theme/Button'
import { Button } from '@chakra-ui/react'

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

interface CustomButtonProps {
  size: Size
  variant: ButtonVariant
  icon?: React.ReactElement
  isDisabled?: boolean
  children?: string
}

export default function CustomButton({
  size,
  variant,
  icon,
  isDisabled,
  children,
}: CustomButtonProps) {
  return (
    <Button size={size} variant={variant} isDisabled={isDisabled}>
      {icon && cloneElement(icon, { ...iconSizes[size] })}
      {children}
    </Button>
  )
}
