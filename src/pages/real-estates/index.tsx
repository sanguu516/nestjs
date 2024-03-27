import KakaoMap from '@/components/map/KakaoMap'
import { useRouter } from 'next/router'
import { useRef } from 'react'

// 좌표값 없이 접근하면 메인페이지로 이동
export default function RealEstate() {
  const mapRef = useRef<kakao.maps.Map | null>(null)

  return <KakaoMap mapRef={mapRef} />
}
