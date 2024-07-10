'use server'
import { getRealEstateData } from '@/apis/realEstateApis'
import { getAgencyReivewsData } from '@/apis/reviewApis'
import { QueryKeys } from '@/utils/queryUtil'
import { QueryClient, dehydrate } from '@tanstack/react-query'
import RealEstateDetailPage from './RealEstateDetailPage'

type Props = {
  params: {
    id: string
  }
}

export default async function Page({ params }: Props) {
  const queryClient = new QueryClient()
  const id = Number(params.id)

  const agencyData = await getRealEstateData(id)
  await queryClient.prefetchInfiniteQuery({
    queryKey: QueryKeys.reviewsAboutAgency(id),
    initialPageParam: { page: 1, page_size: 10 },
    queryFn: ({ pageParam }) => getAgencyReivewsData({ agency_id: id, pageParams: pageParam }),
  })

  const dehydratedState = dehydrate(queryClient)

  return <RealEstateDetailPage agency={agencyData} dehydratedState={dehydratedState} />
}
