import { type AppType } from 'next/app'

import { spoqaHanSans } from '@/styles/font'
import '@/styles/globals.css'
import reaTheme from '@/styles/theme'
import { ChakraProvider, Flex } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createContext, useEffect, useState } from 'react'

import BottomTab from '@/components/BottomTab'
import Header from '@/components/Header'

import { getMe, User } from '@/apis/authApis'
import { Colors } from '@/styles/colors'
import '@/styles/globals.css'
import { LocalStorageManager, StorageKey } from '@/utils/localStorageUtil'
import { Box } from '@chakra-ui/react'
import { usePathname } from 'next/navigation'

export const UserContext = createContext<{
  user: User | null
  setUser: (user: User | null) => void
}>({
  user: null,
  setUser: () => {
    // do nothing
  },
})

const MyApp: AppType = ({ Component, pageProps }) => {
  const [queryClient] = useState(() => new QueryClient())
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const token = LocalStorageManager.get(StorageKey.aceessToken)

    if (token) {
      void getMe().then(setUser)
    }
  }, [])

  const pathname = usePathname()
  const needFixedLayout = ['/', '/real-estates', '/my-page'].includes(pathname)

  return (
    <ChakraProvider resetCSS theme={reaTheme}>
      <QueryClientProvider client={queryClient}>
        <UserContext.Provider value={{ user, setUser }}>
          <Box className={spoqaHanSans.className}>
            <Flex direction="column" height="100dvh" bg={Colors.white} maxW={480} margin="0 auto">
              {needFixedLayout && <Header />}
              <Box flexGrow={1} as="main" overflowY="auto" position="relative">
                <Component {...pageProps} />
              </Box>
              {needFixedLayout && (
                <BottomTab
                  backgroundColor={Colors.indigo[600]}
                  activeColor={Colors.white}
                  inActiveColor={Colors.indigo[300]}
                />
              )}
            </Flex>
          </Box>
        </UserContext.Provider>
      </QueryClientProvider>
    </ChakraProvider>
  )
}

export default MyApp
