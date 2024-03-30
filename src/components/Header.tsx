import { IconLogo, IconTitle } from '@/assets/icons'
import { Colors } from '@/styles/colors'
import { fontStyles } from '@/styles/font'
import { Box, Flex, Link, Text } from '@chakra-ui/react'
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import SearchBar from './search/SearchBar'

export default function Header() {
  const pathname = usePathname()

  const needSearchBar = pathname === '/' || pathname === '/real-estates'

  return (
    <Box as="header" top={0} zIndex={100} w="100%" maxW="inherit" bg={Colors.white}>
      <Flex h={16} justify="space-between" align="center" p={4}>
        <Link as={NextLink} href="/" display="flex" alignItems="center" w={135}>
          <IconLogo width={36} height={36} />
          <IconTitle width={80} height={16} />
        </Link>
        <Link as={NextLink} href="/auth/signin">
          <Text sx={{ ...fontStyles.LabelMd }} color={Colors.indigo[600]}>
            로그인
          </Text>
        </Link>
      </Flex>
      {needSearchBar && <SearchBar />}
    </Box>
  )
}
