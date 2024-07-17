'use client'
import { type ISignupForm, type SignInResponse, signUp } from '@/apis/authApis'
import CustomButton from '@/components/CustomButton'
import { SIGNUP_FORM } from '@/utils/inputFormUtil'
import { StorageKey } from '@/utils/localStorageUtil'
import useCustomToast from '@/utils/useCustomToast'
import { validateAuth } from '@/utils/validate'
import { Box, FormControl, Grid, Heading } from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useContext, useState } from 'react'
import UserContext from '@/providers/UserProvider'
import SignupForm from '@/components/SignUpForm'

const LOGIN_TITLE = '회원정보를 입력해주세요!'

const INIT_SIGNUP_FORM = {
  username: '',
  email: '',
  password: '',
  passwordConfirm: '',
  // tel:'',
}

export default function Signup() {
  const [signupForm, setSignupForm] = useState<ISignupForm>(INIT_SIGNUP_FORM)
  const { mutate: signupMutate } = useMutation<SignInResponse, Error, ISignupForm>({
    mutationFn: signUp,
  })
  const router = useRouter()
  const searchParams = useSearchParams()
  const { setUser } = useContext(UserContext)
  const toast = useCustomToast()

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    signupMutate(signupForm, {
      onSuccess: (res) => {
        localStorage.setItem(StorageKey.aceessToken, res.access)
        localStorage.setItem(StorageKey.refreshToken, res.refresh)
        setUser(res.user)

        const redirect = searchParams.get('redirect')
        const redirectPath =
          redirect && typeof redirect === 'string' ? decodeURIComponent(redirect) : '/'

        void router.replace(redirectPath)
      },
      onError: (error) => {
        if (error instanceof Error) {
          const EXITST_MSG = '이미 해당 이메일로 회원가입 되어있습니다.'
          const INVALID_MSG = '비밀번호는 8~20자의 영문자/숫자 조합으로 입력해주세요.'
          const message = error.message === 'ALREADY_EXISTS' ? EXITST_MSG : INVALID_MSG
          toast({
            title: message,
            status: 'error',
          })
        }
      },
    })
  }

  const isValidatePassword = validateAuth.password(signupForm.password, signupForm.passwordConfirm)
  const isValidateEmail = validateAuth.email(signupForm.email)
  const isValidateNickname = validateAuth.username(signupForm.username)
  const isInvalids: Record<string, boolean> = {
    email: !isValidateEmail,
    passwordConfirm: !isValidatePassword,
    username: !isValidateNickname,
  }
  const isError = Object.values(isInvalids).some((e) => e)

  const isBlank: boolean = Object.keys(signupForm).some((e) => {
    const key = e as keyof ISignupForm
    return signupForm[key] === ''
  })

  return (
    <Box display="grid" placeItems="center" alignContent="center" height="100%" mx={4}>
      <Heading
        as="h1"
        style={{ fontWeight: 800, fontSize: 24 }}
        noOfLines={2}
        whiteSpace="pre-wrap"
        textAlign="center"
        mb={16}
      >
        {LOGIN_TITLE}
      </Heading>
      <FormControl as="form">
        <Grid gap={6}>
          {SIGNUP_FORM.map((list) => (
            <SignupForm
              key={list.title}
              list={list}
              isInvalids={isInvalids}
              setForm={setSignupForm}
            />
          ))}
        </Grid>
        <CustomButton
          type="submit"
          variant="filled"
          size="lg"
          w="100%"
          mt={14}
          onClick={handleSubmit}
          isDisabled={isBlank || isError}
        >
          회원가입
        </CustomButton>
      </FormControl>
    </Box>
  )
}
