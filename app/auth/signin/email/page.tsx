'use client'

import { Center, Divider, Flex, FormControl, Box, Link } from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'
import NextLink from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useContext, useState } from 'react'

import CustomButton from '@/components/CustomButton'

import { signIn, type ISigninForm, type SignInResponse } from '@/apis/authApis'
import { SignupForm } from '@/components/temp/auth/signup'

import { SIGNIN_FORM } from '@/utils/inputFormUtil'
import { StorageKey } from '@/utils/localStorageUtil'
import useCustomToast from '@/utils/useCustomToast'
import { validateAuth } from '@/utils/validate'

import UserContext from '@/providers/UserProvider'
import { Colors } from '@/styles/colors'
import { fontStyles } from '@/styles/font'

const INIT_SIGNIN_FORM = { email: '', password: '' }

export default function Signin() {
  const [signinForm, setSigninForm] = useState<ISigninForm>(INIT_SIGNIN_FORM)
  const { mutate: loginMutate } = useMutation<SignInResponse, Error, ISigninForm>({
    mutationFn: signIn,
  })
  const router = useRouter()
  const searchParams = useSearchParams()

  const { setUser } = useContext(UserContext)
  const toast = useCustomToast()

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    loginMutate(signinForm, {
      onSuccess: (res) => {
        localStorage.setItem(StorageKey.aceessToken, res.access)
        localStorage.setItem(StorageKey.refreshToken, res.refresh)
        setUser(res.user)
        const redirect = searchParams.get('redirect')

        const redirectPath =
          redirect && typeof redirect === 'string' ? decodeURIComponent(redirect) : '/'

        void router.replace(redirectPath)
      },
      onError: () => {
        toast({
          title: '이메일, 비밀번호가 일치하지 않습니다.',
          status: 'error',
        })
      },
    })
  }

  const initSigninForm = () => {
    setSigninForm(INIT_SIGNIN_FORM)
  }

  const handleClickSignupButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    router.push('/auth/signup')
  }

  const isValidateEmail = validateAuth.email(signinForm.email)
  const isInvalids: Record<string, boolean> = {
    email: !isValidateEmail,
  }
  const isError = Object.values(isInvalids).some((e) => e)

  const isBlank: boolean = Object.keys(signinForm).some((e) => {
    const key = e as keyof ISigninForm
    return signinForm[key] === ''
  })

  return (
    <Box>
      <FormControl as="form" display="grid" gap={3} mt={16} mb={4}>
        {SIGNIN_FORM.map((list) => (
          <SignupForm
            key={list.title}
            list={list}
            isInvalids={isInvalids}
            setForm={setSigninForm}
            hasLabel={false}
          />
        ))}
        <CustomButton
          type="submit"
          variant="primary"
          size="lg"
          w="100%"
          mt={10}
          onClick={handleSubmit}
          isDisabled={isBlank || isError}
        >
          로그인
        </CustomButton>
        <CustomButton
          type="submit"
          variant="secondary"
          size="lg"
          w="100%"
          onClick={handleClickSignupButton}
        >
          회원가입
        </CustomButton>
      </FormControl>
      <Flex justify="center" align="center">
        <Link
          as={NextLink}
          href="/auth/signup"
          ml={4}
          color={Colors.new_gray[8]}
          sx={{ ...fontStyles.medium_14 }}
        >
          아이디 찾기
        </Link>
        <Center height="12px" mx={3}>
          <Divider orientation="vertical" color={Colors.new_gray[5]} />
        </Center>
        <Link
          as={NextLink}
          href="/auth/signup"
          color={Colors.new_gray[8]}
          sx={{ ...fontStyles.medium_14 }}
        >
          비밀번호 찾기
        </Link>
      </Flex>
    </Box>
  )
}
