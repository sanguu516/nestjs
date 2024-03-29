import { type AppType } from 'next/app'

import { spoqaHanSans } from '@/styles/font'
import '@/styles/globals.css'
import reaTheme from '@/styles/theme'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

import BottomTab from '@/components/BottomTab'
import Header from '@/components/Header'

import { Colors } from '@/styles/colors'
import '@/styles/globals.css'
import { Box } from '@chakra-ui/react'

const MyApp: AppType = ({ Component, pageProps }) => {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <ChakraProvider resetCSS theme={reaTheme}>
      <QueryClientProvider client={queryClient}>
        <Box className={spoqaHanSans.className}>
          <Box display="grid" minH="100vh" bg={Colors.white} maxW={480} margin="0 auto">
            {/* <Header /> */}
            {/* pt={16} pb={20} px={4}borderColor={Colors.gray[300]}border="1px solid" */}
            <Box flex={1} as="main">
              <Component {...pageProps} />
            </Box>
            {/* <BottomTab
              backgroundColor={Colors.indigo[600]}
              activeColor={Colors.white}
              inActiveColor={Colors.indigo[300]}
            /> */}
          </Box>
        </Box>
      </QueryClientProvider>
    </ChakraProvider>
  )
}

export default MyApp
