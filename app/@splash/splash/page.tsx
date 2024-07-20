import { Colors } from '@/styles/colors'
import { Box, Flex } from '@chakra-ui/react'

export default function page() {
  return (
    <Flex direction="column" height="100dvh" bg={Colors.white} maxW={480} margin="0 auto">
      <Box
        flexGrow={1}
        as="main"
        overflowY="auto"
        position="relative"
        sx={{ scrollbarWidth: 'none' }}
      ></Box>
    </Flex>
  )
}
