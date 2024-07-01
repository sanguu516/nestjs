/* eslint-disable @typescript-eslint/no-explicit-any */
import { signUp, type ISignupForm, type SignInResponse } from '@/apis/authApis'
import CustomButton from '@/components/CustomButton'
import CustomInput from '@/components/CustomInput'
import UserContext from '@/providers/UserProvider'
import { Colors } from '@/styles/colors'
import { fontStyles } from '@/styles/font'
import { SIGNUP_FORM, type SignFormList } from '@/utils/inputFormUtil'
import { StorageKey } from '@/utils/localStorageUtil'
import useCustomToast from '@/utils/useCustomToast'
import { validateAuth } from '@/utils/validate'
import { Box, FormControl, FormLabel, Grid, Heading } from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import React, { useCallback, useContext, useState } from 'react'

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
  const { setUser } = useContext(UserContext)
  const toast = useCustomToast()

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    signupMutate(signupForm, {
      onSuccess: (res) => {
        localStorage.setItem(StorageKey.aceessToken, res.access)
        localStorage.setItem(StorageKey.refreshToken, res.refresh)
        setUser(res.user)

        const { redirect } = router.query
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

export function SignupForm({
  list: { title, forms },
  isInvalids,
  setForm,
  hasLabel = true,
}: {
  list: SignFormList
  isInvalids: Record<string, boolean>
  setForm: React.Dispatch<React.SetStateAction<any>>
  hasLabel?: boolean
}) {
  const onChange: React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setForm((prev: any) => ({ ...prev, [e.target.name]: e.target.value }))
  }, [])

  return (
    <Box>
      {hasLabel && (
        <FormLabel color={Colors.gray[400]} sx={{ ...fontStyles.TitleSm }} mb={4}>
          {title}
        </FormLabel>
      )}
      <Grid gap={2}>
        {forms.map((form) => {
          const initializeValue = () => {
            setForm((prev: any) => ({ ...prev, [form.name]: '' }))
          }

          return (
            <CustomInput
              id={form.name}
              key={form.name}
              name={form.name}
              type={form.type}
              placeholder={form.placeholder}
              supportingText={form?.supportingText}
              onChange={onChange}
              isSensitive={form.isSensitive}
              isInvalid={!!isInvalids[form.name] ?? false}
              initializeValue={initializeValue}
              w="100%"
            />
          )
        })}
      </Grid>
    </Box>
  )
}
