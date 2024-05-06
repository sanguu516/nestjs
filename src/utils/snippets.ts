import { addHyphenToTel } from '@/utils/telUtil'
import { type RealEstateResponse } from '@/apis/realEstateApis'
import { type GetReviewResponse } from '@/apis/reviewApis'

const getReviewSnippet = (reviews: GetReviewResponse[]) =>
  reviews.map((e) => ({
    '@type': 'Review',
    reviewBody: e.content,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: e.rating,
    },
    author: {
      '@type': 'Person',
      name: e.user.username,
    },
  }))

export const getRichSnippet = (agency: RealEstateResponse, review: GetReviewResponse[]) => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: agency.name,
  telephone: addHyphenToTel(agency.tel || agency.mobile),
  address: {
    '@type': 'PostalAddress',
    streetAddress: agency.address_detail,
    addressCountry: 'KR',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: agency.average_rating,
    reviewCount: review.length,
  },
  review: getReviewSnippet(review),
  geo: {
    '@type': 'GeoCoordinates',
    latitude: agency.address_point.lat,
    longitude: agency.address_point.lon,
  },
})
