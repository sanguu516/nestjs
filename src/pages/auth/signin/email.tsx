import React, { useContext, useState } from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useMutation } from '@tanstack/react-query'
import { Box, Checkbox, Flex, FormControl, Heading, Link, Text } from '@chakra-ui/react'

import CustomButton from '@/components/CustomButton'
import { UserContext } from '@/pages/_app'
import { SignupForm } from '@/pages/auth/signup'
import NavHeader from '@/components/NavHeader'
import { type ISigninForm, type SignInResponse, signIn } from '@/apis/authApis'

import { SIGNIN_FORM } from '@/utils/inputFormUtil'
import { StorageKey } from '@/utils/localStorageUtil'
import useCustomToast from '@/utils/useCustomToast'
import { validateAuth } from '@/utils/validate'

import { Colors } from '@/styles/colors'
import { fontStyles } from '@/styles/font'

const LOGIN_TITLE = '이메일 로그인'
const INIT_SIGNIN_FORM = { email: '', password: '' }

export default function Signin() {
  const [signinForm, setSigninForm] = useState<ISigninForm>(INIT_SIGNIN_FORM)
  const [isLoginKeep, setIsLoginKeep] = useState<boolean>(true)
  const { mutate: loginMutate } = useMutation<SignInResponse, Error, ISigninForm>({
    mutationFn: signIn,
  })
  const router = useRouter()

  const { setUser } = useContext(UserContext)
  const toast = useCustomToast()

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    loginMutate(signinForm, {
      onSuccess: (res) => {
        localStorage.setItem(StorageKey.aceessToken, res.access)
        localStorage.setItem(StorageKey.refreshToken, res.refresh)
        setUser(res.user)

        const { redirect } = router.query
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

  const handleLoginKeep: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setIsLoginKeep((prev) => !prev)
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
    <>
      <NavHeader />
      <Box display="grid" alignItems="center" alignContent="center" h="100%" px={4} pb={14}>
        <Heading
          as="h1"
          style={{ fontWeight: 800, fontSize: 24 }}
          textAlign="center"
          whiteSpace="pre-wrap"
        >
          {LOGIN_TITLE}
        </Heading>
        <FormControl as="form" display="grid" gap={2} my={14}>
          {SIGNIN_FORM.map((list) => (
            <SignupForm
              key={list.title}
              list={list}
              isInvalids={isInvalids}
              initializeValue={initSigninForm}
              setForm={setSigninForm}
              hasLabel={false}
            />
          ))}
          <CustomButton
            type="submit"
            variant="filled"
            size="lg"
            w="100%"
            onClick={handleSubmit}
            isDisabled={isBlank || isError}
          >
            로그인
          </CustomButton>
          <Checkbox
            id="signin-keep"
            checked={isLoginKeep}
            onChange={handleLoginKeep}
            mt={4}
            color={Colors.gray[400]}
            sx={{ ...fontStyles.BodySm }}
          >
            로그인 상태 유지
          </Checkbox>
        </FormControl>
        <Flex justify="center" align="center">
          <Text color={Colors.gray[400]} sx={{ ...fontStyles.BodySm }}>
            아직 별별부동산 회원이 아니신가요?
          </Text>
          <Link
            as={NextLink}
            href="/auth/signup"
            ml={4}
            color={Colors.indigo[600]}
            sx={{ ...fontStyles.LabelSm }}
          >
            회원가입하기
          </Link>
        </Flex>
      </Box>
    </>
  )
}
