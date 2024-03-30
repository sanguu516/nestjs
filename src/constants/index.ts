import { SearchLocationResult } from '@/apis/realEstateApis'

const base64 = 'data:image/png;base64'
const blurImage =
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOUlpNOBgABaQC5ghcdSQAAAABJRU5ErkJggg=='
export const blurDataURL = `${base64},${blurImage}`

export const KEYWORD_ICONS: Record<number, string> = {
  1: '👀',
  2: '🚫',
  3: '🗂️',
  4: '💬',
  5: '🤝',
  6: '🔍',
}

export const popularLocations: Omit<SearchLocationResult, 'id'>[] = [
  {
    name: '서울시 강남구',
    address_point: {
      lon: 127.047377408384,
      lat: 37.517331925853,
    },
  },
  {
    name: '서울시 송파구',
    address_point: {
      lon: 127.10591770866,
      lat: 37.51458371944,
    },
  },
  {
    name: '서울시 노원구',
    address_point: {
      lon: 127.056430475216,
      lat: 37.6543617567057,
    },
  },
  {
    name: '서울시 강동구',
    address_point: {
      lon: 127.123792501252,
      lat: 37.5301933196157,
    },
  },
  {
    name: '서울시 강서구',
    address_point: {
      lon: 126.849533759514,
      lat: 37.5509646154244,
    },
  },
  {
    name: '서울시 서초구',
    address_point: {
      lon: 127.032734543897,
      lat: 37.483588810333,
    },
  },
]
