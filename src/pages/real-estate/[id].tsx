import {
  getRealEstateData,
  searchAgenciesByName,
  type RealEstateResponse,
} from '@/apis/realEstateApis'
import { getAgencyReivewsData } from '@/apis/reviewApis'
import CustomButton from '@/components/CustomButton'
import NavHeader from '@/components/NavHeader'
import Rating from '@/components/Rating'
import Review from '@/components/Review'
import { blurDataURL } from '@/constants'
import { Colors } from '@/styles/colors'
import { fontStyles } from '@/styles/font'
import { getDummyAgencyImage } from '@/utils/imageUtil'
import { QueryKeys } from '@/utils/queryUtil'
import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { isEmpty, range } from 'lodash-es'
import {
  GetStaticProps,
  InferGetStaticPropsType,
  type GetServerSideProps,
  type InferGetServerSidePropsType,
} from 'next'
import Image from 'next/image'
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

export async function getStaticPaths() {
  const firstResult = await searchAgenciesByName({
    name: '',
  })

  const { total_count } = firstResult
  const fetchCount = Math.ceil(total_count / 500)
  const promises = range(fetchCount).map((i) =>
    searchAgenciesByName({ name: '', pageParams: { page: i + 1, page_size: 500 } })
  )

  const responses = await Promise.all(promises)
  const paths = responses
    .flatMap((r) => r.results)
    .filter((agency) => agency.id)
    .map((agency) => ({ params: { id: `${agency.id}` } }))

  console.log('Generating paths: ', paths.length)
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps<{ agency: RealEstateResponse }> = async (context) => {
  const id = Number(context?.params?.id)
  const data = await getRealEstateData(id)

  return {
    props: {
      agency: data,
      fallback: false,
    },
  }
}

export default function Detail({ agency }: InferGetStaticPropsType<typeof getStaticProps>) {
  const { name, average_rating, images, id } = agency
  const router = useRouter()

  const image =
    images.find(($0) => !isEmpty($0.original_image))?.original_image ?? getDummyAgencyImage(id)

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
      <NavHeader title={agency.name} />
      <Box bg={Colors.gray[100]}>
        <Box as="section" className="info" bg={Colors.white}>
          <Image
            style={{ minWidth: '100%' }}
            src={image}
            width={360}
            height={220}
            loading="lazy"
            placeholder="blur"
            blurDataURL={blurDataURL}
            alt="대표이미지"
          />
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