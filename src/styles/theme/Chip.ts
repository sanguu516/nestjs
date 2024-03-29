import { type BoxProps } from '@chakra-ui/react'

const outlined = {
  bg: 'white',
  color: 'gray.800',
  border: '1px',
  borderColor: 'gray.300',
  disabled: {
    border: '1px',
    color: 'gray.400',
  },
}

const tinted = {
  bg: 'indigo.50',
  color: 'gray.800',
  disabled: {
    color: 'gray.400',
  },
}

const gray = {
  bg: 'gray.200',
  color: 'gray.800',
  disabled: {
    color: 'gray.400',
  },
}

const sm = {
  w: '9.25rem',
  h: '1.75rem',
  p: 2,
}

const lg = {
  w: '10.5rem',
  h: '2.75rem',
  px: 2,
  py: 4,
}
export type ChipVariant = 'outlined' | 'tinted' | 'gray'
interface VariantProps {
  disabled: object
}

export type ChipSize = 'sm' | 'lg'

interface ChipTheme {
  variants: Record<ChipVariant, VariantProps>
  sizes: Record<ChipSize, BoxProps>
}

export const chipTheme: ChipTheme = {
  variants: { outlined, tinted, gray },
  sizes: { sm, lg },
}
