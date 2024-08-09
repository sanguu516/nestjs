'use client'

import { signOut } from '@/apis/authApis'
import { ImageUser } from '@/assets/icons'

import CustomButton from '@/components/CustomButton'
import { useUserStore } from '@/store/user'
import { Colors } from '@/styles/colors'
import { fontStyles } from '@/styles/font'
import { StorageKey } from '@/utils/localStorageUtil'
import { Box, Button, Center, Flex, Input, Spinner, Text, VStack } from '@chakra-ui/react'
import { useAuth } from 'app/my-page/AuthProvider'
import { useRouter } from 'next/navigation'

const InfoRow = ({
  label,
  value,
  buttonText,
}: {
  label: string
  value: string
  buttonText: string
}) => {
  return (
    <VStack gap={3} align="start" width="100%">
      <Text color={Colors.gray[400]} {...fontStyles.TitleSm}>
        {label}
      </Text>
      <Flex gap={2} width="100%">
        <Box flexGrow={1}>
          <Input
            width="100%"
            height="48px"
            variant="outline"
            borderColor={Colors.gray[300]}
            value={value}
            isDisabled
            maxW="unset"
          />
        </Box>
        <Button
          width="80px"
          variant="primary"
          color={Colors.gray[400]}
          bgColor={Colors.gray[100]}
          height="48px"
          disabled
        >
          {buttonText}
        </Button>
      </Flex>
    </VStack>
  )
}

const MyPage = () => {
  const { user, isCheckingAuth } = useAuth()
  const { setUser } = useUserStore()
  const router = useRouter()

  if (!user) {
    // TODO: 이 로직 다시 체크
    return null
  }

  if (!isCheckingAuth) {
    return (
      <Center>
        <Spinner />
      </Center>
    )
  }

  const handleSignout = async () => {
    try {
      await signOut()
    } finally {
      localStorage.removeItem(StorageKey.aceessToken)
      localStorage.removeItem(StorageKey.refreshToken)
      setUser(null)
      router.replace('/')
    }
  }

  const { username, email } = user

  return (
    <Center px={4} width="100%" height="100%">
      <Flex direction="column" align="center" justify="space-evenly" width="100%" height="100%">
        <VStack {...fontStyles.TitleLg} fontWeight={400}>
          <ImageUser width={80} height={80} />
          <Text>안녕하세요,</Text>
          <div>
            <Text as="span" fontWeight={700}>
              {username}
            </Text>
            <Text as="span">{' 님!'}</Text>
          </div>
        </VStack>
        <VStack width="100%" gap={6}>
          <InfoRow label="닉네임" value={username} buttonText="중복확인" />
          <InfoRow label="이메일" value={email} buttonText="연결완료" />
        </VStack>
        <VStack width="100%" gap={6}>
          <Flex justify="flex-end" width="100%">
            <Button onClick={handleSignout} variant="text">
              로그아웃
            </Button>
          </Flex>
          <CustomButton
            width="100%"
            variant="filled"
            size="lg"
            onClick={() => confirm('내 정보 수정을 제공하고 있지 않습니다')}
          >
            수정하기
          </CustomButton>
        </VStack>
      </Flex>
    </Center>
  )
}

export default MyPage
