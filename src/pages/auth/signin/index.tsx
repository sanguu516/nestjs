import NextLink from 'next/link'
import { Flex, Link } from '@chakra-ui/react'
import CustomButton from '@/components/CustomButton'
import { Colors } from '@/styles/colors'
import { fontStyles } from '@/styles/font'
import { IconKakaoLogo, IconLogo, IconTitle } from '@/assets/icons'

export default function Signin() {
  return (
    <Flex flexDirection="column" justifyContent="space-around" h="100%" px={4}>
      <Flex justifyContent="space-evenly" alignItems="center" alignSelf="center" w={194} h={70}>
        <IconLogo width={50} height={50} />
        <IconTitle width={116} height={24} />
      </Flex>
      <Flex gap={4} flexDirection="column">
        <Link as={NextLink} href={process.env.NEXT_KAKAO_AUTH_URL ?? ''}>
          <CustomButton
            variant="filled"
            size="lg"
            w="100%"
            h={12}
            background={Colors.kakao.bg}
            color={Colors.kakao.text}
          >
            <Flex gap={2}>
              <IconKakaoLogo width={18} height={18} />
              카카오로 로그인
            </Flex>
          </CustomButton>
        </Link>
        <Link as={NextLink} href="/auth/signin/email">
          <CustomButton variant="filled" size="lg" w="100%" h={12}>
            이메일로 로그인
          </CustomButton>
        </Link>
        <Flex justifyContent="space-between">
          <Link
            as={NextLink}
            href="/auth/signup"
            color={Colors.gray[400]}
            p={2}
            sx={{ ...fontStyles.LabelSm }}
          >
            회원가입하기
          </Link>
          <Flex gap={1}>
            <Link
              as={NextLink}
              href="/auth/find-account"
              color={Colors.gray[400]}
              p={2}
              sx={{ ...fontStyles.LabelSm }}
            >
              아이디찾기
            </Link>
            <Link
              as={NextLink}
              href="/auth/find-password"
              color={Colors.gray[400]}
              p={2}
              sx={{ ...fontStyles.LabelSm }}
            >
              비밀번호 찾기
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}