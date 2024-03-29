import { IconMarker } from '@/assets/icons'
import { Coordinates } from '@/types'
import { CustomOverlayMap } from 'react-kakao-maps-sdk'

interface Props {
  coordinates: Coordinates
  isSelected: boolean
  onSelect: () => void
}

export default function AgencyMarker({ coordinates, isSelected, onSelect }: Props) {
  const size = isSelected ? 74 : 32
  return (
    <CustomOverlayMap // 커스텀 오버레이를 표시할 Container
      // 커스텀 오버레이가 표시될 위치입니다
      position={{
        lat: coordinates.latitude,
        lng: coordinates.longitude,
      }}
      zIndex={isSelected ? 1 : 0}
    >
      {isSelected ? (
        <IconMarker
          style={{ marginLeft: '-21px', marginTop: '-42px' }}
          onClick={onSelect}
          width={size}
          height={size}
        />
      ) : (
        <IconMarker onClick={onSelect} width={size} height={size} />
      )}
    </CustomOverlayMap>
  )
}
