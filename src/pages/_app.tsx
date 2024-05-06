import { createContext, useEffect, useState } from 'react'
import { type AppType } from 'next/app'
import { usePathname } from 'next/navigation'
import Head from 'next/head'
import {
  DehydratedState,
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import BottomTab from '@/components/BottomTab'
import Header from '@/components/Header'

import { getMe, type User } from '@/apis/authApis'
import { LocalStorageManager, StorageKey } from '@/utils/localStorageUtil'

import { ChakraProvider, Flex, Box } from '@chakra-ui/react'
import { spoqaHanSans } from '@/styles/font'
import '@/styles/globals.css'
import reaTheme from '@/styles/theme'
import { Colors } from '@/styles/colors'

export const UserContext = createContext<{
  user: User | null
  setUser: (user: User | null) => void
}>({
  user: null,
  setUser: () => {
    // do nothing
  },
})

const MyApp: AppType<{ dehydratedState: DehydratedState }> = ({ Component, pageProps }) => {
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

  const shareData = {
    title: '별별부동산 | 솔직하고 간편한 공인중개사 리뷰 서비스',
    description: '이제 별별부동산에서 리뷰 검색하고, 안전하게 거래하세요!',
  }

  return (
    <>
      <Head>
        <title>{shareData.title}</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="title" content={shareData.title} key="title" />
        <meta name="description" content={shareData.description} key="description" />
        <meta property="og:title" content={shareData.title} key="og_title" />
        <meta property="og:description" content={shareData.description} key="og_description" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="별별부동산" key="og_site_name" />
        <meta property="og:image" content="/thumbnail.png" key="og_image" />
        <meta property="og:image:alt" content="starstaragent_logo" key="og_image_alt" />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_API + pathname} key="og_url" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ChakraProvider resetCSS theme={reaTheme}>
        <QueryClientProvider client={queryClient}>
          <HydrationBoundary state={pageProps.dehydratedState}>
            <UserContext.Provider value={{ user, setUser }}>
              <Box className={spoqaHanSans.className}>
                <Flex
                  direction="column"
                  height="100dvh"
                  bg={Colors.white}
                  maxW={480}
                  margin="0 auto"
                >
                  {needFixedLayout && <Header />}
                  <Box
                    flexGrow={1}
                    as="main"
                    overflowY="auto"
                    position="relative"
                    sx={{ scrollbarWidth: 'none' }}
                  >
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
          </HydrationBoundary>
        </QueryClientProvider>
      </ChakraProvider>
    </>
  )
}

export default MyApp
