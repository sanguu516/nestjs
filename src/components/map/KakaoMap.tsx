import { Coordinates } from '@/types'
import { Box } from '@chakra-ui/react'
import { debounce } from 'lodash-es'
import { memo, MutableRefObject } from 'react'
import { Map, MapMarker } from 'react-kakao-maps-sdk'
import {
  convertCoordinatesToLatLng,
  convertLatLngToCoordinates,
  DefaultCenter,
} from '../../utils/mapUtil'

const QueryDebounceDelay = 300
interface Props {
  mapRef: MutableRefObject<kakao.maps.Map | null>
  markerPositions: Coordinates[]
  onZoomChange: (zoom: number) => void
  onCenterChange: (center: Coordinates) => void
}

function KakaoMap(props: Props) {
  const { mapRef, markerPositions, onZoomChange, onCenterChange } = props

  return (
    <Box sx={{ position: 'relative', width: '100dvw', height: '100dvh' }}>
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          top: 0,
          zIndex: 2,
        }}
      >
        <Map
          onCreate={(map) => {
            onZoomChange(map.getLevel())
            onCenterChange(convertLatLngToCoordinates(map.getCenter()))
          }}
          minLevel={6}
          ref={mapRef}
          onCenterChanged={debounce((target: kakao.maps.Map) => {
            onCenterChange(convertLatLngToCoordinates(target.getCenter()))
          }, QueryDebounceDelay)}
          onZoomChanged={debounce((target: kakao.maps.Map) => {
            onZoomChange(target.getLevel())
          }, QueryDebounceDelay)}
          center={DefaultCenter.latLng}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        >
          {markerPositions.map((position, index) => (
            <MapMarker key={index} position={convertCoordinatesToLatLng(position)}></MapMarker>
          ))}
        </Map>
      </Box>
    </Box>
  )
}

export default memo(KakaoMap)
