import { type AppType } from 'next/app'

import { spoqaHanSans } from '@/styles/font'
import '@/styles/globals.css'
import reaTheme from '@/styles/theme'
import { ChakraProvider } from '@chakra-ui/react'

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ChakraProvider resetCSS theme={reaTheme}>
      <main
        style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}
        className={spoqaHanSans.className}
      >
        <Component {...pageProps} />
      </main>
    </ChakraProvider>
  )
}

export default MyApp
