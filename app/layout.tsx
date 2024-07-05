import Chakra from '@/providers/ChakraProvider'
import ClientLayout from '@/providers/ClientLayout'
import HydrationProvider from '@/providers/HydrationProvider'
import QueryProvider from '@/providers/QueryClientProvider'
import { UserProvider } from '@/providers/UserProvider'
import '@/styles/globals.css'
import type { Metadata, Viewport } from 'next'
import Head from 'next/head'
import Script from 'next/script'

const kakaoApiKey = process.env.NEXT_PUBLIC_KAKAO_API_KEY
const kakaoMapSdkSrc = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoApiKey}&autoload=false&libraries=clusterer`

export const metadata: Metadata = {
  title: '별별부동산 | 솔직하고 간편한 공인중개사 리뷰 서비스',
  description: '이제 별별부동산에서 리뷰 검색하고, 안전하게 거래하세요!',
  openGraph: {
    title: '별별부동산 | 솔직하고 간편한 공인중개사 리뷰 서비스',
    description: '이제 별별부동산에서 리뷰 검색하고, 안전하게 거래하세요!',
    type: 'website',
    siteName: '별별부동산',
  },
}
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Chakra>
          <QueryProvider>
            <HydrationProvider>
              <UserProvider>
                <script
                  dangerouslySetInnerHTML={{
                    __html: `
                      var script = document.createElement('script');
                      script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.1/kakao.min.js';
                      script.integrity = 'sha384-kDljxUXHaJ9xAb2AzRd59KxjrFjzHa5TAoFQ6GbYTCAG0bjM55XohjjDT7tDDC01';
                      script.crossOrigin = 'anonymous';
                      script.onload = function() {
                        window.Kakao.init('${kakaoApiKey}');
                        window.Kakao.isInitialized();
                      }
                      document.body.appendChild(script);
                      `,
                  }}
                />
                <Script strategy="afterInteractive" type="text/javascript" src={kakaoMapSdkSrc} />
                <ClientLayout>{children}</ClientLayout>
              </UserProvider>
            </HydrationProvider>
          </QueryProvider>
        </Chakra>
      </body>
    </html>
  )
}
