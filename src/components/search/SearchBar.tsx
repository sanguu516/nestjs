'use client'
import { searchAgenciesByName, searchLocation } from '@/apis/realEstateApis'
import { IconArrowLeft, IconDeleteCircle, IconNoSearch, IconSearch } from '@/assets/icons'
import { Colors } from '@/styles/colors'
import { fontStyles } from '@/styles/font'
import { QueryKeys } from '@/utils/queryUtil'
import { Box, Button, Divider, Flex, IconButton, Input, Text, VStack } from '@chakra-ui/react'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { isEmpty } from 'lodash-es'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useDeferredValue, useEffect, useMemo, useState } from 'react'
import InfiniteScroll from '../InfiniteScroll'
import AgencyCard from '../real-estates/AgencyCard'
import SearchNoData from './SearchNoData'
import Home from 'app/page'
import SearchMain from './SearchMain'

function SearchBar({ setIsSearch }: { setIsSearch: (isSearch: boolean) => void }) {
  const [query, setQuery] = useState('')

  const deferredQuery = useDeferredValue(query)

  const { data: locationData } = useQuery({
    queryKey: QueryKeys.searchLocation(deferredQuery),
    queryFn: () => searchLocation({ query: deferredQuery }),
    enabled: deferredQuery !== '',
  })

  console.log('locationData>>', locationData)
  const {
    data: agencyPaginatedResult,
    fetchNextPage: fetchMoreAgencies,
    isFetching,
    isLoading,
  } = useInfiniteQuery({
    queryKey: QueryKeys.agenciesByQuery(deferredQuery),
    queryFn: ({ pageParam }) =>
      searchAgenciesByName({ name: deferredQuery, pageParams: pageParam }),
    initialPageParam: { page: 1, page_size: 15 },
    getNextPageParam: (lastPage) => {
      if (lastPage.page * lastPage.page_size < lastPage.total_count) {
        return { page: lastPage.page + 1, page_size: 15 }
      }
      return undefined
    },
    enabled: deferredQuery !== '',
  })

  const agencyData = useMemo(
    () => agencyPaginatedResult?.pages.flatMap((page) => page.results) ?? [],
    [agencyPaginatedResult]
  )

  const locationCount = locationData?.total_count
  const agencyCount = agencyPaginatedResult?.pages?.[0]?.total_count

  const handleLoadMoreAgencies = useCallback(() => {
    if (deferredQuery !== '') {
      void fetchMoreAgencies()
    }
  }, [deferredQuery, fetchMoreAgencies])

  return (
    <>
      <Flex height="48px" align="center">
        <IconButton
          onClick={() => setIsSearch(false)}
          flexShrink={0}
          variant="none"
          aria-label="back"
          width="48px"
          height="48px"
        >
          <IconArrowLeft width={24} height={24} />
        </IconButton>
        <Input
          variant="none"
          placeholder="지역, 중개인명, 중개사무소명"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          zIndex={200}
          ml={-5}
        />
        <Flex align="center">
          {!isEmpty(deferredQuery) && (
            <Button flexShrink={0} width={12} height={12} variant="none" aria-label="search">
              {
                <IconDeleteCircle
                  width={24}
                  height={24}
                  onClick={() => setQuery('')}
                  color={Colors.new_gray[6]}
                />
              }
            </Button>
          )}
        </Flex>
      </Flex>
      <Divider height="1px" bgColor={Colors.new_gray[3]} />
      <Box
        position="absolute"
        maxWidth={480}
        top="50px"
        marginX="auto"
        bottom="80px"
        width="100%"
        bgColor={Colors.white}
      >
        <InfiniteScroll onLoadMore={handleLoadMoreAgencies}>
          <VStack width="100%" px={4}>
            {locationCount !== undefined && locationCount > 0 && (
              <Box width="100%">
                {locationData?.results.map((result) => (
                  <Flex
                    as={Link}
                    onClick={(e) => {
                      e.stopPropagation()
                    }}
                    href={`/real-estates?lat=${result.address_point.lat}&lon=${result.address_point.lon}`}
                    key={result.id}
                    height={10}
                    alignContent="center"
                  >
                    <Text {...fontStyles.BodyMd} color={Colors.gray[800]}>
                      {result.name}
                    </Text>
                  </Flex>
                ))}
              </Box>
            )}
            {query === '' && <SearchMain setIsSearch={setIsSearch} />}
            {agencyCount !== undefined && agencyCount > 0 ? (
              <Box width="100%">
                <VStack gap={8} pt={6}>
                  {agencyData.map((agency, index) => (
                    // TODO: key는 result.id로 변경해야됨. 지금은 중복된 id가 내려오는 이슈가 있어 임시 처리
                    <>
                      <AgencyCard key={index} agency={agency} />
                      <Box position="relative" width="100vw">
                        <Divider height="1px" bgColor={Colors.new_gray[2]} />
                      </Box>
                    </>
                  ))}
                </VStack>
              </Box>
            ) : (
              query !== '' && (
                <Flex
                  position="absolute"
                  top="50%"
                  left="50%"
                  transform="translate(-50%, -50%)"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <SearchNoData title="검색 결과가 없어요" content="다른 검색어를 입력해보세요" />
                </Flex>
              )
            )}
          </VStack>
        </InfiniteScroll>
      </Box>
    </>
  )
}

export default SearchBar
