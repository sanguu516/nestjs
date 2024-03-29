import type { SearchAgenciesResult } from '@/apis/realEstateApis'
import { VStack } from '@chakra-ui/react'
import AgencyCard from './AgencyCard'

interface Props {
  agencies: SearchAgenciesResult[]
}

function AgencyListView({ agencies }: Props) {
  // Consider infinite scroll here
  return (
    <VStack width="100%" gap={8} mt={4}>
      {agencies.map((agency) => (
        <AgencyCard key={agency.id} agency={agency} />
      ))}
    </VStack>
  )
}

export default AgencyListView
