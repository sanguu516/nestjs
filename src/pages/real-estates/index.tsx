import { searchAgenciesByAddress } from '@/apis/realEstateApis'
import KakaoMap from '@/components/map/KakaoMap'
import { Coordinates } from '@/types'
import { QueryKeys } from '@/utils/queryUtil'
import { useQuery } from '@tanstack/react-query'
import { useCallback, useMemo, useRef, useState } from 'react'

// 좌표값 없이 접근하면 메인페이지로 이동
export default function RealEstate() {
  const [center, setCenter] = useState<Coordinates>()
  const [zoom, setZoom] = useState<number>()
  const mapRef = useRef<kakao.maps.Map | null>(null)

  // TODO: pagination 해야댐. ㅠㅠ
  const { data: agenciesResponse } = useQuery({
    queryKey: QueryKeys.agenciesByAddress(
      center ?? { latitude: -1, longitude: -1 },
      (zoom ?? 1) * 200 // TODO: level에 따른 적절한 반경 찾기
    ),
    queryFn: () => {
      if (!center || !zoom) {
        throw new Error('This should not happen')
      }

      return searchAgenciesByAddress({ center, radiusInMeter: zoom * 200 })
    },
    enabled: !!center && !!zoom,
  })

  const handleCenterChange = useCallback((center: Coordinates) => {
    setCenter(center)
  }, [])

  const handleZoomChange = useCallback((zoom: number) => {
    setZoom(zoom)
  }, [])

  const markerPositions = useMemo(
    () =>
      agenciesResponse?.results?.map((agency) => ({
        latitude: agency.address_point.lat,
        longitude: agency.address_point.lon,
      })) ?? [],
    [agenciesResponse]
  )

  return (
    <KakaoMap
      markerPositions={markerPositions}
      mapRef={mapRef}
      onCenterChange={handleCenterChange}
      onZoomChange={handleZoomChange}
    />
  )
}
