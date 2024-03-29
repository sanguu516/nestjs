import { buttonTheme } from './Button'
import { extendTheme } from '@chakra-ui/react'
import { Colors } from '../colors'
import { textareaTheme } from './Textarea'
import { inputTheme } from './Input'
import { linkTheme } from './Link'

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
    Textarea: textareaTheme,
    Input: inputTheme,
    Link: linkTheme,
  },
})

export default reaTheme
