import { type AppType } from 'next/app'
import { Inter } from 'next/font/google'

import { api } from '@/utils/api'

import '@/styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import reaTheme from '@/styles/theme'
import { spoqaHanSans } from '@/styles/font'
import { useQueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

const MyApp: AppType = ({ Component, pageProps }) => {
  const [queryClient] = useState(() => useQueryClient())

  return (
    <ChakraProvider resetCSS theme={reaTheme}>
      <main
        style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}
        className={spoqaHanSans.className}
      >
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </main>
    </ChakraProvider>
  )
}

export default api.withTRPC(MyApp)
