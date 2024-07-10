'use client'

import { searchAgenciesByName, searchLocation } from '@/apis/realEstateApis'
import { IconArrowLeft, IconDeleteCircle, IconSearch } from '@/assets/icons'
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

function SearchBar() {
  const [query, setQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const pathname = usePathname()

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
    initialPageParam: { page: 1, page_size: 15 },
    getNextPageParam: (lastPage) => ({ page: lastPage.page + 1, page_size: 15 }),
    enabled: deferredQuery !== '',
  })

  useEffect(() => {
    setIsFocused(false)
  }, [pathname])

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
        {isFocused && (
          <IconButton
            onClick={() => setIsFocused(false)}
            flexShrink={0}
            variant="none"
            aria-label="back"
            width="48px"
            height="48px"
          >
            <IconArrowLeft width={24} height={24} />
          </IconButton>
        )}
        <Input
          variant="none"
          onFocus={() => {
            setIsFocused(true)
          }}
          placeholder="지역, 중개인명, 중개사무소명"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          zIndex={200}
        />
        <Flex align="center">
          {!isEmpty(deferredQuery) && (
            <Button flexShrink={0} width={12} height={12} variant="none" aria-label="search">
              {
                <IconDeleteCircle
                  color={Colors.gray[400]}
                  width={24}
                  height={24}
                  onClick={() => setQuery('')}
                />
              }
            </Button>
          )}
          <Button flexShrink={0} width={12} height={12} variant="none" aria-label="search">
            {<IconSearch width={24} height={24} color={Colors.indigo[600]} />}
          </Button>
        </Flex>
      </Flex>
      <Divider height="1px" bgColor={Colors.indigo[600]} />
      {isFocused && (
        <Box
          position="absolute"
          top="108px"
          maxWidth={480}
          marginX="auto"
          bottom="80px"
          width="100%"
          bgColor={Colors.white}
        >
          <InfiniteScroll onLoadMore={handleLoadMoreAgencies}>
            <VStack width="100%" px={4}>
              {locationCount !== undefined && locationCount > 0 && (
                <Box width="100%">
                  <Text
                    {...fontStyles.LabelSm}
                    color={Colors.gray[400]}
                    sx={{ flex: 'display', alignContent: 'center' }}
                    height={10}
                  >{`지역정보 ${locationData?.total_count}`}</Text>
                  {locationData?.results.map((result) => (
                    <Flex
                      as={Link}
                      onClick={(e) => {
                        e.stopPropagation()
                        setIsFocused(false)
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
              {agencyCount !== undefined && agencyCount > 0 && (
                <Box width="100%">
                  <Text
                    {...fontStyles.LabelSm}
                    color={Colors.gray[400]}
                    sx={{ flex: 'display', alignContent: 'center' }}
                    height={10}
                  >{`공인중개소 ${agencyPaginatedResult?.pages?.[0]?.total_count ?? 0}`}</Text>
                  <VStack gap={8}>
                    {agencyData.map((agency) => (
                      // TODO: key는 result.id로 변경해야됨. 지금은 중복된 id가 내려오는 이슈가 있어 임시 처리
                      <AgencyCard key={agency.id} agency={agency} />
                    ))}
                  </VStack>
                </Box>
              )}
            </VStack>
          </InfiniteScroll>
        </Box>
      )}
    </>
  )
}

export default SearchBar
