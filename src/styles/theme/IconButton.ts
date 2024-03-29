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
  icon: {
    width: '1rem',
    height: '1rem',
  },
  button: {
    width: '2rem',
    height: '2rem',
    padding: '0.5rem',
  },
}

const md = {
  icon: {
    width: '1.5rem',
    height: '1.5rem',
  },
  button: {
    width: '3rem',
    height: '3rem',
    padding: '0.75rem',
  },
}

const lg = {
  icon: {
    width: '1.5rem',
    height: '1.5rem',
  },
  button: {
    width: '3.5rem',
    height: '3.5rem',
    padding: '1rem',
  },
}

const floatSm = {
  icon: {
    width: '1.25rem',
    height: '1.25rem',
  },
  button: {
    width: '2rem',
    height: '2rem',
    padding: '0.375rem',
  },
}

const floatMd = {
  icon: { ...md.icon },
  button: {
    width: '2.5rem',
    height: '2.5rem',
    padding: '0.5rem',
  },
}

const floatLg = {
  icon: { ...md.icon },
  button: {
    width: '3.5rem',
    height: '3.5rem',
    padding: '1rem',
  },
}

interface StyleProps {
  width: string
  height: string
  padding?: string
}

interface SizeProps {
  icon: StyleProps
  button: StyleProps
}

export type Size = 'sm' | 'md' | 'lg'
export type Sizes = Record<Size, SizeProps>
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
