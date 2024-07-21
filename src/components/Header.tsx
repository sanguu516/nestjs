'use client'
import { IconSearch, IconProfile, IconTitle, ImageUser } from '@/assets/icons'

import UserContext from '@/providers/UserProvider'
import { Colors } from '@/styles/colors'
import { fontStyles } from '@/styles/font'
import { Box, Flex, IconButton, Link, Text } from '@chakra-ui/react'
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import { useContext, useState } from 'react'
import SearchBar from './search/SearchBar'

export default function Header() {
  const pathname = usePathname()

  const [isSearch, setIsSearch] = useState(false)

  const needSearchBar = pathname === '/' || pathname === '/real-estates'

  const { user } = useContext(UserContext)

  return (
    <Box as="header" top={0} zIndex={100} w="100%" maxW="inherit" bg={Colors.white}>
      {!isSearch ? (
        <Flex h={14} justify="space-between" align="center" p={5}>
          <Link as={NextLink} href="/" display="flex" alignItems="center" w={135}>
            <IconTitle width={80} height={16} />
          </Link>
          <Flex align="center" gap={2}>
            <IconSearch width={24} height={24} onClick={() => setIsSearch(!isSearch)} />
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
                <ImageUser width={28} height={28} style={{ borderRadius: '100%' }} />
              </IconButton>
            ) : (
              <Text
                as={NextLink}
                href="/auth/signin"
                sx={{ ...fontStyles.bold_12 }}
                color={Colors.new_gray[8]}
              >
                로그인
              </Text>
            )}
          </Flex>
        </Flex>
      ) : (
        <SearchBar setIsSearch={setIsSearch} />
      )}

      {/* {needSearchBar && <SearchBar />} */}
    </Box>
  )
}
