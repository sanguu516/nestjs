import { extendTheme } from '@chakra-ui/react'
import { Colors } from './colors'

const reaTheme = extendTheme({
  colors: {
    ...Colors,
  },
})

export default reaTheme
