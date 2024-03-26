import { type AppType } from 'next/app'
import { Inter } from 'next/font/google'

import { api } from '@/utils/api'

import '@/styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'

const inter = Inter({
  subsets: ['latin'],
})

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ChakraProvider resetCSS>
      <main className={inter.className}>
        <Component {...pageProps} />
      </main>
    </ChakraProvider>
  )
}

export default api.withTRPC(MyApp)
