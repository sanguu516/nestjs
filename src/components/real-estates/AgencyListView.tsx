import type { SearchAgenciesResult } from '@/apis/realEstateApis'
import { Flex, VStack, Text } from '@chakra-ui/react'
import { useMemo, useState } from 'react'
import InfiniteScroll from '../InfiniteScroll'
import AgencyCard from './AgencyCard'
import { IconNoSearch } from '@/assets/icons'
import { fontStyles } from '@/styles/font'
import { Colors } from '@/styles/colors'

interface Props {
  agencies: SearchAgenciesResult[]
}

function AgencyListView({ agencies }: Props) {
  const [page, setPage] = useState(1)

  const displayingAgencies = useMemo(() => agencies.slice(0, page * 10), [agencies, page])

  return (
    <>
      {displayingAgencies.length === 0 ? (
        <Flex
          justifyContent="center"
          alignItems="center"
          height="100%"
          width="100%"
          flexDirection={'column'}
          gap={2}
          overflow={'hidden'}
        >
          <IconNoSearch width={80} height={80} />
          <Text {...fontStyles.semibold_20} color={Colors.new_gray[6]} mt={3}>
            중개사무소가 없어요
          </Text>
          <Text {...fontStyles.regular_16} color={Colors.new_gray[6]}>
            지도에서 다른 지역을 선택해보세요
          </Text>
        </Flex>
      ) : (
        <InfiniteScroll
          onLoadMore={() => {
            setPage((prev) => prev + 1)
          }}
        >
          <VStack width="100%" gap={8} mt={4} px={4}>
            {displayingAgencies.map((agency) => (
              <AgencyCard key={agency.id} agency={agency} />
            ))}
          </VStack>
        </InfiniteScroll>
      )}
    </>
  )
}

export default AgencyListView
