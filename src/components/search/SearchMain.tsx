'use client'

import { getMe } from '@/apis/authApis'
import { getTrendingReviews } from '@/apis/reviewApis'
import ReviewCard from '@/components/home/ReviewCard'
import { popularLocations } from '@/constants'
import UserContext from '@/providers/UserProvider'
import { Colors } from '@/styles/colors'
import { fontStyles } from '@/styles/font'
import { LocalStorageManager, StorageKey } from '@/utils/localStorageUtil'
import { QueryKeys } from '@/utils/queryUtil'
import { Center, Divider, Flex, Text, VStack } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import type { PropsWithChildren } from 'react'
import { useContext, useEffect } from 'react'
import { IconLocationSoild } from '@/assets/icons'

function SectionContainer({ title, children }: PropsWithChildren<{ title: string }>) {
  return (
    <VStack bg={Colors.white} as="section" py={5} gap={6} width="100%" align="start">
      <Text {...fontStyles.bold_14} color={Colors.new_gray[8]}>
        {title}
      </Text>
      {children}
    </VStack>
  )
}

export default function SearchMain({ setIsSearch }: { setIsSearch: (isSearch: boolean) => void }) {
  const { setUser } = useContext(UserContext)
  const { data } = useQuery({
    queryKey: [QueryKeys.getTrendingReviews],
    queryFn: getTrendingReviews,
  })

  useEffect(() => {
    const token = LocalStorageManager.get(StorageKey.aceessToken)

    if (token) {
      void getMe().then(setUser)
    }
  }, [setUser])

  return (
    <>
      <SectionContainer title="최근 리뷰를 받은 중개사무소">
        {/* <VStack width="100%" divider={<Divider />} gap={4}>
            {data?.results.map((review) => <ReviewCard key={review.id} review={review} />)}
          </VStack> */}
      </SectionContainer>
      <SectionContainer title="인기 지역">
        <Flex flexWrap="wrap" gap={2}>
          {popularLocations.map(({ address_point, name }) => {
            const { lat, lon } = address_point
            return (
              <Center
                key={`${lat}-${lon}`}
                as={Link}
                bgColor={Colors.blue_gray[1]}
                px={3}
                borderRadius={8}
                href={`/?lat=${lat}&lon=${lon}`}
                height="36px"
                onClick={() => setIsSearch(false)}
              >
                <IconLocationSoild width={16} height={16} color={Colors.blue_gray[3]} />
                <Text ml={1} {...fontStyles.BodyMd} color={Colors.new_gray[9]}>
                  {name}
                </Text>
              </Center>
            )
          })}
        </Flex>
      </SectionContainer>
    </>
  )
}
