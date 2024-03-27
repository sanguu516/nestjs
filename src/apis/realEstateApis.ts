import fetchApi from './fetchHandler'
import { PageParams, PaginatedResponse } from './../types'
import { objectToQueryString } from '@/utils/queryStringUtil'
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

interface SearchAgenciesParams {
  name_in?: string
  address_point_by?: string // ,를 이용해 세 값을 붙여보냅니다 (중심좌표lat,중심좌표log,반경meter)
  page?: number
  page_size?: number
}

type SearchAgenciesResult = {
  id: number
  name: string
  representative_name: string
  address_short: string
  address_point: {
    lon: number
    lat: number
  }
  average_rating: number
}

export type SearchAgenciesResponse = PaginatedResponse<SearchAgenciesResult>

async function searchAgencies(params: SearchAgenciesParams): Promise<SearchAgenciesResponse> {
  return fetchApi(`agency/agency/?${objectToQueryString(params)}`, {
    method: 'GET',
  })
}

export async function searchAgenciesByAddress(params: {
  center: Coordinates
  radiusInMeter: number
  pageParams?: PageParams
}): Promise<SearchAgenciesResponse> {
  const { center, radiusInMeter, pageParams } = params
  return searchAgencies({
    address_point_by: `${center.latitude},${center.longitude},${radiusInMeter}`,
    ...(pageParams ?? {}),
  })
}
