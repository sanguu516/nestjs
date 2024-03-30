import { type ISigninForm, type SignInResponse, signIn } from '@/apis/authApis'
import CustomButton from '@/components/CustomButton'
import { Colors } from '@/styles/colors'
import { fontStyles } from '@/styles/font'
import { SIGNIN_FORM } from '@/utils/inputFormUtil'
import { StorageKey } from '@/utils/localStorageUtil'
import { validateAuth } from '@/utils/validate'
import { Box, Checkbox, Flex, FormControl, Heading, Link, Text } from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext, useState } from 'react'
import { UserContext } from '../_app'
import { SignupForm } from './signup'

const LOGIN_TITLE = '나만의 솔직한 리뷰를\n작성해보세요!'

const INIT_SIGNIN_FORM = { email: '', password: '' }

export default function Signin() {
  const [signinForm, setSigninForm] = useState<ISigninForm>(INIT_SIGNIN_FORM)
  const [isLoginKeep, setIsLoginKeep] = useState<boolean>(true)
  const { mutate: loginMutate } = useMutation<SignInResponse, Error, ISigninForm>({
    mutationFn: signIn,
  })
  const router = useRouter()

  const { setUser } = useContext(UserContext)

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    loginMutate(signinForm, {
      onSuccess: (res) => {
        localStorage.setItem(StorageKey.aceessToken, res.access)
        localStorage.setItem(StorageKey.refreshToken, res.refresh)
        setUser(res.user)
        void router.replace('/')
      },
      onError: (e) => {
        console.error(e)
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
    <Box display="grid" alignItems="center" h="100%" px={4}>
      <Heading
        as="h1"
        style={{ fontWeight: 800, fontSize: 24 }}
        noOfLines={2}
        textAlign="center"
        whiteSpace="pre-wrap"
      >
        {LOGIN_TITLE}
      </Heading>
      <FormControl as="form" my={14}>
        {SIGNIN_FORM.map((list) => (
          <SignupForm
            key={list.title}
            list={list}
            isInvalids={isInvalids}
            initializeValue={initSigninForm}
            setForm={setSigninForm}
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
  )
}
