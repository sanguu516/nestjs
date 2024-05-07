import { IconHome, IconLocation, IconProfile } from '@/assets/icons'
import { fontStyles } from '@/styles/font'
import { Flex, Link, Text } from '@chakra-ui/react'
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import { cloneElement } from 'react'

const TAB_LIST = [
  {
    Icon: <IconHome />,
    label: '홈',
    link: '/',
  },
  {
    Icon: <IconLocation />,
    label: '지도',
    link: '/real-estates',
  },
  {
    Icon: <IconProfile />,
    label: '마이페이지',
    link: '/my-page',
  },
]

interface BottomTabProps {
  activeColor?: string
  inActiveColor: string
  backgroundColor: string
}

export default function BottomTab({ ...props }: BottomTabProps) {
  const pathname = usePathname()

  return (
    <Flex
      as="nav"
      justify="space-between"
      align="center"
      w="100%"
      h={20}
      maxW="inherit"
      p="8px 0"
      bg={props.backgroundColor}
      zIndex={100}
    >
      {TAB_LIST.map(({ Icon, label, link }) => {
        const isActive = pathname === link
        const color = isActive ? props.activeColor : props.inActiveColor
        return (
          <Link
            as={NextLink}
            key={link}
            href={link}
            w={120}
            h={46}
            display={'grid'}
            placeItems={'center'}
          >
            {cloneElement(Icon, { color, width: 24, height: 24 })}
            <Text sx={{ ...fontStyles.LabelSm }} color={color}>
              {label}
            </Text>
          </Link>
        )
      })}
    </Flex>
  )
}
