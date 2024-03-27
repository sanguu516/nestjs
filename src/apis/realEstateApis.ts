import fetchHandler from './fetchHandler'

interface Coordinates {
  latitude: number
  longitude: number
}
export interface RealEstateResponse {
  id: number
  agency_number: string
  name: string
  representative_name: string
  tel: number
  mobile: number | null
  address_short: string
  address_detail: string
  address_point: Coordinates
  average_rating: number
  // open_at: `${number}-${number}-${number}`
  // status: number
  // kakao_map_place_url?: string
  // homepage: string | null
}

export async function getRealEstateData(id: number) {
  return fetchHandler(`agency/agency/${id}/`) as Promise<RealEstateResponse>
}
