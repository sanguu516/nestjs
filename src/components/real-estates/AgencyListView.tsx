import type { SearchAgenciesResult } from '@/apis/realEstateApis'
import AgencyCard from './AgencyCard'

interface Props {
  agencies: SearchAgenciesResult[]
}

function AgencyListView({ agencies }: Props) {
  // Consider infinite scroll here
  return (
    <div>
      {agencies.map((agency) => (
        <AgencyCard key={agency.id} agency={agency} mx={3} />
      ))}
    </div>
  )
}

export default AgencyListView
