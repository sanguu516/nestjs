'use client'

import BottomTab from '@/components/BottomTab'
import Header from '@/components/Header'
import { Colors } from '@/styles/colors'
import { pretendard } from '@/styles/font'
import '@/styles/globals.css'
import { Box, Flex } from '@chakra-ui/react'
import { usePathname } from 'next/navigation'

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname() || ''
  const needFixedLayout = ['/', '/real-estates', '/my-page'].includes(pathname)
  return (
    <Box className={pretendard.className}>
      <Flex direction="column" height="100dvh" bg={Colors.white} maxW={480} margin="0 auto">
        {needFixedLayout && <Header />}
        <Box
          flexGrow={1}
          as="main"
          overflowY="auto"
          position="relative"
          sx={{ scrollbarWidth: 'none' }}
        >
          {children}
        </Box>
        {needFixedLayout && (
          <BottomTab
            backgroundColor={Colors.indigo[600]}
            activeColor={Colors.white}
            inActiveColor={Colors.indigo[300]}
          />
        )}
      </Flex>
    </Box>
  )
}

export default ClientLayout
