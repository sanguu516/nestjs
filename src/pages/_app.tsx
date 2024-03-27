import { type AppType } from 'next/app'

import { spoqaHanSans } from '@/styles/font'
import { useQueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import '@/styles/globals.css'
import reaTheme from '@/styles/theme'
import { ChakraProvider } from '@chakra-ui/react'

import BottomTab from '@/components/BottomTab'
import Header from '@/components/Header'

import { Colors } from '@/styles/colors'
import '@/styles/globals.css'
import { Box } from '@chakra-ui/react'

const MyApp: AppType = ({ Component, pageProps }) => {
  const [queryClient] = useState(() => useQueryClient())

  return (
    <ChakraProvider resetCSS theme={reaTheme}>
      <QueryClientProvider client={queryClient}>
        <Box className={spoqaHanSans.className}>
          <Box minH="110vh" bg={Colors.white} maxW={480} margin="0 auto">
            <Header />
            <Box as="main" pt={16} pb={20} px={4}>
              <Component {...pageProps} />
            </Box>
            <BottomTab
              backgroundColor={Colors.indigo[600]}
              activeColor={Colors.white}
              inActiveColor={Colors.indigo[300]}
            />
          </Box>
        </Box>
      </QueryClientProvider>
    </ChakraProvider>
  )
}

export default MyApp
