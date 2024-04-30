import { Head, Html, Main, NextScript } from 'next/document'

const kakaoMapSdkSrc = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAO_API_KEY!}&autoload=false&libraries=clusterer`
const kakaoApiKey = process.env.KAKAO_API_KEY

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

        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
