import { SearchAgenciesResult } from '@/apis/realEstateApis'
import { getRadiusInMeter } from '@/pages/real-estates'
import { Colors } from '@/styles/colors'
import { Coordinates } from '@/types'
import { Box } from '@chakra-ui/react'
import { debounce } from 'lodash-es'
import { memo, MutableRefObject, useMemo } from 'react'
import { Circle, Map, MapMarker, MarkerClusterer } from 'react-kakao-maps-sdk'
import {
  convertCoordinatesToLatLng,
  convertLatLngToCoordinates,
  DefaultCenter,
  Zoom,
} from '../../utils/mapUtil'

const QueryDebounceDelay = 300
interface Props {
  mapRef: MutableRefObject<kakao.maps.Map | null>
  agencies: SearchAgenciesResult[]
  onZoomChange: (zoom: number) => void
  onCenterChange: (center: Coordinates) => void
}

function KakaoMap(props: Props) {
  const { mapRef, agencies, onZoomChange, onCenterChange } = props

  const markerPositions = useMemo(
    () =>
      agencies.map((agency) => ({
        latitude: agency.address_point.lat,
        longitude: agency.address_point.lon,
        id: agency.id,
      })),
    [agencies]
  )

  const center = mapRef.current?.getCenter()
  const centerLatLng = center
    ? { lat: center.getLat(), lng: center.getLng() }
    : DefaultCenter.latLng

  const zoom = mapRef.current?.getLevel() ?? 1
  const radius = getRadiusInMeter(zoom)

  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
      <Box
        sx={{
          position: 'absolute',
          left: -4,
          right: -4,
          bottom: 0,
          top: 0,
        }}
      >
        <Map
          onCreate={(map) => {
            onZoomChange(map.getLevel())
            onCenterChange(convertLatLngToCoordinates(map.getCenter()))
          }}
          level={Zoom.default}
          minLevel={20}
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
          {zoom < Zoom.clusterStart ? (
            markerPositions.map((marker) => (
              <MapMarker key={`${marker.id}`} position={convertCoordinatesToLatLng(marker)} />
            ))
          ) : (
            <MarkerClusterer averageCenter disableClickZoom minLevel={Zoom.clusterStart}>
              {markerPositions.map((marker) => (
                <MapMarker key={`${marker.id}`} position={convertCoordinatesToLatLng(marker)} />
              ))}
            </MarkerClusterer>
          )}
          <Circle
            fillColor={Colors.red[500]}
            strokeWeight={0}
            fillOpacity={0.3}
            radius={radius}
            center={centerLatLng}
          ></Circle>
        </Map>
      </Box>
    </Box>
  )
}

export default memo(KakaoMap)
