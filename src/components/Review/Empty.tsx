import { IconDangerCircle } from '@/assets/icons'
import { Colors } from '@/styles/colors'
import { fontStyles } from '@/styles/font'
import { Flex, Text } from '@chakra-ui/react'

export default function EmptyReview() {
  const NO_REVIEW_COMMENT = `아직 작성된 후기가 없어요.\n첫 후기의 주인공이 되어주세요! `

  return (
    <Flex flexDirection="column" alignItems="center" gap={1}>
      <IconDangerCircle width={40} height={40} fill={Colors.gray[400]} color={Colors.gray[400]} />
      <Text
        color={Colors.gray[400]}
        sx={{ ...fontStyles.BodyMd }}
        whiteSpace="pre-wrap"
        textAlign="center"
      >
        {NO_REVIEW_COMMENT}
      </Text>
    </Flex>
  )
}
