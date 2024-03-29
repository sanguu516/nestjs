import { searchAgenciesByAddress } from '@/apis/realEstateApis'
import KakaoMap from '@/components/map/KakaoMap'
import { Coordinates } from '@/types'
import { DefaultCenter, Zoom } from '@/utils/mapUtil'
import { QueryKeys } from '@/utils/queryUtil'
import { useQuery } from '@tanstack/react-query'
import { useCallback, useMemo, useRef, useState } from 'react'

export function getRadiusInMeter(zoom: number) {
  return 50 * Math.pow(2, zoom - 1)
}

export default function RealEstate() {
  const [center, setCenter] = useState(DefaultCenter.coordinates)
  const [zoom, setZoom] = useState(Zoom.default)
  const mapRef = useRef<kakao.maps.Map | null>(null)

  const radiusInMeter = getRadiusInMeter(zoom)
  const { data: agenciesResponse } = useQuery({
    queryKey: QueryKeys.agenciesByAddress(
      center,
      zoom * 200 // TODO: level에 따른 적절한 반경 찾기
    ),
    queryFn: () => {
      return searchAgenciesByAddress({
        center,
        radiusInMeter: getRadiusInMeter(zoom),
        pageParams: { page: 1, page_size: 1000 },
      })
    },
    enabled: zoom <= Zoom.enableQueryMax,
  })

  const handleCenterChange = useCallback((center: Coordinates) => {
    setCenter(center)
  }, [])

  const handleZoomChange = useCallback((zoom: number) => {
    setZoom(zoom)
  }, [])

  const markerPositions = useMemo(
    () =>
      agenciesResponse?.results
        ?.filter((agency) => {
          if (agency.id === undefined) {
            console.log(agency)
          }
          return agency.id !== undefined
        })
        .map((agency) => ({
          latitude: agency.address_point.lat,
          longitude: agency.address_point.lon,
          id: agency.id,
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
