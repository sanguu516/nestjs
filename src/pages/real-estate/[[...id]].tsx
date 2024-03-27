import { getRealEstateData, type RealEstateResponse } from '@/apis/realEstateApis'
import { blurDataURL } from '@/constants'
import { Box, Flex, Text } from '@chakra-ui/react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Image from 'next/image'
import Header from '../../components/Header'

type InfoKey = Partial<Record<keyof RealEstateResponse, string>>

const INFO_KEY: InfoKey = {
  representative_name: '대표자',
  tel: '대표번호',
  mobile: '중개사번호',
  address_detail: '소재지',
  agency_number: '등록번호',
}

export const getServerSideProps: GetServerSideProps<{ agency: RealEstateResponse }> = async (
  context
) => {
  const id = Number(context?.params?.id?.[0])
  const data = await getRealEstateData(id)

  return {
    props: {
      agency: data,
    },
  }
}

export default function Detail({ agency }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { name } = agency

  return (
    <>
      <Header />
      <article style={{ padding: '24px', position: 'relative' }}>
        <Image
          style={{ minWidth: '100%' }}
          src={'https://dummyimage.com/300x150/000/fff'}
          width={300}
          height={150}
          loading="lazy"
          placeholder="blur"
          blurDataURL={blurDataURL}
          alt="대표이미지"
        />
        <address>
          <Flex justify={'space-between'}>
            <h3>{name}</h3>
            <Flex align={'center'}>
              <Image
                src={'https://dummyimage.com/16x16/000/fff'}
                width={16}
                height={16}
                alt="별점 아이콘"
              />
              <Text>{'3.5'}</Text>
            </Flex>
          </Flex>
          {Object.keys(INFO_KEY).map((e) => {
            const type = INFO_KEY[e as keyof typeof INFO_KEY]
            const value = agency[e as keyof RealEstateResponse]
            return (
              <Flex justify={'space-between'} key={e}>
                <Text minW={200}>{type}</Text>
                <Text>{value?.toString()}</Text>
              </Flex>
            )
          })}
        </address>
      </article>
      <Box flex={1} bg="tomato"></Box>
      {/* <Reviews/> */}
    </>
  )
}
