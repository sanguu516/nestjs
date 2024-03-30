import { IconLogo, IconProfile, IconTitle } from '@/assets/icons'
import { UserContext } from '@/pages/_app'
import { Colors } from '@/styles/colors'
import { fontStyles } from '@/styles/font'
import { Box, Flex, IconButton, Link, Text } from '@chakra-ui/react'
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import { useContext } from 'react'
import SearchBar from './search/SearchBar'

export default function Header() {
  const pathname = usePathname()

  const needSearchBar = pathname === '/' || pathname === '/real-estates'

  const { user } = useContext(UserContext)

  return (
    <Box as="header" top={0} zIndex={100} w="100%" maxW="inherit" bg={Colors.white}>
      <Flex h={16} justify="space-between" align="center" p={4}>
        <Link as={NextLink} href="/" display="flex" alignItems="center" w={135}>
          <IconLogo width={36} height={36} />
          <IconTitle width={80} height={16} />
        </Link>
        {user ? (
          <IconButton
            aria-label="profile"
            variant="none"
            as={NextLink}
            href="/my-page"
            sx={{
              width: '40px',
              mr: -2,
            }}
          >
            <IconProfile width={24} height={24} />
          </IconButton>
        ) : (
          <Text
            as={NextLink}
            href="/auth/signin"
            sx={{ ...fontStyles.LabelMd }}
            color={Colors.indigo[600]}
          >
            로그인
          </Text>
        )}
      </Flex>
      {needSearchBar && <SearchBar />}
    </Box>
  )
}
