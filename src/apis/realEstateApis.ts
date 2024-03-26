// fetchHandler
const BASE_URL = 'http://localhost:3000/api'
export const fetchApi = async <T>(path: string, init?: RequestInit): Promise<T> => {
  const url = BASE_URL + path
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...init,
  })
  if (res.ok) {
    return res.json() as Promise<T>
  }
  throw new Error('Request failed')
}

export interface RealEstateResponse {
  id: number
  agency_number: `${number}-${number}-${number}`
  name: string
  representative_name: string
  tel: `${number}`
  mobile: number | null
  address_short: string
  address_detail: string
  address_point: `POINT (${number} ${number})`
  open_at: `${number}-${number}-${number}`
  status: number
  homepage: string | null
  kakao_map_place_url?: string
}

export async function getRealEstateData(id: number): Promise<RealEstateResponse> {
  return fetchApi(`/real-estate/${id}`, {
    method: 'GET',
  })
}
