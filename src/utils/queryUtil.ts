import { Coordinates } from '@/types'
export const QueryKeys = {
  agenciesByAddress: (center: Coordinates, radiusInMeter: number) => [
    `agenciesByAddress`,
    center,
    radiusInMeter,
  ],
} as const
