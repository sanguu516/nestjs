import localFont from 'next/font/local'
import { CSSProperties } from 'react'

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

export const fontStyles = {
  displayLg: {
    fontSize: 64,
    fontWeight: 700,
    lineHeight: 1.4,
  },
  displayMd: {
    fontSize: 48,
    fontWeight: 700,
    lineHeight: 1.4,
  },
  displaySm: {
    fontSize: 40,
    fontWeight: 700,
    lineHeight: 1.4,
  },
  HeadlineLg: {
    fontSize: 32,
    fontWeight: 700,
    lineHeight: 1.4,
  },
  HeadlineMd: {
    fontSize: 28,
    fontWeight: 700,
    lineHeight: 1.4,
  },
  HeadlineSm: {
    fontSize: 24,
    fontWeight: 700,
    lineHeight: 1.4,
  },
  TitleLg: {
    fontSize: 22,
    fontWeight: 700,
    lineHeight: 1.4,
  },
  TitleMd: {
    fontSize: 16,
    fontWeight: 700,
    lineHeight: 1.4,
  },
  TitleSm: {
    fontSize: 14,
    fontWeight: 700,
    lineHeight: 1.4,
  },
  BodyLg: {
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 1.75,
  },
  BodyMd: {
    fontSize: 14,
    fontWeight: 400,
    lineHeight: 1.75,
  },
  BodySm: {
    fontSize: 12,
    fontWeight: 400,
    lineHeight: 1.75,
  },
  LabelLg: {
    fontSize: 16,
    fontWeight: 700,
    lineHeight: 20,
  },
  LabelMd: {
    fontSize: 14,
    fontWeight: 700,
    lineHeight: 16,
  },
  LabelSm: {
    fontSize: 12,
    fontWeight: 700,
    lineHeight: 16,
  },
  Caption: {
    fontSize: 11,
    fontWeight: 500,
    lineHeight: 1.75,
    letterSpacing: 0.5,
  },
  Overline: {
    fontSize: 11,
    fontWeight: 500,
    lineHeight: 1.75,
    letterSpacing: 2,
  },
}
