import { SearchAgenciesResult } from '@/apis/realEstateApis'
import { Colors } from '@/styles/colors'
import { fontStyles } from '@/styles/font'
import { Box, Flex, SpaceProps, Text } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

interface Props extends SpaceProps {
  agency: SearchAgenciesResult
}

export default function AgencyCard({ agency, ...rest }: Props) {
  const router = useRouter()
  const { name, id, representative_name, address_short, average_rating } = agency

  return (
    <Box
      as={Link}
      href="/real-estate/[id]"
      onClick={() => router.push(`/real-estate/${id}`)}
      width="100%"
      {...rest}
    >
      <Flex height={90} alignItems="center" gap={3}>
        <Image
          alt={name}
          src="https://dummyimage.com/120x90/000/fff"
          width={120}
          height={90}
          style={{ borderRadius: 8, flexShrink: 0 }}
        />
        <Box overflow="hidden">
          {/* TODO 별점 추가 */}
          <Text
            {...fontStyles.TitleSm}
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
