import { type SearchAgenciesResult } from '@/apis/realEstateApis'
import { getRadiusInMeter } from '@/pages/real-estates'
import { Colors } from '@/styles/colors'
import { type Coordinates } from '@/types'
import { Box } from '@chakra-ui/react'
import { debounce } from 'lodash-es'
import { memo, type MutableRefObject, useMemo } from 'react'
import { Circle, Map, MarkerClusterer } from 'react-kakao-maps-sdk'
import {
  convertCoordinatesToLatLng,
  convertLatLngToCoordinates,
  DefaultCenter,
  Zoom,
} from '../../utils/mapUtil'
import AgencyMarker from './AgencyMarker'

const QueryDebounceDelay = 300
interface Props {
  mapRef: MutableRefObject<kakao.maps.Map | null>
  agencies: SearchAgenciesResult[]
  initialCenter: Coordinates
  onZoomChange: (zoom: number) => void
  selectedAgencyId?: number
  onSelectAgency: (id?: number) => void
  onCenterChange: (center: Coordinates) => void
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

  const markerPositions = useMemo(
    () =>
      agencies
        .map((agency) => ({
          lat: agency.address_point.lat,
          lon: agency.address_point.lon,
          id: agency.id,
        }))
        .map((marker) => (
          <AgencyMarker
            key={`${marker.id}`}
            coordinates={marker}
            isSelected={selectedAgencyId === marker.id}
            onSelect={() => {
              onSelectAgency(marker.id)
            }}
          />
        )),
    [agencies, selectedAgencyId, onSelectAgency]
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
          onClick={() => onSelectAgency(undefined)}
          level={Zoom.default}
          minLevel={20}
          ref={mapRef}
          onCenterChanged={debounce((target: kakao.maps.Map) => {
            onCenterChange(convertLatLngToCoordinates(target.getCenter()))
          }, QueryDebounceDelay)}
          onZoomChanged={debounce((target: kakao.maps.Map) => {
            onZoomChange(target.getLevel())
          }, QueryDebounceDelay)}
          center={convertCoordinatesToLatLng(initialCenter)}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        >
          {zoom < Zoom.clusterStart ? (
            markerPositions
          ) : (
            <MarkerClusterer
              averageCenter
              minLevel={Zoom.clusterStart}
              styles={[
                {
                  background: 'url(/marker.png) no-repeat',
                  width: '34px',
                  height: '44px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: Colors.white,
                  fontSize: '14px',
                },
              ]}
            >
              {markerPositions}
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
