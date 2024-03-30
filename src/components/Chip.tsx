import { Colors } from '@/styles/colors'
import { fontStyles } from '@/styles/font'
import { chipTheme, type ChipSize, type ChipVariant } from '@/styles/theme/Chip'
import { Flex, Text, type BoxProps } from '@chakra-ui/react'
import { cloneElement, useState } from 'react'

interface ChipProps extends BoxProps {
  variant: ChipVariant
  size: ChipSize
  icon?: React.ReactElement
  unicode?: string
  handleClick?: (id: number) => void
}

export default function Chip({ size, variant, icon, unicode, handleClick, ...rest }: ChipProps) {
  const [isOff, setIsOff] = useState<boolean>(true)
  const isClickable = handleClick !== undefined

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

  const borderColor = !isOff && isClickable ? Colors.indigo[600] : Colors.gray[200]
  const color = isOff && isClickable ? Colors.gray[400] : Colors.gray[600]

  return (
    <Flex
      justify="start"
      align="center"
      gap={size === 'sm' ? 1 : 2}
      borderRadius={8}
      sx={{
        ...variantStyle,
        ...disableStyle,
        ...fontStyles.Caption,
        borderColor,
        color,
      }}
      onClick={handleClick ? handleChipClick : undefined}
      {...sizeStyle}
      {...rest}
    >
      <Text>
        {icon && cloneElement(icon, { width: '16px', height: '16px' })}
        {unicode}
      </Text>
      {rest.children}
    </Flex>
  )
}
