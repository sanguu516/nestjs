const primary = {
  bg: 'indigo.600',
  color: 'white',
}

const secondary = {
  bg: 'indigo.100',
  color: 'indigo.600',
}

const tertiary = {
  bg: 'white',
  color: 'indigo.600',
}

const floating = {
  bg: 'white',
  color: 'indigo.600',
  shadow: 'md',
  borderColor: 'gray.300',
  _disabled: {
    color: 'gray.400',
  },
  _hover: {
    _disabled: {
      color: 'gray.400',
    },
  },
}

// sizes
const sm = {
  width: '1rem',
  height: '1rem',
  padding: '0.5rem',
}

const md = {
  width: '1.5rem',
  height: '1.5rem',
  padding: '0.75rem',
}

const lg = {
  width: '1.5rem',
  height: '1.5rem',
  padding: '1rem',
}

const floatSm = {
  width: '1.25rem',
  height: '1.25rem',
  // padding: '0.375rem',
}

const floatMd = {
  ...md,
  // padding: '0.5rem',
}

const floatLg = {
  ...md,
  // padding: '1rem',
}

export type Size = 'sm' | 'md' | 'lg'
export type Sizes = Record<'sm' | 'md' | 'lg', object>
export type IconButtonVariant = 'tertiary' | 'secondary' | 'primary' | 'floating'

interface IconButtonTheme {
  sizes: Sizes
  floatSizes: Sizes
  variants: Record<IconButtonVariant, object>
}

export const iconButtonTheme: IconButtonTheme = {
  sizes: { sm, md, lg },
  floatSizes: { sm: floatSm, md: floatMd, lg: floatLg },
  variants: {
    tertiary,
    secondary,
    primary,
    floating,
  },
}
