import { Coordinates } from '@/types'
import { MouseEvent, MouseEventHandler } from 'react'
import { StaticMap } from 'react-kakao-maps-sdk'

interface Props {
  coordinates: Coordinates
}

function KakaoStaticMap({ coordinates }: Props) {
  return (
    <StaticMap
      id="kakao-static-map"
      center={{
        lat: coordinates.lat,
        lng: coordinates.lon,
      }}
      level={3}
      marker={true}
      onClick={(e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault()
      }}
      style={{ width: '100%', height: 250 }}
    />
  )
}

export default KakaoStaticMap
