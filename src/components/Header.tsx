import NextLink from 'next/link'
import { Flex, Link, Text } from '@chakra-ui/react'
import { fontStyles } from '@/styles/font'
import { Colors } from '@/styles/colors'
import { IconLogo, IconTitle } from '@/assets/icons'

export default function Header() {
  return (
    <Flex
      as="header"
      position="fixed"
      top={0}
      zIndex={1}
      justify="space-between"
      align="center"
      w="100%"
      h={16}
      maxW="inherit"
      p={4}
      bg={Colors.white}
    >
      <Link
        as={NextLink}
        href="/"
        display="flex"
        alignItems="center"
        w={135}
        _hover={{ textDecoration: 'none' }}
      >
        <IconLogo width={36} height={36} />
        <IconTitle width={80} height={16} />
      </Link>
      <Link as={NextLink} href="/auth/login" _hover={{ textDecoration: 'none' }}>
        <Text sx={{ ...fontStyles.LabelMd }} color={Colors.indigo[600]}>
          로그인
        </Text>
      </Link>
    </Flex>
  )
}
