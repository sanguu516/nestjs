import { fontStyles } from '@/styles/font'
import { defineStyleConfig } from '@chakra-ui/react'

export const textareaTheme = defineStyleConfig({
  baseStyle: {
    border: '1px',
    borderColor: 'gray.300',
    w: 400,
    minH: 108,
    h: 'auto',
    pl: 3,
    pr: 6,
    py: 3,
    whiteSpace: 'pre-wrap',
    scrollbarWidth: 'none',
    _focus: {
      borderColor: 'gray.300 !important',
      boxShadow: 'none !important',
    },
    ...fontStyles.BodyLg,
  },
})
