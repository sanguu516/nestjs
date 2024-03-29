import { DUMMY_KEYWORD, type PostReviewParmas } from '@/apis/reviewApis'
import Chip from '@/components/Chip'
import CustomButton from '@/components/CustomButton'
import NavHeader from '@/components/NavHeader'
import Rating from '@/components/Rating'
import { KEYWORD_ICONS } from '@/constants'
import { Colors } from '@/styles/colors'
import { fontStyles } from '@/styles/font'
import { DEBOUNCE_DELAY } from '@/utils/debounce'
import { Box, Flex, Heading, Textarea, Text } from '@chakra-ui/react'
import { debounce } from 'lodash-es'
import { useCallback, useState } from 'react'

const feedbackQuestion = (userName: string) => `${userName} 님,\n 공인중개사는 어떠셨어요?`
const REVIEW_PLACEHOLDER =
  '작성된 리뷰는 다른 사용자와, 공인중개사님이 볼 수 있어요. 배려를 위해 공인중개사님에 대한 욕설, 비방, 명예훼손성 표현은 사용을 지양해주세요.'
const KEYWORD_SELECT_MESSAGE = '공인중개사님과 어울리는\n키워드를 골라주시겠어요?'
const MAX_STR_NUM = 500
const initReviewForm = (agencyId: number, keywordLength: number) => ({
  agency: agencyId,
  rating: 0,
  content: '',
  user_keywords: Array.from({ length: keywordLength }).map((_, i) => ({
    keyword: i + 1,
    is_selected: false,
  })),
})

export default function New() {
  const agecyId = 0
  const keywordLength = 0
  const [reviewForm, setReviewForm] = useState<PostReviewParmas>(
    initReviewForm(agecyId, keywordLength)
  )

  const handleRating = (rating: number) => {
    setReviewForm((prev) => ({ ...prev, rating }))
  }

  const handleTextarea: React.ChangeEventHandler<HTMLTextAreaElement> = useCallback((e) => {
    setReviewForm((prev) => ({ ...prev, content: e.target.value }))
  }, [])

  const handleKeyword = (id: number) => {
    console.log(id)
    setReviewForm((prev) => {
      const newKeywords = prev.user_keywords.map((e) => {
        if (e.keyword === id) {
          return { ...e, is_selected: !e.is_selected }
        }
        return e
      })

      return { ...prev, user_keywords: newKeywords }
    })
  }

  const handlePostButton: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    //reviewForm 전송
    //reviewForm.agency(공인 중개사 id)
  }

  return (
    <Box mx={4}>
      <NavHeader title="하모니 공인중개사" />
      <Flex as="section" direction="column" align="center" gap="1.5rem" py={8}>
        <Flex direction="column" gap="0.5rem">
          <Heading textAlign="center" whiteSpace="pre-wrap">
            {feedbackQuestion('별스런동산26')}
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
            placeholder={REVIEW_PLACEHOLDER}
            onChange={debounce(handleTextarea, DEBOUNCE_DELAY)}
          />
          <Text color={Colors.gray[400]} sx={{ ...fontStyles.BodySm }}>
            {`${reviewForm.content.length}/${MAX_STR_NUM}`}
          </Text>
        </Flex>
      </Flex>
      <Flex direction="column" gap="1rem" py={6}>
        <Heading whiteSpace="pre-wrap" color={Colors.gray[600]} sx={{ ...fontStyles.TitleMd }}>
          {KEYWORD_SELECT_MESSAGE}
        </Heading>
        <Flex flexWrap="wrap" gap="0.5rem">
          {DUMMY_KEYWORD.map((e) => {
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
