import { type User } from './authApis'
import fetchHandler from './fetchHandler'
import { type RealEstateResponse } from './realEstateApis'

interface KeywordData {
  id: number
  name: string
}

export async function getKeywordData(): Promise<KeywordData[]> {
  return fetchHandler('review/agency-review/keyword/', {
    method: 'GET',
  })
}

type Agency = Omit<
  RealEstateResponse,
  'address_detail' | 'address_point' | 'tel' | 'mobile' | 'agency_number'
>

type UserKeyword = { keyword: KeywordData } & {
  is_selected: boolean
}

export interface GetReviewResponse {
  id: number
  user: User
  agency: Agency
  rating: number
  content: string //
  user_keywords: UserKeyword[]
}

// 유저가 작성한 리뷰 하나에 대한 데이터
export async function getReviewData(id: number): Promise<GetReviewResponse> {
  return fetchHandler(`review/agency-review/review/${id}`, {
    method: 'GET',
  })
}

interface GetReviewsDataParmas {
  agench_id: number
  pageParams: {
    page: number
    page_size: number
  }
}

interface GetReviewsResponse {
  total_count: number
  page: number
  page_size: number
  next_page: number | null
  previous_page: number | null
  results: GetReviewResponse[]
}

export async function getTrendingReviews(): Promise<GetReviewsResponse> {
  return fetchHandler('review/agency-review/review/?page=1&page_size=2', {
    method: 'GET',
  })
}

// 하나의 중개사무소에 대한 리뷰 데이터
export async function getAgencyReivewsData({
  agench_id,
  pageParams,
}: GetReviewsDataParmas): Promise<GetReviewsResponse> {
  const { page, page_size } = pageParams
  return fetchHandler(
    `review/agency-review/review/?agency_id=${agench_id}&page=${page}&page_size=${page_size}`,
    {
      method: 'GET',
    }
  )
}

export interface PostReviewParmas {
  agency: number
  rating: number
  content: string
  user_keywords: {
    keyword: number
    is_selected: boolean
  }[]
}

export type PostReviewResponse = PostReviewParmas | { id: number }

export async function postReview(params: PostReviewParmas): Promise<PostReviewResponse> {
  return fetchHandler('review/agency-review/review', {
    method: 'POST',
    body: JSON.stringify(params),
  })
}

// 더미 데이터

export const DUMMY_KEYWORD = [
  { id: 1, name: '확인된 매물만 보여줘요' },
  { id: 2, name: '계약강요 없어요' },
  { id: 3, name: '매물이 다양해요' },
  { id: 4, name: '소통이 원활해요' },
  { id: 5, name: '거래방식이 안전해요' },
  { id: 6, name: '매물 비교를 잘해줘요' },
]

export const DUMMY_DETAIL_DATA: GetReviewsResponse = {
  total_count: 123,
  page: 1,
  page_size: 10,
  next_page: 0,
  previous_page: 0,
  results: [
    {
      id: 0,
      user: {
        id: 0,
        email: 'user@example.com',
        username: '단단한나무늘보23',
      },
      agency: {
        id: 0,
        name: 'string',
        representative_name: 'string',
        address_short: 'string',
        address_point: {
          lon: 0,
          lat: 0,
        },
        average_rating: 0,
      },
      rating: 2,
      content:
        '친절한 공인중개사님 덕분에 좋은 거래 할 수 있었습니다. 믿고 맡길 수 있는 부동산인 것 같아요!  친절한 공인중개사',
      user_keywords: [
        {
          keyword: {
            id: 0,
            name: 'string',
          },
          is_selected: true,
        },
      ],
    },
    {
      id: 1,
      user: {
        id: 1,
        email: 'user@example.com',
        username: '',
      },
      agency: {
        id: 0,
        name: 'string',
        representative_name: 'string',
        address_short: 'string',
        address_point: {
          lon: 0,
          lat: 0,
        },
        average_rating: 0,
      },
      rating: 3,
      content:
        '친절한 공인중개사님 덕분에 좋은 거래 할 수 있었습니다. 믿고 맡길 수 있는 부동산인 것 같아요!  친절한 공인중개사 친절한 공인중개사님 덕분에 좋은 거래 할 수 있었습니다. 믿고 맡길 수 있는 부동친절한 공인중개사님 덕분에 좋은 거래 할 수 있었습니다. 믿고 맡길 수 있는 부동산인 것 같아요!  친절한 공인중개사 친절한 공인중개사님 덕분에 좋은 거래 할 수 있었습니다. 믿고 맡길 수 있는 부동친절한 공인중개사님 덕분에 좋은 거래 할 수 있었습니다. 믿고 맡길 수 있는 부동산인 것 같아요!  친절한 공인중개사 친절한 공인중개사님 덕분에 좋은 거래 할 수 있었습니다. 믿고 맡길 수 있는 부동친절한 공인중개사님 덕분에 좋은 거래 할 수 있었습니다. 믿고 맡길 수 있는 부동산인 것 같아요!  친절한 공인중개사 친절한 공인중개사님 덕분에 좋은 거래 할 수 있었습니다는 부동산인 것 같아요!  친절한 공인중개사 친절한 공인중개사님 덕분에 좋은 거래 할 수 있었습니다는 부동산인 것 같아요!  친',
      user_keywords: [
        {
          keyword: {
            id: 0,
            name: 'string',
          },
          is_selected: true,
        },
      ],
    },
  ],
}
