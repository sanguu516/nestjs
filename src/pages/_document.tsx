import { Head, Html, Main, NextScript } from 'next/document'
import Script from 'next/script'

const kakaoMapSdkSrc = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAO_API_KEY!}&autoload=false&libraries=clusterer`

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        <Script src={kakaoMapSdkSrc} strategy="beforeInteractive" />
      </body>
    </Html>
  )
}
