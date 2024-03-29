import type { SearchAgenciesResult } from '@/apis/realEstateApis'
import { VStack } from '@chakra-ui/react'
import { useMemo, useState } from 'react'
import InfiniteScroll from '../InfiniteScroll'
import AgencyCard from './AgencyCard'

interface Props {
  agencies: SearchAgenciesResult[]
}

function AgencyListView({ agencies }: Props) {
  const [page, setPage] = useState(1)

  const displayingAgencies = useMemo(() => agencies.slice(0, page * 10), [agencies, page])

  return (
    <InfiniteScroll
      onLoadMore={() => {
        setPage((prev) => prev + 1)
      }}
    >
      <VStack width="100%" gap={8} mt={4}>
        {displayingAgencies.map((agency) => (
          <AgencyCard key={agency.id} agency={agency} />
        ))}
      </VStack>
    </InfiniteScroll>
  )
}

export default AgencyListView
