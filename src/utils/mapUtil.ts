import { Coordinates } from '@/types'

export function convertLatLngToCoordinates(latLng: kakao.maps.LatLng) {
  return {
    latitude: latLng.getLat(),
    longitude: latLng.getLng(),
  }
}

export function convertCoordinatesToLatLng(coordinates: Coordinates) {
  return { lat: coordinates.latitude, lng: coordinates.longitude }
}

export const DefaultCenter = {
  coordinates: {
    latitude: 37.4976674173806,
    longitude: 127.029286360295,
  },
  latLng: {
    lat: 37.4976674173806,
    lng: 127.029286360295,
  },
}

export const Zoom = {
  default: 3,
  max: 10,
  clusterStart: 3,
  enableQueryMax: 5,
}
