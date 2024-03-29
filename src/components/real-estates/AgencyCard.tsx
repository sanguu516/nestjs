import { type SearchAgenciesResult } from '@/apis/realEstateApis'
import { Button, type SpaceProps } from '@chakra-ui/react'
import { useRouter } from 'next/router'

interface Props extends SpaceProps {
  agency: SearchAgenciesResult
}

export default function AgencyCard({ agency, ...rest }: Props) {
  const router = useRouter()
  const { name, id } = agency

  return (
    <Button
      onClick={() => router.push(`/real-estate/${id}`)}
      sx={{ width: '100%', height: 98 }}
      {...rest}
    >
      {name}
    </Button>
  )
}
