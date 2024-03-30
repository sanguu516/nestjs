import { ImageDisabledStar, ImageEnabledStar } from '@/assets/icons'
import { Colors } from '@/styles/colors'
import { fontStyles } from '@/styles/font'
import { type FlexProps, Flex, Text } from '@chakra-ui/react'
import { useState } from 'react'

const RATING_NUM = 5

interface RatingProps extends FlexProps {
  average_rating: number
  size?: string
  isEvaluatable?: boolean
  showRating?: boolean
  getRating?: (rating: number) => void
}

interface StarProps {
  id: number
  on: boolean
  size: string
  isEvaluatable?: boolean
}

export function Star({ id, on, size, isEvaluatable = false }: StarProps) {
  const cursor = isEvaluatable ? 'pointer' : 'default'

  return on ? (
    <ImageEnabledStar data-id={id} width={size} height={size} cursor={cursor} />
  ) : (
    <ImageDisabledStar data-id={id} width={size} height={size} cursor={cursor} />
  )
}

export default function Rating({
  average_rating,
  size = '2.5rem',
  isEvaluatable = false,
  showRating = true,
  getRating,
  ...rest
}: RatingProps) {
  const [value, setValue] = useState<number>(average_rating)

  const handleStarClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const target = e.target as HTMLDivElement
    const newValue = target.closest('svg')?.dataset.id

    if (newValue) {
      setValue(+newValue)
      getRating?.(+newValue)
    }
  }

  return (
    <Flex direction={isEvaluatable ? 'column' : 'row'} align="center">
      <Flex {...rest} onClick={isEvaluatable ? handleStarClick : undefined}>
        {Array.from({ length: RATING_NUM }).map((_, i) => {
          return (
            <Star key={i} id={i + 1} on={i < value} size={size} isEvaluatable={isEvaluatable} />
          )
        })}
      </Flex>
      {showRating &&
        (isEvaluatable ? (
          <Flex align="center">
            <Text as="span" color={Colors.gray[800]} sx={{ ...fontStyles.LabelSm }}>
              {value}
            </Text>
            <Text
              as="span"
              color={Colors.gray[400]}
              ml={1}
              sx={{ ...fontStyles.BodySm }}
            >{`/ ${RATING_NUM}`}</Text>
          </Flex>
        ) : (
          <Text color={Colors.gray[800]} ml={1} sx={{ ...fontStyles.TitleMd }}>
            {value}
          </Text>
        ))}
    </Flex>
  )
}
