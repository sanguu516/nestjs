'use client'

import { IconKakaoLogo } from '@/assets/icons'
import CustomButton from '@/components/CustomButton'
import { Colors } from '@/styles/colors'
import { Flex, Link, Text } from '@chakra-ui/react'
import NextLink from 'next/link'

export default function Signin() {
  const callback_url = `${process.env.NEXT_PUBLIC_URL}/oauth/kakao`
  const KAKAO_OAUTH_URL = `${process.env.NEXT_PUBLIC_REA_API_URL}social-account/kakao/login/?callback_url=${callback_url}`

  return (
    <Flex gap={4} flexDirection="column" mt="auto">
      <a href={KAKAO_OAUTH_URL}>
        <CustomButton
          variant="filled"
          size="lg"
          w="100%"
          h={12}
          background={Colors.kakao.bg}
          color={Colors.kakao.text}
        >
          <IconKakaoLogo width={18} height={18} />
          <Text ml={2}>카카오 로그인</Text>
        </CustomButton>
      </a>
      <Link as={NextLink} href="/auth/signin/email">
        <CustomButton variant="primary" size="lg" w="100%" h={12}>
          이메일 로그인
        </CustomButton>
      </Link>
    </Flex>
  )
}
