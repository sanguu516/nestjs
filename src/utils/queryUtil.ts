import { type Coordinates } from '@/types'
export const QueryKeys = {
  agenciesByAddress: (center: Coordinates, radiusInMeter: number) => [
    `agenciesByAddress`,
    center,
    radiusInMeter,
  ],
  searchLocation: (query: string) => [`searchLocation`, query],
  agenciesByQuery: (query: string) => [`agenciesByQuery`, query],
  agenciesById: (id: number) => [`agenciesById`, id],
  keywordAboutReview: [`keyword`],
  reviewsAboutAgency: (agencyId: number) => ['reviewsAboutAgency', agencyId],
  getTrendingReviews: 'getTrendingReviews',
} as const
