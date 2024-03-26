import { buttonTheme } from './Button'
import { extendTheme } from '@chakra-ui/react'
import { Colors } from '../colors'

const reaTheme = extendTheme({
  colors: {
    ...Colors,
  },
  components: {
    Button: buttonTheme,
  },
})

export default reaTheme
