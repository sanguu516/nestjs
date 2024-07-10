'use client'

import {
  QueryClient,
  QueryClientProvider,
  useInfiniteQuery,
  type DehydratedState,
} from '@tanstack/react-query'
import { isEmpty } from 'lodash-es'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'

import AgencyImageView from '@/components/agency-detail/AgencyImageView'
import ShareButton from '@/components/agency-detail/ShareButton'
import CustomButton from '@/components/CustomButton'
import NavHeader from '@/components/NavHeader'
import Rating from '@/components/Rating'
import Review from '@/components/Review'
import EmptyReview from '@/components/Review/Empty'

import { getAgencyReivewsData } from '@/apis/reviewApis'

import { QueryKeys } from '@/utils/queryUtil'
import { getRichSnippet } from '@/utils/snippets'
import { addHyphenToTel } from '@/utils/telUtil'

import type { RealEstateResponse } from '@/apis/realEstateApis'
import { Colors } from '@/styles/colors'
import { fontStyles } from '@/styles/font'
import { Box, Flex, Heading, Text } from '@chakra-ui/react'

type RealEstateDetailPageProps = {
  agency: RealEstateResponse
  dehydratedState: DehydratedState
}

const REVIEW_RECOMNEDATION_MSG = '어떠셨어요? 후기를 남겨보세요.'

const INFO_KEY: Partial<Record<keyof RealEstateResponse, string>> = {
  representative_name: '대표자',
  tel: '대표번호',
  mobile: '중개사번호',
  address_detail: '소재지',
  agency_number: '등록번호',
}

export default function RealEstateDetailPage({
  agency,
  dehydratedState,
}: RealEstateDetailPageProps) {
  const [queryClient] = useState(() => new QueryClient())
  const { name, average_rating, images, id, representative_name, agency_number } = agency
  const tel = addHyphenToTel(agency.tel) ?? ''
  const mobile = addHyphenToTel(agency.mobile) ?? ''

  const router = useRouter()

  const image = images.find(($0) => !isEmpty($0.original_image))?.original_image

  const { data: reviewsResult, fetchNextPage: fetchMoreReviews } = useInfiniteQuery({
    queryKey: QueryKeys.reviewsAboutAgency(id),
    queryFn: ({ pageParam }) => getAgencyReivewsData({ agency_id: id, pageParams: pageParam }),
    initialPageParam: { page: 1, page_size: 10 },
    getNextPageParam: (lastPage) => ({ page: lastPage.page + 1, page_size: 10 }),
  })

  const reviewsData = useMemo(
    () => reviewsResult?.pages.flatMap((p) => p.results) ?? [],
    [reviewsResult]
  )

  const navigateToReviewPage = () => {
    void router.push(`/reviews/new/${id}`)
  }

  const shareTextList: Record<string, string> = {
    대표자: representative_name,
    중개등록번호: agency_number,
    전화번호: tel || mobile,
  }

  const shareText = Object.keys(shareTextList).reduce((acc, key) => {
    if (shareTextList[key]) {
      return acc + `${acc !== '' ? ', ' : ''}${key}: ${shareTextList[key]}`
    }
    return acc
  }, '')

  const shareData = {
    title: `${name} | 별별부동산`,
    text: `${agency.address_short} ${agency.name}, ${shareText} 등의 정보를 확인해보세요`,
    image,
  }

  const richSnippet = getRichSnippet(agency, reviewsData)
  const needMoreView = reviewsData.length > 5

  return (
    <QueryClientProvider client={queryClient}>
      {/* <Hydrate state={dehydratedState}> */}
      <head>
        <title>{shareData.title}</title>
        <meta name="title" content={shareData.title} key="title" />
        <meta name="description" content={shareData.text} key="description" />
        <meta property="og:title" content={shareData.title} key="og_title" />
        <meta property="og:description" content={shareData.text} key="og_description" />
        {image && <meta property="og:image" content={shareData.image} key="og_image" />}
        <meta property="og:image:alt" content="agent_image" key="og_image_alt" />
        <script
          type="application/ld+json"
          defer
          dangerouslySetInnerHTML={{ __html: JSON.stringify(richSnippet) }}
        />
      </head>
      <NavHeader title={name} rightMenu={<ShareButton shareData={shareData} />} />
      <Box bg={Colors.gray[100]}>
        <Box as="section" className="info" bg={Colors.white}>
          <AgencyImageView agency={agency} />
          <Box as="address" px={4}>
            <Box mt={6}>
              <Flex align={'center'}>
                <Rating size="1.25rem" average_rating={average_rating} />
              </Flex>
              <Heading color={Colors.gray[800]} sx={{ ...fontStyles.TitleLg }}>
                {name}
              </Heading>
            </Box>
            <Box pt={4} pb={6}>
              {Object.keys(INFO_KEY).map((e) => {
                const type = INFO_KEY[e as keyof typeof INFO_KEY]
                let value = agency[e as keyof RealEstateResponse]
                if (e === 'tel') {
                  value = tel
                }
                if (e === 'mobile') {
                  value = mobile
                }
                return (
                  <Flex key={e} justify={'space-between'} sx={{ ...fontStyles.BodyMd }}>
                    <Text color={Colors.gray[400]} minW={200}>
                      {type}
                    </Text>
                    <Text
                      color={Colors.gray[600]}
                      textAlign="end"
                      whiteSpace="break-spaces"
                      wordBreak="keep-all"
                    >
                      {String(value)}
                    </Text>
                  </Flex>
                )
              })}
            </Box>
          </Box>
        </Box>
        <Flex
          className="review-recommendation"
          direction="column"
          align="center"
          cursor="pointer"
          my={2}
          px={6}
          py={4}
          bg={Colors.indigo[100]}
          onClick={navigateToReviewPage}
        >
          <Rating size="1.25rem" average_rating={0} showRating={false} mb={2} />
          <Text color={Colors.gray[800]} sx={{ ...fontStyles.TitleMd }}>
            {name}
          </Text>
          <Text color={Colors.gray[800]} sx={{ ...fontStyles.BodyLg }}>
            {REVIEW_RECOMNEDATION_MSG}
          </Text>
        </Flex>
        <Flex as="section" direction="column" className="reviews" bg={Colors.white} px={4} py={6}>
          <Heading as="h4" color={Colors.gray[800]} sx={{ ...fontStyles.TitleMd }}>
            직접 방문 후기
            <Text as="span" color={Colors.gray[400]} sx={{ ...fontStyles.TitleSm }} ml={2}>
              {reviewsResult?.pages[0]?.total_count}
            </Text>
          </Heading>
          <Box py={6}>
            {reviewsData.length ? (
              reviewsData.map(({ id, user, rating, content, user_keywords }) => {
                return (
                  <Review
                    key={id}
                    user={user}
                    rating={rating}
                    content={content}
                    user_keywords={user_keywords}
                  />
                )
              })
            ) : (
              <EmptyReview />
            )}
          </Box>
          {needMoreView && (
            <CustomButton
              variant="text"
              size="md"
              width="100%"
              borderRadius="none"
              onClick={() => fetchMoreReviews()}
            >
              더보기
            </CustomButton>
          )}
        </Flex>
        <CustomButton
          variant="filled"
          size="lg"
          width="100%"
          mt={10}
          borderRadius="none"
          onClick={navigateToReviewPage}
        >
          리뷰쓰기
        </CustomButton>
      </Box>
      {/* </Hydrate> */}
    </QueryClientProvider>
  )
}
