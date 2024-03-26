import { Colors } from '@/styles/colors'
import { Box, Button, HStack, VStack } from '@chakra-ui/react'

export default function UISamples() {
  const colorBlocks = Object.entries(Colors)
    .filter(([key]) => key !== 'black' && key !== 'white')
    .map(([hue, value]) => {
      return (
        <Box
          key={hue}
          sx={{
            display: 'flex',
            gap: 1,
          }}
        >
          <Box width="80px">{hue}</Box>
          {Object.entries(value).map(([name, color]) => (
            <Box
              key={color}
              sx={{
                width: 50,
                height: 30,
                bg: color,
                color: Number(name) > 500 ? 'white' : 'black',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {name}
            </Box>
          ))}
        </Box>
      )
    })

  return (
    <VStack gap={3}>
      {colorBlocks}
      <HStack gap={1}>
        <Button variant="filled">Filled</Button>
        <Button variant="filled" isDisabled>
          disabled
        </Button>
      </HStack>
    </VStack>
  )
}
