import type { SearchAgenciesResult } from '@/apis/realEstateApis'
import { Colors } from '@/styles/colors'
import { fontStyles } from '@/styles/font'
import { Box, Flex, Text, type SpaceProps } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'

interface Props extends SpaceProps {
  agency: SearchAgenciesResult
}

export default function AgencyCard({ agency, ...rest }: Props) {
  const { name, id, representative_name, address_short, average_rating } = agency

  return (
    <Box as={Link} href={`/real-estate/${id}`} width="100%" {...rest}>
      <Flex height={90} alignItems="center" gap={3} bgColor={Colors.white}>
        <Image
          alt={name}
          src="https://dummyimage.com/120x90/000/fff"
          width={120}
          height={90}
          style={{ borderRadius: 8, flexShrink: 0 }}
        />
        <Box overflow="hidden">
          <Flex align="center" gap={1}>
            <Image alt="rating" width={20} height={20} src="/star.png" />
            {/* TODO: Fix the rating */}
            <Text {...fontStyles.TitleMd}>{`${(average_rating ?? 3).toFixed(1)}`}</Text>
          </Flex>
          <Text
            {...fontStyles.TitleSm}
            mt={1}
            mb={2}
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {name}
          </Text>
          <Text
            {...fontStyles.Caption}
            color={Colors.gray[400]}
          >{`대표자  ${representative_name}`}</Text>
          <Text {...fontStyles.Caption} color={Colors.gray[400]}>{`소재지  ${address_short}`}</Text>
        </Box>
      </Flex>
    </Box>
  )
}
