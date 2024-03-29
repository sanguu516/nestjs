import { searchAgenciesByName, searchLocation } from '@/apis/realEstateApis'
import { Colors } from '@/styles/colors'
import { QueryKeys } from '@/utils/queryUtil'
import { Box, Divider, Input } from '@chakra-ui/react'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { useDeferredValue, useMemo, useState } from 'react'
import InfiniteScroll from '../InfiniteScroll'

function SearchBar() {
  const [query, setQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const deferredQuery = useDeferredValue(query)

  const { data: locationData } = useQuery({
    queryKey: QueryKeys.searchLocation(deferredQuery),
    queryFn: () => searchLocation({ query: deferredQuery }),
    enabled: deferredQuery !== '',
  })

  const { data: agencyPaginatedResult, fetchNextPage: fetchMoreAgencies } = useInfiniteQuery({
    queryKey: QueryKeys.agenciesByQuery(deferredQuery),
    queryFn: ({ pageParam }) =>
      searchAgenciesByName({ name: deferredQuery, pageParams: pageParam }),
    initialPageParam: { page: 1, page_size: 10 },
    getNextPageParam: (lastPage) => ({ page: lastPage.page + 1, page_size: 10 }),
    enabled: deferredQuery !== '',
  })

  const agencyData = useMemo(
    () => agencyPaginatedResult?.pages.flatMap((page) => page.results) ?? [],
    [agencyPaginatedResult]
  )

  return (
    <>
      <Box position="relative" height="48px">
        <Input
          onFocus={() => {
            setIsFocused(true)
          }}
          onBlur={() => {
            setIsFocused(false)
          }}
          placeholder="검색어를 입력해주세요."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          zIndex={200}
        />
      </Box>
      {isFocused && (
        <Box
          position="fixed"
          top="108px"
          left={0}
          right={0}
          bottom="80px"
          zIndex={200}
          bgColor={Colors.white}
        >
          <InfiniteScroll
            onLoadMore={() => {
              if (deferredQuery !== '') {
                void fetchMoreAgencies()
              }
            }}
          >
            <>
              {locationData?.results.map((result) => <h3 key={result.id}>{result.name}</h3>)}
              <Divider h={3} />
              {agencyData.map((result, index) => (
                // TODO: key는 result.id로 변경해야됨. 지금은 중복된 id가 내려오는 이슈가 있어 임시 처리
                <Box height={100} key={result.id + index}>
                  {result.name}
                </Box>
              ))}
            </>
          </InfiniteScroll>
        </Box>
      )}
    </>
  )
}

export default SearchBar
