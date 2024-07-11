'use server'
import { getRealEstateData } from '@/apis/realEstateApis'
import { getAgencyReivewsData } from '@/apis/reviewApis'
import { QueryKeys } from '@/utils/queryUtil'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import RealEstateDetailPage from '../RealEstateDetailPage'
import type { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: { slug: [string, string] }
}): Promise<Metadata> {
  const agencyData = await getRealEstateData(Number(params.slug[0]))

  const shareTextList: Record<string, string> = {
    대표자: agencyData.representative_name,
    중개등록번호: agencyData.agency_number,
    전화번호: agencyData.tel || agencyData.mobile || '',
  }

  const shareText = Object.keys(shareTextList).reduce((acc, key) => {
    if (shareTextList[key]) {
      return acc + `${acc !== '' ? ', ' : ''}${key}: ${shareTextList[key]}`
    }
    return acc
  }, '')

  return {
    title: `${agencyData.name} | 별별부동산`,
    description: `${agencyData.address_short} ${agencyData.name}, ${shareText} 등의 정보를 확인해보세요`,
    openGraph: {
      title: agencyData.name,
      description: `${agencyData.name} - ${agencyData.address_short}`,
      // images: agencyData.images.length ? [{ url: agencyData.images[0].original_image, alt: agencyData.name }] : []
    },
  }
}

export default async function Page({ params }: { params: { slug: [string, string] } }) {
  const queryClient = new QueryClient()
  const id = Number(params.slug[0])

  const agencyData = await getRealEstateData(id)
  await queryClient.prefetchInfiniteQuery({
    queryKey: QueryKeys.reviewsAboutAgency(id),
    initialPageParam: { page: 1, page_size: 10 },
    queryFn: ({ pageParam }) => getAgencyReivewsData({ agency_id: id, pageParams: pageParam }),
  })

  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <RealEstateDetailPage agency={agencyData} dehydratedState={dehydratedState} />
    </HydrationBoundary>
  )
}
