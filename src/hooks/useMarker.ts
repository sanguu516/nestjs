import { MutableRefObject, useRef } from 'react'

interface MarkerSize {
  width: number
  height: number
}

interface useMarkerProps {
  mapRef: MutableRefObject<kakao.maps.Map | null>
  image: string
  size: {
    default: MarkerSize
    selected: MarkerSize
  }
  onSelect: (id?: number) => void
}

const useMarker = ({ mapRef, ...props }: useMarkerProps) => {
  const markersRef = useRef<Record<number, kakao.maps.Marker>>({})

  const getMarkerImage = (type: 'default' | 'selected') => {
    const imageSize =
      type === 'default'
        ? new kakao.maps.Size(props.size.default.width, props.size.default.height)
        : new kakao.maps.Size(props.size.selected.width, props.size.selected.height)
    const markerImage = new kakao.maps.MarkerImage(props.image, imageSize)
    return markerImage
  }

  const initMarker = () => {
    Object.values(markersRef.current).forEach((marker) => {
      const markerImage = getMarkerImage('default')
      marker.setImage(markerImage)
      marker.setZIndex(0)
    })
  }

  const addMarker = (markerId: number, isSelected: boolean, options: kakao.maps.MarkerOptions) => {
    const markerImage = isSelected ? getMarkerImage('selected') : getMarkerImage('default')
    const marker = new kakao.maps.Marker({
      position: options.position,
      map: options.map,
      image: markerImage,
    })

    kakao.maps.event.addListener(marker, 'click', () => {
      props.onSelect(markerId)

      initMarker()

      const selectedMarkerImage = getMarkerImage('selected')
      marker.setImage(selectedMarkerImage)
      marker.setZIndex(1)
    })

    markersRef.current[markerId] = marker

    return marker
  }

  const removeMarker = (markerId: number) => {
    const removedMarker = markersRef.current[markerId]
    delete markersRef.current[markerId]
    return removedMarker
  }

  return {
    initMarker,
    addMarker,
    removeMarker,
  }
}

export default useMarker
