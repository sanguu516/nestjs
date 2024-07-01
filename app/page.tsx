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

function SectionContainer({ title, children }: PropsWithChildren<{ title: string }>) {
  return (
    <VStack bg={Colors.white} as="section" px={4} py={6} gap={6} width="100%" align="start">
      <Text {...fontStyles.TitleLg}>{title}</Text>
      {children}
    </VStack>
  )
}

export default function Home() {
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
  }, [])

  return (
    <>
      <VStack as="main" bg={Colors.gray[100]} gap={2}>
        <SectionContainer title="인기 지역">
          <Flex flexWrap="wrap" gap={2}>
            {popularLocations.map(({ address_point, name }) => {
              const { lat, lon } = address_point

              return (
                <Center
                  key={`${lat}-${lon}`}
                  as={Link}
                  bgColor={Colors.gray[100]}
                  px={4}
                  borderRadius={8}
                  href={`/real-estates?lat=${lat}&lon=${lon}`}
                  height="48px"
                >
                  <Text {...fontStyles.BodyMd} color={Colors.gray[600]}>
                    {name}
                  </Text>
                </Center>
              )
            })}
          </Flex>
        </SectionContainer>
        <SectionContainer title="실시간 리뷰">
          <VStack width="100%" divider={<Divider />} gap={4}>
            {data?.results.map((review) => <ReviewCard key={review.id} review={review} />)}
          </VStack>
        </SectionContainer>
      </VStack>
    </>
  )
}