import localFont from 'next/font/local'

export const spoqaHanSans = localFont({
  src: [
    {
      path: './fonts/SpoqaHanSansNeo-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/SpoqaHanSansNeo-Light.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/SpoqaHanSansNeo-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/SpoqaHanSansNeo-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
})
