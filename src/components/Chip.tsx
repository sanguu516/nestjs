import { fontStyles } from '@/styles/font'
import { type ChipVariant, chipTheme } from '@/styles/theme/Chip'
import { Box, Flex, type BoxProps } from '@chakra-ui/react'
import { cloneElement } from 'react'

interface ChipProps extends BoxProps {
  variant: ChipVariant
  icon?: React.ReactElement
  isDisabled?: boolean
}

export default function Chip({ variant, icon, isDisabled, ...rest }: ChipProps) {
  const variantStyle = chipTheme.variants[variant]
  const disableStyle = isDisabled && variantStyle?.disabled

  return (
    <Box
      {...rest}
      display="flex"
      justifyContent="center"
      alignItems="center"
      w={icon ? 90 : 70}
      h={8}
      px={2}
      py={4}
      borderRadius={8}
      sx={{ ...fontStyles.LabelMd, ...variantStyle, ...disableStyle }}
    >
      <Flex>
        {icon && cloneElement(icon, { width: '16px', height: '16px' })}
        {rest.children}
      </Flex>
    </Box>
  )
}
