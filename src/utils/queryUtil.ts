import { Coordinates } from '@/types'
export const QueryKeys = {
  agenciesByAddress: (center: Coordinates, radiusInMeter: number) => [
    `agenciesByAddress`,
    center,
    radiusInMeter,
  ],
  searchLocation: (query: string) => [`searchLocation`, query],
  agenciesByQuery: (query: string) => [`agenciesByQuery`, query],
} as const
