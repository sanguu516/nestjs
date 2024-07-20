import { type SearchAgenciesResult } from '@/apis/realEstateApis'
import { type Coordinates } from '@/types'
import { Box } from '@chakra-ui/react'
import { debounce } from 'lodash-es'
import { memo, type MutableRefObject, useEffect, useRef } from 'react'
import { Map } from 'react-kakao-maps-sdk'
import { convertCoordinatesToLatLng, convertLatLngToCoordinates, Zoom } from '@/utils/mapUtil'
import useClusterer from '@/hooks/useClusterer'
import { Colors } from '@/styles/colors'
import useMarker from '@/hooks/useMarker'

const QueryDebounceDelay = 100
interface Props {
  mapRef: MutableRefObject<kakao.maps.Map | null>
  agencies: SearchAgenciesResult[]
  initialCenter: Coordinates
  onZoomChange: (zoom: number) => void
  selectedAgencyId?: number
  onSelectAgency: (id?: number) => void
  onCenterChange: (center: Coordinates) => void
}

const MARKER_IMAGE = '/marker.png'
const MARKER_SIZE = {
  default: {
    width: 27,
    height: 32,
  },
  selected: {
    width: 40,
    height: 50,
  },
}

function KakaoMap(props: Props) {
  const {
    selectedAgencyId,
    mapRef,
    agencies,
    onZoomChange,
    onCenterChange,
    onSelectAgency,
    initialCenter,
  } = props

  const previousAgencies = useRef<SearchAgenciesResult[]>([])

  const { initMarker, addMarker, removeMarker } = useMarker({
    mapRef,
    image: MARKER_IMAGE,
    size: MARKER_SIZE,
    onSelect: onSelectAgency,
  })

  const clusterer = useClusterer({
    mapRef,
    averageCenter: true,
    minLevel: Zoom.clusterStart,
    styles: [
      {
        background: `url(${MARKER_IMAGE}) no-repeat`,
        width: '34px',
        height: '44px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: Colors.white,
        fontSize: '14px',
      },
    ],
  })

  useEffect(() => {
    if (mapRef.current && agencies.length && clusterer) {
      const newAgencies = agencies.filter(
        (agency) => !previousAgencies.current.some((prev) => prev.id === agency.id)
      )
      const removedAgencies = previousAgencies.current.filter(
        (prev) => !agencies.some((agency) => agency.id === prev.id)
      )

      // 마커 추가
      newAgencies.forEach((agency) => {
        const isSelected = selectedAgencyId === agency.id

        const markerPosition = new kakao.maps.LatLng(
          agency.address_point.lat,
          agency.address_point.lon
        )

        const marker = addMarker(agency.id, isSelected, {
          position: markerPosition,
          map: mapRef.current!,
        })
        clusterer.addMarker(marker)
      })

      // 마커 제거
      removedAgencies.forEach((removed) => {
        const removedMarker = removeMarker(removed.id)
        if (removedMarker) {
          clusterer.removeMarker(removedMarker)
        }
      })

      previousAgencies.current = agencies
    }
  }, [agencies, clusterer])

  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          top: 0,
        }}
      >
        <Map
          onCreate={(map) => {
            onZoomChange(map.getLevel())
            onCenterChange(convertLatLngToCoordinates(map.getCenter()))
          }}
          onClick={() => {
            onSelectAgency(undefined)
            initMarker()
          }}
          level={Zoom.default}
          minLevel={20}
          ref={mapRef}
          onDragEnd={debounce((target: kakao.maps.Map) => {
            onCenterChange(convertLatLngToCoordinates(target.getCenter()))
          }, QueryDebounceDelay)}
          onZoomChanged={debounce((target: kakao.maps.Map) => {
            onZoomChange(target.getLevel())
          }, QueryDebounceDelay)}
          center={convertCoordinatesToLatLng(initialCenter)}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        ></Map>
      </Box>
    </Box>
  )
}

export default memo(KakaoMap)
