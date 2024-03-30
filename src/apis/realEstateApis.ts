import { objectToQueryString } from '@/utils/queryStringUtil'
import { type PageParams, type PaginatedResponse } from './../types'
import { default as fetchApi, default as fetchHandler } from './fetchHandler'

interface Coordinates {
  lat: number
  lon: number
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

export async function getRealEstateData(id: number): Promise<RealEstateResponse> {
  return fetchHandler(`agency/agency/${id}/`)
}

interface SearchAgenciesParams {
  name_in?: string
  address_point_by?: string // ,를 이용해 세 값을 붙여보냅니다 (중심좌표lat,중심좌표log,반경meter)
  page?: number
  page_size?: number
}

export type SearchAgenciesResult = {
  id: number
  name: string
  representative_name: string
  address_short: string
  address_point: {
    lon: number
    lat: number
  }
  average_rating: number | null
}

export type SearchAgenciesResponse = PaginatedResponse<SearchAgenciesResult>
export interface SearchLocationResult {
  id: number
  name: string
  address_point: Coordinates
}

async function searchAgencies(params: SearchAgenciesParams): Promise<SearchAgenciesResponse> {
  const response = (await fetchApi(`agency/agency/?${objectToQueryString(params)}`, {
    method: 'GET',
  })) as SearchAgenciesResponse

  return {
    ...response,
    results: response.results.map((result) => {
      return result.average_rating ? result : { ...result, average_rating: Math.random() * 5 }
    }),
  }
}

export async function searchAgenciesByAddress(params: {
  center: Coordinates
  radiusInMeter: number
  pageParams?: PageParams
}): Promise<SearchAgenciesResponse> {
  const { center, radiusInMeter, pageParams } = params
  return searchAgencies({
    address_point_by: `${center.lat},${center.lon},${radiusInMeter}`,
    ...(pageParams ?? {}),
  })
}

export async function searchAgenciesByName(params: {
  name: string
  pageParams?: PageParams
}): Promise<SearchAgenciesResponse> {
  const { name, pageParams } = params

  return searchAgencies({
    name_in: name,
    ...(pageParams ?? {}),
  })
}

export async function searchLocation(params: {
  query: string
  pageParams?: PageParams
}): Promise<SearchAgenciesResponse> {
  const { query, pageParams } = params

  return fetchApi(
    `agency/location-point/?${objectToQueryString({ name_in: query, ...pageParams })}`
  )
}
