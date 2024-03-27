import { buttonTheme } from './Button'
import { extendTheme } from '@chakra-ui/react'
import { Colors } from '../colors'

const reaTheme = extendTheme({
  styles: {
    global: () => ({
      body: {
        bg: '#f5f5f5',
      },
    }),
  },
  colors: {
    ...Colors,
  },
  components: {
    Button: buttonTheme,
  },
})

export default reaTheme
