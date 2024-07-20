import type { SearchAgenciesResult } from '@/apis/realEstateApis'
import { Colors } from '@/styles/colors'
import { fontStyles } from '@/styles/font'
import { Box, Flex, Text, type SpaceProps } from '@chakra-ui/react'
import { isEmpty } from 'lodash-es'
import Image from 'next/image'
import Link from 'next/link'
import { ImageEnabledStar, IconDivider } from '@/assets/icons'

interface Props extends SpaceProps {
  agency: SearchAgenciesResult
}

export default function AgencyCard({ agency, ...rest }: Props) {
  const { name, id, seo_key, representative_name, address_short, average_rating, images } = agency
  const image =
    images.find(($0) => !isEmpty($0.thumbnail_image))?.thumbnail_image ?? '/placeholder-image.png'

  console.log('>>', agency)
  return (
    <Box as={Link} href={`/real-estate/${id}/${seo_key}`} width="100%" {...rest}>
      <Flex
        height={73}
        alignItems="center"
        justifyContent="space-between"
        gap={3}
        bgColor={Colors.white}
      >
        <Box overflow={'hidden'}>
          <Text
            {...fontStyles.semibold_16}
            mt={1}
            mb={1}
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
            color={Colors.new_gray[9]}
          >
            {name}
          </Text>
          <Flex align={'center'} gap={1}>
            <Text {...fontStyles.medium_13} color={Colors.new_gray[6]}>{`${address_short}`}</Text>
            <IconDivider width={3} height={3} />
            <Text {...fontStyles.medium_13} color={Colors.new_gray[6]}>
              {`${representative_name}`}
            </Text>
          </Flex>

          <Flex alignItems="center" mt={2} direction={'row'}>
            <ImageEnabledStar width={16} height={16} />
            <Text
              {...fontStyles.TitleSm}
              lineHeight="1"
            >{`${(average_rating ?? 3).toFixed(1)}`}</Text>
            <Text
              {...fontStyles.medium_13}
              color={Colors.new_gray[6]}
              ml={2}
              lineHeight="1"
            >{`리뷰 2`}</Text>
          </Flex>
        </Box>
        <Image
          alt={name}
          src={image}
          width={96}
          height={73}
          loading="lazy"
          style={{ borderRadius: 6, flexShrink: 0, width: '96px', height: '73px' }}
        />
      </Flex>
    </Box>
  )
}
