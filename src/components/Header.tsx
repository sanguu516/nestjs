import { Box, Flex } from '@chakra-ui/react'

export default function Header() {
  return (
    <Flex justify={'space-between'} align={'center'} height={'5vh'} padding={'16px'}>
      <Box>Logo</Box>
      <Box>Icon</Box>
    </Flex>
  )
}
