import { searchAgenciesByAddress } from '@/apis/realEstateApis'
import { IconCategory, IconLocation } from '@/assets/icons'
import CustomIConButton from '@/components/CustomIconButton'
import AgencyCard from '@/components/real-estates/AgencyCard'
import AgencyListView from '@/components/real-estates/AgencyListView'
import KakaoMap from '@/components/real-estates/KakaoMap'
import { Colors } from '@/styles/colors'
import type { Coordinates } from '@/types'
import { DefaultCenter, Zoom } from '@/utils/mapUtil'
import { QueryKeys } from '@/utils/queryUtil'
import { Box, Flex } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useCallback, useMemo, useRef, useState } from 'react'

export function getRadiusInMeter(zoom: number) {
  return 50 * Math.pow(2, zoom - 1)
}

export default function RealEstate() {
  const [isMapMode, setIsMapMode] = useState(true)
  const [selectedAgencyId, setSelectedAgencyId] = useState<number>()

  const [center, setCenter] = useState(DefaultCenter.coordinates)
  const [zoom, setZoom] = useState(Zoom.default)

  const { query } = useRouter()
  const initialCenter = useMemo(() => {
    const lat = Number(query.lat)
    const lon = Number(query.lon)
    return lat && lon ? { lat, lon } : DefaultCenter.coordinates
  }, [query.lat, query.lon])

  const mapRef = useRef<kakao.maps.Map | null>(null)

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

  const agencies = useMemo(() => agenciesResponse?.results ?? [], [agenciesResponse])
  const selectedAgency = useMemo(
    () => agencies.find((agency) => agency.id === selectedAgencyId),
    [agencies, selectedAgencyId]
  )

  const FabIcon = isMapMode ? IconCategory : IconLocation

  return (
    <Box position="absolute" top={0} left={0} right={0} bottom={0} zIndex={1}>
      {isMapMode ? (
        <KakaoMap
          agencies={agencies}
          selectedAgencyId={selectedAgencyId}
          onSelectAgency={setSelectedAgencyId}
          mapRef={mapRef}
          initialCenter={initialCenter}
          onCenterChange={handleCenterChange}
          onZoomChange={handleZoomChange}
        />
      ) : (
        <AgencyListView agencies={agencies} />
      )}
      <Box position="absolute" left={0} bottom="40px" width="100%" zIndex={200}>
        {selectedAgency ? (
          <Box
            mx={4}
            px={4}
            py={3}
            bgColor={Colors.white}
            borderRadius="8px"
            overflow="hidden"
            boxShadow="0px 1px 3px 0px rgba(0, 0, 0, 0.35)"
          >
            <AgencyCard agency={selectedAgency} />
          </Box>
        ) : (
          <Flex justifyContent="flex-end">
            <CustomIConButton
              sx={{
                background: Colors.white,
                width: '56px',
                height: '56px',
                mr: 4,
                boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.35)',
              }}
              size="lg"
              variant="primary"
              icon={<FabIcon width={24} height={24} color={Colors.indigo[600]} />}
              onClick={(e) => {
                setIsMapMode((prev) => !prev)
                e.stopPropagation()
              }}
            />
          </Flex>
        )}
      </Box>
    </Box>
  )
}
