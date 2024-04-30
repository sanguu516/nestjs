import { getRealEstateData, type RealEstateResponse } from '@/apis/realEstateApis'
import { getAgencyReivewsData } from '@/apis/reviewApis'
import AgencyImageView from '@/components/agency-detail/AgencyImageView'
import KakaoStaticMap from '@/components/agency-detail/KakaoStaticMap'
import CustomButton from '@/components/CustomButton'
import NavHeader from '@/components/NavHeader'
import Rating from '@/components/Rating'
import ShareButton from '@/components/agency-detail/ShareButton'
import Review from '@/components/Review'
import { Colors } from '@/styles/colors'
import { fontStyles } from '@/styles/font'
import { getDummyAgencyImage } from '@/utils/imageUtil'
import { convertLatLngToCoordinates } from '@/utils/mapUtil'
import { QueryKeys } from '@/utils/queryUtil'
import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { isEmpty } from 'lodash-es'
import { type GetServerSideProps, type InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useMemo } from 'react'

type InfoKey = Partial<Record<keyof RealEstateResponse, string>>

const REVIEW_RECOMNEDATION_MSG = '어떠셨어요? 후기를 남겨보세요.'

const INFO_KEY: InfoKey = {
  representative_name: '대표자',
  tel: '대표번호',
  mobile: '중개사번호',
  address_detail: '소재지',
  agency_number: '등록번호',
}

export const getServerSideProps: GetServerSideProps<{ agency: RealEstateResponse }> = async (
  context
) => {
  const id = Number(context?.params?.id)
  const data = await getRealEstateData(id)
  return {
    props: {
      agency: data,
    },
  }
}

export default function Detail({ agency }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { name, average_rating, images, id } = agency
  const router = useRouter()

  const image =
    images.find(($0) => !isEmpty($0.original_image))?.original_image ?? getDummyAgencyImage(id)

  const shareData = {
    title: name,
    text: `별별부동산에서 ${name} 정보를 확인해 보세요.`,
    image:
      image.startsWith('/images/dummy') && typeof window !== 'undefined'
        ? window.location.origin + image
        : image,
  }

  const { data: reviewsResult, fetchNextPage: fetchMoreReviews } = useInfiniteQuery({
    queryKey: QueryKeys.reviewsAboutAgency(agency.id),
    queryFn: ({ pageParam }) =>
      getAgencyReivewsData({ agency_id: agency.id, pageParams: pageParam }),
    initialPageParam: { page: 1, page_size: 10 },
    getNextPageParam: (lastPage) => ({ page: lastPage.page + 1, page_size: 10 }),
  })

  const reviewsData = useMemo(
    () => reviewsResult?.pages.flatMap((p) => p.results) ?? [],
    [reviewsResult]
  )

  const navigateToReviewPage = () => {
    void router.push(`/reviews/new/${agency.id}`)
  }

  return (
    <>
      <NavHeader title={agency.name} rightMenu={<ShareButton shareData={shareData} />} />
      <Head>
        <title>{shareData.title}</title>
        <meta name="description" content={shareData.text} />
        <meta property="og:title" content={shareData.title} />
        <meta property="og:description" content={shareData.text} />
        <meta property="og:image" content={shareData.image} />
      </Head>
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
                const value = agency[e as keyof RealEstateResponse]
                return (
                  <Flex key={e} justify={'space-between'} sx={{ ...fontStyles.BodyMd }}>
                    <Text color={Colors.gray[400]} minW={200}>
                      {type}
                    </Text>
                    <Text color={Colors.gray[600]} textAlign="end" whiteSpace="break-spaces">
                      {value?.toString()}
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
        <Flex as="section" direction="column" className="reviews" bg={Colors.white}>
          <Heading as="h4" color={Colors.gray[800]} sx={{ ...fontStyles.TitleMd }} my={6} px={4}>
            직접 방문 후기
            <Text as="span" color={Colors.gray[400]} sx={{ ...fontStyles.TitleSm }} ml={2}>
              {reviewsResult?.pages[0]?.total_count}
            </Text>
          </Heading>
          {reviewsData.map(({ id, user, rating, content, user_keywords }) => {
            return (
              <Review
                key={id}
                user={user}
                rating={rating}
                content={content}
                user_keywords={user_keywords}
              />
            )
          })}
          <CustomButton
            variant="text"
            size="md"
            width="100%"
            my={3}
            px={4}
            py={2}
            borderRadius="none"
            onClick={() => fetchMoreReviews}
          >
            더보기
          </CustomButton>
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
    </>
  )
}
