import { useCallback, useContext, useEffect, useState } from 'react'
import { debounce } from 'lodash-es'
import Chip from '@/components/Chip'
import CustomButton from '@/components/CustomButton'
import NavHeader from '@/components/NavHeader'
import Rating from '@/components/Rating'
import withAuth from '@/components/withAuth'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  getKeywordData,
  postReview,
  type PostReviewResponse,
  type PostReviewParmas,
} from '@/apis/reviewApis'
import { DEBOUNCE_DELAY } from '@/utils/debounce'
import { QueryKeys } from '@/utils/queryUtil'
import { KEYWORD_ICONS } from '@/constants'
import { Box, Flex, Heading, Textarea, Text } from '@chakra-ui/react'
import { Colors } from '@/styles/colors'
import { fontStyles } from '@/styles/font'
import { useRouter } from 'next/router'
import { UserContext } from '@/pages/_app'
import { getRealEstateData } from '@/apis/realEstateApis'

const MAX_TEXT_NUM = 500
const feedbackQuestion = (userName: string) => `${userName} 님,\n 공인중개사는 어떠셨어요?`
const REVIEW_PLACEHOLDER =
  '작성된 리뷰는 다른 사용자와, 공인중개사님이 볼 수 있어요. 배려를 위해 공인중개사님에 대한 욕설, 비방, 명예훼손성 표현은 사용을 지양해주세요.'
const KEYWORD_SELECT_MESSAGE = '공인중개사님과 어울리는\n키워드를 골라주시겠어요?'
const initReviewForm = {
  agency: 0,
  rating: 0,
  content: '',
  user_keywords: [],
}

function New() {
  const queryClient = useQueryClient()
  const router = useRouter()

  const { id } = router.query || {}
  const agencyId = Number(id)

  const { data: agencyData } = useQuery({
    queryKey: QueryKeys.agenciesById(agencyId),
    queryFn: () => getRealEstateData(agencyId),
    enabled: !isNaN(agencyId),
  })

  const { data: keywordData } = useQuery({
    queryKey: QueryKeys.keywordAboutReview,
    queryFn: getKeywordData,
  })

  const { mutate: postMutate } = useMutation<PostReviewResponse, Error, PostReviewParmas>({
    mutationFn: postReview,
  })

  const [reviewForm, setReviewForm] = useState<PostReviewParmas>(initReviewForm)
  const { user } = useContext(UserContext)

  useEffect(() => {
    if (agencyId) {
      setReviewForm((prev) => ({ ...prev, agency: Number(agencyId) }))
    }
  }, [agencyId])

  useEffect(() => {
    if (keywordData) {
      const initKeywords = Array.from({ length: keywordData.length }).map((_, i) => ({
        keyword: i + 1,
        is_selected: false,
      }))

      setReviewForm((prev) => ({ ...prev, user_keywords: initKeywords }))
    }
  }, [keywordData])

  const handleRating = (rating: number) => {
    setReviewForm((prev) => ({ ...prev, rating }))
  }

  const handleTextarea: React.ChangeEventHandler<HTMLTextAreaElement> = useCallback((e) => {
    const target = e.target as HTMLTextAreaElement
    setReviewForm((prev) => ({ ...prev, content: target.value }))
  }, [])

  const handleKeyword = (id: number) => {
    setReviewForm((prev) => {
      const newKeywords = prev.user_keywords.map((e) => {
        if (e.keyword === id) {
          return { ...e, is_selected: !e.is_selected }
        }
        return e
      })
      console.log(newKeywords)
      return { ...prev, user_keywords: newKeywords }
    })
  }

  useEffect(() => {
    // console.log(reviewForm)
  }, [reviewForm])

  const handlePostButton: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (!agencyId) return
    postMutate(reviewForm, {
      onSuccess: () => {
        void queryClient.invalidateQueries({
          queryKey: QueryKeys.reviewsAboutAgency(Number(agencyId)),
        })
        void router.replace(`/real-estate/${Number(agencyId)}`)
      },
    })
  }

  return (
    <Box mx={4}>
      <NavHeader title={agencyData?.name ?? ''} />
      <Flex as="section" direction="column" align="center" gap="1.5rem" py={8}>
        <Flex direction="column" gap="0.5rem">
          <Heading textAlign="center" whiteSpace="pre-wrap">
            {feedbackQuestion(user?.username ?? '')}
          </Heading>
          <Rating
            size="2.75rem"
            average_rating={0}
            isEvaluatable
            showRating
            getRating={handleRating}
          />
        </Flex>
        <Flex w="100%" direction="column" align="flex-end">
          <Textarea
            w="100%"
            h="12.5rem"
            resize="none"
            maxLength={MAX_TEXT_NUM}
            placeholder={REVIEW_PLACEHOLDER}
            onChange={debounce(handleTextarea, DEBOUNCE_DELAY)}
          />
          <Text color={Colors.gray[400]} sx={{ ...fontStyles.BodySm }}>
            {`${reviewForm.content.length}/${MAX_TEXT_NUM}`}
          </Text>
        </Flex>
      </Flex>
      <Flex direction="column" gap="1rem" py={6}>
        <Heading whiteSpace="pre-wrap" color={Colors.gray[600]} sx={{ ...fontStyles.TitleMd }}>
          {KEYWORD_SELECT_MESSAGE}
        </Heading>
        <Flex flexWrap="wrap" gap="0.5rem">
          {keywordData?.map((e) => {
            return (
              <Chip
                key={e.id}
                data-id={e.id}
                size="lg"
                w="fit-content"
                variant="outlined"
                unicode={KEYWORD_ICONS[e.id]}
                cursor="pointer"
                handleClick={handleKeyword}
              >
                {e.name}
              </Chip>
            )
          })}
        </Flex>
      </Flex>
      <CustomButton w="100%" variant="filled" size="lg" my={8} onClick={handlePostButton}>
        리뷰 등록
      </CustomButton>
    </Box>
  )
}

export default withAuth(New)
