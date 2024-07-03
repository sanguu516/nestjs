'use client'
export function getRadiusInMeter(zoom: number) {
  return 50 * Math.pow(2, zoom - 1)
}
