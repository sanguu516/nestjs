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
    <CustomOverlayMap
      position={{
        lat: coordinates.lat,
        lng: coordinates.lon,
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
