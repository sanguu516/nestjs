import { defineStyleConfig } from '@chakra-ui/react'
import { fontStyles } from '../font'
import { Colors } from '../colors'

export const inputTheme = defineStyleConfig({
  baseStyle: {
    border: 1,
    _placeholder: { color: Colors.gray[300] },
    ...fontStyles.BodyMd,
    _disabled: {
      bg: Colors.gray[25],
      color: Colors.gray[300],
    },
    _focusVisible: {
      borderColor: 'none important!',
    },
  },
})
