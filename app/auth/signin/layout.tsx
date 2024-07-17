'use client'

import { Box, Grid, Link } from '@chakra-ui/react'
import React from 'react'
import NavHeader from '@/components/NavHeader'
import { Colors } from '@/styles/colors'
import { fontStyles } from '@/styles/font'
import { IconTitle } from '@/assets/icons'

const LOGIN_TITLE = `솔직한 리뷰와 함께\n원하는 공인중개사를 탐색하세요`

export default function Signin({ children }: { children: React.ReactNode }) {
  return (
    <Grid h="100%" gridTemplateRows="auto 1fr">
      <NavHeader />
      <Box
        display="grid"
        alignItems="start"
        gridTemplateRows="min-content 1fr"
        h="100%"
        px={6}
        pt={16}
        pb={12}
      >
        <Link
          href="/"
          sx={{ ...fontStyles.medium_16 }}
          color={Colors.new_gray[8]}
          textAlign="center"
          whiteSpace="pre-wrap"
          display="flex"
          flexDir="column"
          alignItems="center"
          gap={6}
        >
          <IconTitle width={240} height={37} />
          {LOGIN_TITLE}
        </Link>
        {children}
      </Box>
    </Grid>
  )
}
