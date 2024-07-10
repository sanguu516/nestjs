import { MutableRefObject, useEffect, useState } from 'react'

type useClustererProps = {
  mapRef: MutableRefObject<kakao.maps.Map | null>
} & kakao.maps.MarkerClustererOptions

const useClusterer = ({ mapRef, ...props }: useClustererProps) => {
  const [clusterer, setClusterer] = useState<kakao.maps.MarkerClusterer | null>(null)

  useEffect(() => {
    if (mapRef.current && !clusterer) {
      const newClusterer = new kakao.maps.MarkerClusterer({
        map: mapRef.current!,
        ...props,
      })
      setClusterer(newClusterer)
    }
  }, [mapRef.current])

  return clusterer
}

export default useClusterer
