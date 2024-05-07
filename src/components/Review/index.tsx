import { type MouseEventHandler, useEffect, useRef, useState } from 'react'
import { type BoxProps, Box, Flex, Text } from '@chakra-ui/react'
import Chip from '@/components/Chip'
import CustomButton from '@/components/CustomButton'
import Rating from '@/components/Rating'
import { type GetReviewResponse } from '@/apis/reviewApis'
import { Colors } from '@/styles/colors'
import { fontStyles } from '@/styles/font'
import { ImageUser } from '@/assets/icons'
import { KEYWORD_ICONS } from '@/constants'

type ReviewProps = BoxProps &
  Pick<GetReviewResponse, 'user' | 'rating' | 'content' | 'user_keywords'>

const MAX_CONTENT_HEIGHT = '4.7rem'
const SHOW_KEYWORD_NUM = 2

export default function Review({ user, rating, content, user_keywords, ...boxProps }: ReviewProps) {
  const [needShowMore, setNeedShowMore] = useState<boolean>(false)
  const [isOpenContent, setIsOpenContent] = useState<boolean>(false)
  const [showMoreKeywords, setShowMoreKeywords] = useState<boolean>(false)
  const contentRef = useRef<HTMLParagraphElement>(null)

  const selectedKeywords = user_keywords.filter((e) => e.is_selected)

  const handleReviewButton: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation()
    setIsOpenContent((prev) => !prev)
  }

  const handleKeywordButton: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation()
    setShowMoreKeywords((prev) => !prev)
  }

  useEffect(() => {
    if (contentRef.current) {
      const isTooLong = contentRef.current.scrollHeight > contentRef.current.clientHeight
      setNeedShowMore(isTooLong)
    }
  }, [])

  const maxTextHeight = isOpenContent ? 'fit-content' : MAX_CONTENT_HEIGHT

  return (
    <Box
      as="article"
      pt={4}
      px={4}
      pb={6}
      bg={Colors.white}
      borderBottom="1px solid"
      borderColor={Colors.gray[300]}
      {...boxProps}
    >
      <Flex className="user-rating">
        <ImageUser width="1.5rem" height="1.5rem" />
        <Box ml={2} mb={2}>
          <Flex>
            <Rating size="0.875rem" average_rating={rating} />
          </Flex>
          <Text color={Colors.gray[600]} sx={{ ...fontStyles.LabelSm }}>
            {user.username}
          </Text>
        </Box>
      </Flex>
      <Box className="review" my={2} ml={8}>
        <Text
          ref={contentRef}
          className="content"
          maxH={maxTextHeight}
          color={Colors.gray[800]}
          sx={{ ...fontStyles.BodyMd }}
          overflow="hidden"
        >
          {content}
        </Text>
        {needShowMore && (
          <CustomButton
            variant="text"
            w="2.625rem"
            size="sm"
            sx={{ ...fontStyles.LabelSm }}
            onClick={handleReviewButton}
          >
            {isOpenContent ? '접기' : '더보기'}
          </CustomButton>
        )}

        {selectedKeywords.length && (
          <Flex mt={2} mb={6} flexWrap="wrap" gap={1}>
            {selectedKeywords.map((e, i) => {
              return (
                (i + 1 <= SHOW_KEYWORD_NUM || (i + 1 > SHOW_KEYWORD_NUM && showMoreKeywords)) && (
                  <Chip
                    key={e?.keyword.id}
                    size="sm"
                    w="fit-content"
                    variant="outlined"
                    unicode={KEYWORD_ICONS[e?.keyword.id]}
                  >
                    {e?.keyword.name}
                  </Chip>
                )
              )
            })}
            {!showMoreKeywords && selectedKeywords.length > SHOW_KEYWORD_NUM && (
              <CustomButton
                variant="outlined"
                size="sm"
                w="fit-content"
                h="1.75rem"
                p={2}
                borderColor={Colors.gray[200]}
                color={Colors.gray[600]}
                sx={{ ...fontStyles.Caption }}
                onClick={handleKeywordButton}
              >
                {`+${selectedKeywords.length - SHOW_KEYWORD_NUM}`}
              </CustomButton>
            )}
          </Flex>
        )}
      </Box>
    </Box>
  )
}
