import type { GetReviewResponse } from '@/apis/reviewApis'
import { IconArrowRight3 } from '@/assets/icons'
import { Colors } from '@/styles/colors'
import { fontStyles } from '@/styles/font'
import { Box, Center, Flex, Text, VStack } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { Star } from '../Rating'
import Review from '../Review'

interface Props {
  review: GetReviewResponse
}

function ReviewCard({ review }: Props) {
  const router = useRouter()
  const { rating, user, user_keywords, content, agency, id } = review
  return (
    <Box
      as="div"
      onClick={() => void router.push(`/real-estate/${agency.id}/${agency.seo_key}`)}
      key={id}
      width="100%"
    >
      <Review
        user={user}
        rating={rating}
        content={content}
        user_keywords={user_keywords}
        borderBottom="none"
        p={0}
      />
      <Flex
        width="100%"
        height="72px"
        bg={Colors.gray[100]}
        pl={2}
        py={4}
        borderRadius={8}
        gap={4}
        cursor="pointer"
      >
        <Flex gap={1}>
          <Star id={id} on size="24px" />
          <Text {...fontStyles.TitleMd}>{rating}</Text>
        </Flex>
        <VStack flexGrow={1} align="start" gap={0.5}>
          <Text {...fontStyles.TitleMd}>{agency.name}</Text>
          <Text {...fontStyles.LabelMd} color={Colors.gray[400]}>
            {agency.address_short}
          </Text>
        </VStack>
        <Center width={12}>
          <IconArrowRight3 width={24} height={24} color={Colors.gray[600]} />
        </Center>
      </Flex>
    </Box>
  )
}

export default ReviewCard
