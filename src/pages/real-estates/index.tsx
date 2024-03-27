import { searchAgenciesByAddress } from '@/apis/realEstateApis'
import KakaoMap from '@/components/map/KakaoMap'
import { Coordinates } from '@/types'
import { DefaultCenter, defaultZoom } from '@/utils/mapUtil'
import { QueryKeys } from '@/utils/queryUtil'
import { useQuery } from '@tanstack/react-query'
import { useCallback, useMemo, useRef, useState } from 'react'

export default function RealEstate() {
  const [center, setCenter] = useState(DefaultCenter.coordinates)
  const [zoom, setZoom] = useState(defaultZoom)
  const mapRef = useRef<kakao.maps.Map | null>(null)

  // TODO: pagination 해야댐. ㅠㅠ
  const { data: agenciesResponse } = useQuery({
    queryKey: QueryKeys.agenciesByAddress(
      center,
      zoom * 200 // TODO: level에 따른 적절한 반경 찾기
    ),
    queryFn: () => {
      if (!center || !zoom) {
        throw new Error('This should not happen')
      }

      return searchAgenciesByAddress({ center, radiusInMeter: zoom * 200 })
    },
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
