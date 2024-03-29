import { Head, Html, Main, NextScript } from 'next/document'

const kakaoMapSdkSrc = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAO_API_KEY!}&autoload=false&libraries=clusterer`

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              var script = document.createElement('script');
              script.src = '${kakaoMapSdkSrc}';
              document.body.appendChild(script);
            `,
          }}
        />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
