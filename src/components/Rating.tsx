import { ImageDisabledStar, ImageEnabledStar } from '@/assets/icons'
import { Colors } from '@/styles/colors'
import { fontStyles } from '@/styles/font'
import { type FlexProps, Box, Flex, Text } from '@chakra-ui/react'
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

function Star({ id, on, size, isEvaluatable = false }: StarProps) {
  const cursor = isEvaluatable ? 'pointer' : 'default'

  return on ? (
    <ImageEnabledStar
      data-id={id}
      // opacity="0 important!"
      // style={{ zIndex: -1, position: 'relative' }}
      width={size}
      height={size}
      cursor={cursor}
    />
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
          return <Star key={i} id={i + 1} on={i < value} size={size} isEvaluatable />
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

/** star angular gradiant */

// const STAR_CLIP_PATH =
//   'M17.3604 5.85148C18.2461 4.55922 18.6889 3.91309 19.2433 3.68647C19.7283 3.48826 20.2717 3.48826 20.7567 3.68647C21.3111 3.91309 21.7539 4.55922 22.6396 5.85148L25.7048 10.324C25.9431 10.6718 26.0623 10.8457 26.2107 10.9881C26.3424 11.1145 26.4907 11.2223 26.6516 11.3084C26.8329 11.4055 27.0352 11.4652 27.4396 11.5844L32.6404 13.1175C34.1431 13.5604 34.8944 13.7819 35.2813 14.2392C35.6196 14.6392 35.7876 15.156 35.7489 15.6785C35.7047 16.2758 35.2271 16.8966 34.2717 18.1383L30.9653 22.4355C30.7082 22.7697 30.5797 22.9368 30.49 23.1219C30.4105 23.2862 30.3539 23.4606 30.3216 23.6402C30.2853 23.8427 30.2911 24.0534 30.3027 24.4749L30.4518 29.8949C30.4948 31.4609 30.5164 32.2439 30.201 32.7532C29.9252 33.1986 29.4856 33.518 28.9767 33.6427C28.3949 33.7852 27.6569 33.5228 26.1808 32.9979L21.0722 31.1813C20.6749 31.04 20.4763 30.9694 20.2725 30.9413C20.0917 30.9165 19.9083 30.9165 19.7275 30.9413C19.5237 30.9694 19.3251 31.04 18.9278 31.1813L13.8192 32.9979C12.3431 33.5228 11.6051 33.7852 11.0233 33.6427C10.5144 33.518 10.0748 33.1986 9.799 32.7532C9.48363 32.2439 9.50516 31.4609 9.54824 29.8949L9.6973 24.4749C9.7089 24.0534 9.71469 23.8427 9.67837 23.6402C9.64615 23.4606 9.58949 23.2862 9.50997 23.1219C9.42034 22.9368 9.29179 22.7697 9.03468 22.4355L5.72828 18.1383C4.77294 16.8966 4.29528 16.2758 4.25109 15.6785C4.21245 15.156 4.38036 14.6392 4.71873 14.2392C5.10559 13.7819 5.85694 13.5604 7.35963 13.1175L12.5604 11.5844C12.9648 11.4652 13.1671 11.4055 13.3484 11.3084C13.5093 11.2223 13.6576 11.1145 13.7893 10.9881C13.9377 10.8457 14.0569 10.6718 14.2952 10.324L17.3604 5.85148Z'

// function Star({ id, on, size }: StarProps) {
//   return (
//     <Box width={`${size}px`} height={`${size}px`}>
//       <Box
//         data-id={id}
//         width="40px"
//         height="40px"
//         style={{ clipPath: `path('${STAR_CLIP_PATH}')` }}
//         bgGradient={
//           on ? 'conic-gradient(from -71.03deg at 50% 54.61%, #D1FADF 0deg, #32D583 360deg)' : ''
//         }
//       >
//         {on ? (
//           <ImageEnabledStar
//             data-id={id}
//             display="none"
//             style={{ zIndex: -1, position: 'relative' }}
//             height="80px"
//           />
//         ) : (
//           <ImageDisabledStar data-id={id} width="40px" height="40px" />
//         )}
//       </Box>
//     </Box>
//   )
// }
