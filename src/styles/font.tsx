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
    lineHeight: '1.4px',
  },
  displayMd: {
    fontSize: 48,
    fontWeight: 700,
    lineHeight: '1.4px',
  },
  displaySm: {
    fontSize: 40,
    fontWeight: 700,
    lineHeight: '1.4px',
  },
  HeadlineLg: {
    fontSize: 32,
    fontWeight: 700,
    lineHeight: '1.4px',
  },
  HeadlineMd: {
    fontSize: 28,
    fontWeight: 700,
    lineHeight: '1.4px',
  },
  HeadlineSm: {
    fontSize: 24,
    fontWeight: 700,
    lineHeight: '1.4px',
  },
  TitleLg: {
    fontSize: 22,
    fontWeight: 700,
    lineHeight: '1.4px',
  },
  TitleMd: {
    fontSize: 16,
    fontWeight: 700,
    lineHeight: '1.4px',
  },
  TitleSm: {
    fontSize: 14,
    fontWeight: 700,
    lineHeight: '1.4px',
  },
  BodyLg: {
    fontSize: 16,
    fontWeight: 400,
    lineHeight: '1.75px',
  },
  BodyMd: {
    fontSize: 14,
    fontWeight: 400,
    lineHeight: '1.75px',
  },
  BodySm: {
    fontSize: 12,
    fontWeight: 400,
    lineHeight: '1.75px',
  },
  LabelLg: {
    fontSize: 16,
    fontWeight: 700,
    lineHeight: 1.25,
  },
  LabelMd: {
    fontSize: 14,
    fontWeight: 700,
    lineHeight: 1.14,
  },
  LabelSm: {
    fontSize: 12,
    fontWeight: 700,
    lineHeight: 1.3,
  },
  Caption: {
    fontSize: 11,
    fontWeight: 500,
    lineHeight: 1.45,
    letterSpacing: 0.5,
  },
  Overline: {
    fontSize: 11,
    fontWeight: 500,
    lineHeight: 1.45,
    letterSpacing: 2,
  },
}
