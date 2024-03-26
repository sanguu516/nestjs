import { defineStyle, defineStyleConfig } from '@chakra-ui/react'
import { fontStyles } from '../font'

const filled = defineStyle({
  ...fontStyles.LabelMd,
  bg: 'indigo.600',
  color: 'white',
  borderRadius: 8,
  _disabled: {
    bg: 'gray.300',
  },
  _hover: {
    _disabled: {
      bg: 'gray.300',
    },
  },
})

export const buttonTheme = defineStyleConfig({
  variants: { filled },
})
