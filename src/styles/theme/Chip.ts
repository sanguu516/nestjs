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

interface Props {
  disabled: object
}

export type ChipVariant = 'outlined' | 'tinted' | 'gray'

interface ChipTheme {
  variants: Record<ChipVariant, Props>
}

export const chipTheme: ChipTheme = {
  variants: { outlined, tinted, gray },
}
