import { defineStyle, defineStyleConfig } from '@chakra-ui/react'
import { fontStyles } from '../font'

// variants
const filled = defineStyle({
  bg: 'indigo.600',
  color: 'white',
  _disabled: {
    bg: 'gray.300',
  },
  _hover: {
    _disabled: {
      bg: 'gray.300',
    },
  },
})

const outlined = defineStyle({
  bg: 'white',
  color: 'indigo.600',
  border: '1px',
  borderColor: 'gray.300',
  _disabled: {
    border: '1px',
    borderColor: 'gray.300',
    color: 'gray.300',
  },
  _hover: {
    _disabled: {
      border: '1px',
      borderColor: 'gray.300',
      color: 'gray.300',
    },
  },
})

const tinted = defineStyle({
  bg: 'indigo.100',
  color: 'indigo.600',
  _disabled: {
    color: 'indigo.300',
  },
  _hover: {
    _disabled: {
      color: 'indigo.300',
    },
  },
})

const gray = defineStyle({
  bg: 'gray.100',
  color: 'indigo.600',
  _disabled: {
    color: 'indigo.300',
  },
  _hover: {
    _disabled: {
      color: 'indigo.300',
    },
  },
})

const text = defineStyle({
  bg: 'white',
  color: 'gray.400',
  _disabled: {
    color: 'indigo.300',
  },
  _hover: {
    _disabled: {
      color: 'indigo.300',
    },
  },
})

// sizes
const sm = defineStyle({
  ...fontStyles.LabelMd,
  w: 70,
  h: 8,
  px: 2,
  py: 4,
})

const md = defineStyle({
  ...fontStyles.LabelMd,
  w: 70,
  h: 10,
  px: 2,
  py: 4,
})

const lg = defineStyle({
  ...fontStyles.LabelLg,
  w: 92,
  h: 12,
  px: 2,
  py: 6,
})

export type ButtonVariant = 'filled' | 'outlined' | 'tinted' | 'gray' | 'text'
export { type Size } from '@/styles/theme/IconButton'

export const buttonTheme = defineStyleConfig({
  baseStyle: {
    borderRadius: 8,
  },
  defaultProps: {
    size: 'sm',
    variant: 'outlined',
  },
  sizes: { sm, md, lg },
  variants: { filled, outlined, tinted, gray, text },
})
