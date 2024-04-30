import { RealEstateResponse } from '@/apis/realEstateApis'
import { head, isEmpty } from 'lodash-es'
import Image from 'next/image'
import KakaoStaticMap from './KakaoStaticMap'

interface Props {
  agency: RealEstateResponse
}

function AgencyImageView(props: Props) {
  const { agency } = props
  const image = head(agency.images)?.original_image

  if (image) {
    return (
      <Image
        style={{ minWidth: '100%' }}
        src={image}
        width={360}
        height={220}
        loading="lazy"
        placeholder="blur"
        alt="대표이미지"
      />
    )
  }

  return <KakaoStaticMap coordinates={agency.address_point} />
}

export default AgencyImageView
