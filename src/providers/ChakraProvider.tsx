import reaTheme from '@/styles/theme'
import { ChakraProvider } from '@chakra-ui/react'

const Chakra = ({ children }: { children: React.ReactNode }) => {
  return (
    <ChakraProvider resetCSS theme={reaTheme}>
      {children}
    </ChakraProvider>
  )
}

export default Chakra
