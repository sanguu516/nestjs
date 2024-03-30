import { type AppType } from 'next/app'

import { spoqaHanSans } from '@/styles/font'
import '@/styles/globals.css'
import reaTheme from '@/styles/theme'
import { ChakraProvider, Flex } from '@chakra-ui/react'
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
          <Flex direction="column" height="100vh" bg={Colors.white} maxW={480} margin="0 auto">
            <Header />
            <Box flexGrow={1} as="main" overflowY="auto" position="relative">
              <Component {...pageProps} />
            </Box>
            <BottomTab
              backgroundColor={Colors.indigo[600]}
              activeColor={Colors.white}
              inActiveColor={Colors.indigo[300]}
            />
          </Flex>
        </Box>
      </QueryClientProvider>
    </ChakraProvider>
  )
}

export default MyApp
