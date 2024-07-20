'use client'

import { searchAgenciesByAddress } from '@/apis/realEstateApis'
import { IconMap, IconToggle, IconBottomSheet } from '@/assets/icons'
import CustomIConButton from '@/components/CustomIconButton'
import AgencyCard from '@/components/real-estates/AgencyCard'
import AgencyListView from '@/components/real-estates/AgencyListView'
import KakaoMap from '@/components/real-estates/KakaoMap'
import { Colors } from '@/styles/colors'
import type { Coordinates } from '@/types'
import { DefaultCenter, Zoom } from '@/utils/mapUtil'
import { QueryKeys } from '@/utils/queryUtil'
import {
  Box,
  Flex,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { useCallback, useMemo, useRef, useState } from 'react'

// TODO: zoom level에 따른 적절한 반경 찾기
function getRadiusInMeter(zoom: number) {
  return 50 * Math.pow(2, zoom - 1)
}

const Home = () => {
  const [isMapMode, setIsMapMode] = useState(true)
  const [selectedAgencyId, setSelectedAgencyId] = useState<number>()
  const [center, setCenter] = useState(DefaultCenter.coordinates)
  const [zoom, setZoom] = useState(Zoom.default)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef(null)

  const searchParams = useSearchParams()

  const querylat = searchParams.get('lat')
  const querylon = searchParams.get('lon')

  const initialCenter = useMemo(() => {
    const lat = Number(querylat)
    const lon = Number(querylon)
    return lat && lon ? { lat, lon } : DefaultCenter.coordinates
  }, [querylat, querylon])

  const mapRef = useRef<kakao.maps.Map | null>(null)

  const { data: agenciesResponse } = useQuery({
    queryKey: QueryKeys.agenciesByAddress(center, zoom),
    queryFn: () => {
      return searchAgenciesByAddress({
        center,
        radiusInMeter: getRadiusInMeter(zoom),
        pageParams: { page: 1, page_size: 500 },
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

  const agencies = useMemo(() => agenciesResponse?.results ?? [], [agenciesResponse?.results, zoom])
  const selectedAgency = useMemo(
    () => agencies.find((agency) => agency.id === selectedAgencyId),
    [selectedAgencyId]
  )

  const FabIcon = isMapMode ? IconToggle : IconMap

  const getRadiusInMeter = (zoom: number) => {
    return 50 * Math.pow(2, zoom - 1)
  }

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
      <Box position="absolute" bottom={selectedAgency ? 0 : 4} left={0} width="100%" zIndex={200}>
        {selectedAgency ? (
          <Box
            p={4}
            bgColor={Colors.white}
            borderRadius="20px 20px 0px 0px"
            overflow="hidden"
            boxShadow="box-shadow: 0px 2px 6px -1px #0000001F;"
          >
            <Flex justifyContent={'center'} mt={-3} ref={btnRef} onClick={onOpen}>
              <IconBottomSheet width={40} height={8} />
              {/* <Drawer isOpen={isOpen} placement="bottom" onClose={onClose} finalFocusRef={btnRef}>
                <DrawerOverlay />
                <DrawerContent>
                  <DrawerCloseButton />
                  <DrawerHeader>Create your account</DrawerHeader>
                </DrawerContent>
              </Drawer> */}
            </Flex>
            <AgencyCard agency={selectedAgency} />
          </Box>
        ) : (
          <Flex justifyContent="center" textAlign={'center'}>
            <CustomIConButton
              sx={{
                background: isMapMode ? Colors.white : Colors.new_gray[8],
                width: '86px',
                height: '44px',
                color: isMapMode ? Colors.new_gray[9] : Colors.white,
                boxShadow: '0px 2px 6px -1px #0000001F',
                border: isMapMode ? `1.5px solid ${Colors.new_gray[3]}` : 'none',
                padding: '16px',
              }}
              size="lg"
              variant="primary"
              icon={<FabIcon width={20} height={20} color={Colors.indigo[600]} />}
              onClick={(e) => {
                setIsMapMode((prev) => !prev)
                e.stopPropagation()
              }}
              title={isMapMode ? '목록' : '지도'}
            />
          </Flex>
        )}
      </Box>
    </Box>
  )
}

export default Home
