import type { NextApiRequest, NextApiResponse } from 'next'
import type { RealEstateResponse } from '@/apis/realEstateApis'

const dummy_data: RealEstateResponse[] = [
  {
    id: 1,
    agency_number: '41463-2019-00120',
    name: '아너스공인중개사사무소',
    representative_name: '조정남',
    tel: '0312842249',
    mobile: null,
    address_short: '경기 용인시 기흥구',
    address_detail:
      '경기 용인시 기흥구 구성로 470 상가동 101호 (청덕동, 물푸레마을4단지 경남아너스빌)',
    address_point: 'POINT (127.152958668746 37.2968494172365)',
    open_at: '2019-10-04',
    status: 1,
    homepage: null,
    kakao_map_place_url: 'http://place.map.kakao.com/25478011',
  },
  {
    id: 2,
    agency_number: '00000-00000-00000',
    name: '별별공인중개사사무소',
    representative_name: '별별별',
    tel: '0000000000',
    mobile: null,
    address_short: '경기 용인시 별별구',
    address_detail: '경기 용인시 별별구 별별로',
    address_point: 'POINT (127.152958668740 37.2968494172360)',
    open_at: '2019-10-01',
    status: 0,
    homepage: null,
    kakao_map_place_url: 'http://place.map.kakao.com/25478011',
  },
]

export default function handler(req: NextApiRequest, res: NextApiResponse<RealEstateResponse>) {
  if (req.method === 'GET') {
    const queryId = req.query.id?.[0]
    const data = dummy_data.find(({ id }) => id.toString() === queryId)
    if (data) {
      return res.status(200).json(data)
    }
    throw new Error('not valid id')
  }
  throw Error('unknonwn error')
}
