import { Colors } from '@/styles/colors'
import { fontStyles } from '@/styles/font'
import { type ChipVariant, type ChipSize, chipTheme } from '@/styles/theme/Chip'
import { Text, Flex, type BoxProps } from '@chakra-ui/react'
import { cloneElement, useState } from 'react'

interface ChipProps extends BoxProps {
  variant: ChipVariant
  size: ChipSize
  icon?: React.ReactElement
  unicode?: string
  handleClick?: (id: number) => void
}

export default function Chip({ size, variant, icon, unicode, handleClick, ...rest }: ChipProps) {
  const isClikable = handleClick !== undefined
  const [isOff, setIsOff] = useState<boolean>(isClikable)

  const sizeStyle = chipTheme.sizes[size]
  const variantStyle = chipTheme.variants[variant]
  const disableStyle = isOff && variantStyle?.disabled

  const handleChipClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const target = e.target as HTMLDivElement
    if (target.dataset.id) {
      handleClick?.(+target.dataset.id)
      setIsOff((prev) => !prev)
    }
  }

  return (
    <Flex
      {...sizeStyle}
      {...rest}
      justify="start"
      align="center"
      gap={size === 'sm' ? 1 : 2}
      borderRadius={8}
      color={Colors.gray[500]}
      sx={{ ...variantStyle, ...disableStyle, ...fontStyles.Caption }}
      onClick={handleClick ? handleChipClick : undefined}
    >
      <Text>
        {icon && cloneElement(icon, { width: '16px', height: '16px' })}
        {unicode}
      </Text>
      {rest.children}
    </Flex>
  )
}
