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
      address: {
        fontStyle: 'normal',
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
    Popover: {
      variants: {
        responsive: {
          content: {
            width: 'unset',
          },
        },
      },
    },
  },
})

export default reaTheme
