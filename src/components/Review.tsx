import { useState } from 'react'
import CustomButton from './CustomButton'
import Chip from './Chip'
import Rating from './Rating'
import { Box, Flex, Text } from '@chakra-ui/react'
import { Colors } from '@/styles/colors'
import { fontStyles } from '@/styles/font'
import { ImageUser } from '@/assets/icons'
import { type GetReviewResponse } from '@/apis/reviewApis'
import { KEYWORD_ICONS } from '@/constants'

type ReviewProps = Pick<GetReviewResponse, 'user' | 'rating' | 'content' | 'user_keywords'>

export default function Review({ user, rating, content, user_keywords }: ReviewProps) {
  const [showMoreReviews, setShowMoreReviews] = useState<boolean>(false)
  const [showMoreKeywords, setShowMoreKeywords] = useState<boolean>(false)

  const selectedKeywords = user_keywords.filter((e) => e.is_selected)
  const firstKeyword = selectedKeywords[0]

  const handleReviewButton = () => {
    setShowMoreReviews((prev) => !prev)
  }

  const handleKeywordButton = () => {
    setShowMoreKeywords((prev) => !prev)
  }

  return (
    <Box
      as="article"
      pt={4}
      px={4}
      pb={6}
      bg={Colors.white}
      borderBottom="1px solid"
      borderColor={Colors.gray[300]}
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
          className="content"
          maxH={showMoreReviews ? 'fit-content' : '75px'}
          color={Colors.gray[800]}
          sx={{ ...fontStyles.BodyMd }}
          overflow="hidden"
        >
          {content}
        </Text>
        <CustomButton
          variant="text"
          w="2.625rem"
          size="sm"
          sx={{ ...fontStyles.LabelSm }}
          onClick={handleReviewButton}
        >
          {showMoreReviews ? '접기' : '더보기'}
        </CustomButton>
        {firstKeyword && (
          <Flex mt={2} mb={6} flexWrap="wrap" gap={1}>
            <Chip
              size="sm"
              w="fit-content"
              variant="outlined"
              unicode={KEYWORD_ICONS[firstKeyword.keyword.id]}
            >
              {firstKeyword.keyword.name}
            </Chip>
            {showMoreKeywords
              ? selectedKeywords.map((e, i) => {
                  return (
                    i > 0 &&
                    e.is_selected && (
                      <Chip
                        key={e.keyword.id}
                        size="sm"
                        w="fit-content"
                        variant="outlined"
                        unicode={KEYWORD_ICONS[e.keyword.id]}
                      >
                        {e.keyword.name}
                      </Chip>
                    )
                  )
                })
              : selectedKeywords.length > 1 && (
                  <CustomButton
                    variant="outlined"
                    size="sm"
                    w="fit-content"
                    h="1.75rem"
                    p={2}
                    color={Colors.gray[600]}
                    sx={{ ...fontStyles.Caption }}
                    onClick={handleKeywordButton}
                  >
                    {`+${selectedKeywords.length}`}
                  </CustomButton>
                )}
          </Flex>
        )}
      </Box>
    </Box>
  )
}
