/* eslint-disable @typescript-eslint/no-explicit-any */
import { type ISignupForm, type SignInResponse, signUp } from '@/apis/authApis'
import { ApiError } from '@/apis/fetchHandler'
import CustomButton from '@/components/CustomButton'
import CustomInput from '@/components/CustomInput'
import { Colors } from '@/styles/colors'
import { fontStyles } from '@/styles/font'
import { SIGNUP_FORM, type SignFormList } from '@/utils/inputFormUtil'
import { StorageKey } from '@/utils/localStorageUtil'
import { validateAuth } from '@/utils/validate'
import { Box, FormControl, FormLabel, Heading, useToast } from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import React, { useCallback, useContext, useState } from 'react'
import { UserContext } from '../_app'

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
  const toast = useToast()

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
      onError: (e) => {
        let detail = ''
        if (e instanceof ApiError && e.extra) {
          const details = Object.values(e.extra).map((value) => {
            if (typeof value === 'string') {
              return value
            } else if (Array.isArray(value) && value[0] && typeof value[0] === 'string') {
              return value[0]
            }
          })
          detail = details[0] ?? ''
        }
        toast({
          description:
            detail || e.message || '알 수 없는 에러가 발생하였습니다. 다시 시도해 주세요.',
          status: 'error',
        })
      },
    })
  }

  const initSignupForm = () => {
    setSignupForm(INIT_SIGNUP_FORM)
  }

  const isValidatePassword = validateAuth.password(signupForm.password, signupForm.passwordConfirm)
  const isValidateEmail = validateAuth.email(signupForm.email)
  const isInvalids: Record<string, boolean> = {
    email: !isValidateEmail,
    passwordConfirm: !isValidatePassword,
  }
  const isError = Object.values(isInvalids).some((e) => e)

  const isBlank: boolean = Object.keys(signupForm).some((e) => {
    const key = e as keyof ISignupForm
    return signupForm[key] === ''
  })

  const initializeValue = initSignupForm

  return (
    <Box display="grid" placeItems="center" height="100%" mx={4}>
      <Heading
        as="h1"
        style={{ fontWeight: 800, fontSize: 24 }}
        noOfLines={2}
        whiteSpace="pre-wrap"
        textAlign="center"
        mb={12}
      >
        {LOGIN_TITLE}
      </Heading>
      <FormControl as="form">
        {SIGNUP_FORM.map((list) => (
          <SignupForm
            key={list.title}
            list={list}
            isInvalids={isInvalids}
            setForm={setSignupForm}
            initializeValue={initializeValue}
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
  initializeValue,
}: {
  list: SignFormList
  isInvalids: Record<string, boolean>
  setForm: React.Dispatch<React.SetStateAction<any>>
  initializeValue: () => void
}) {
  const onChange: React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setForm((prev: any) => ({ ...prev, [e.target.name]: e.target.value }))
  }, [])

  return (
    <Box mb={10}>
      <FormLabel color={Colors.gray[400]} sx={{ ...fontStyles.TitleSm }} mb={4}>
        {title}
      </FormLabel>
      {forms.map((form) => {
        return (
          <CustomInput
            id={form.name}
            key={form.name}
            name={form.name}
            type={form.type}
            placeholder={form.placeholder}
            supportingText={form?.supportingText}
            initializeValue={initializeValue}
            onChange={onChange}
            isSensitive={form.isSensitive}
            isInvalid={!!isInvalids[form.name] ?? false}
            w="100%"
            mt={3}
          />
        )
      })}
    </Box>
  )
}
