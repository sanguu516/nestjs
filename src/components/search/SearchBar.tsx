import { searchAgenciesByName, searchLocation } from '@/apis/realEstateApis'
import { QueryKeys } from '@/utils/queryUtil'
import { Box, Divider, Input } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { useDeferredValue, useState } from 'react'

function SearchBar() {
  const [query, setQuery] = useState('')
  const differedQuery = useDeferredValue(query)

  const { data: locationData } = useQuery({
    queryKey: QueryKeys.searchLocation(differedQuery),
    queryFn: () => searchLocation({ query: differedQuery, pageParams: { page: 1, pageSize: 3 } }),
    enabled: differedQuery !== '',
  })

  const { data: agencyData } = useQuery({
    queryKey: QueryKeys.agenciesByQuery(differedQuery),
    queryFn: () =>
      searchAgenciesByName({ name: differedQuery, pageParams: { page: 1, pageSize: 3 } }),
    enabled: differedQuery !== '',
  })

  return (
    <Box position="relative" height="48px">
      <Input
        placeholder="검색어를 입력해주세요."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Box position="absolute" top="48px" left={0} right={0} bgColor="red">
        {locationData?.results.map((result) => <h3 key={result.id}>{result.name}</h3>)}
        <Divider h={3} />
        {agencyData?.results.map((result) => (
          <Box height={100} key={result.id}>
            {result.name}
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default SearchBar
