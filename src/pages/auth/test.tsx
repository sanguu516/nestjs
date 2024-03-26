import { changePassword, signIn, signOut, signUp } from '@/apis/authApis'
import { StorageKey } from '@/utils/localStorageUtil'
import { Button, Input, Radio, RadioGroup, VStack } from '@chakra-ui/react'
import { useState } from 'react'

type Mode = 'login' | 'register' | 'change-password'

function AuthTest() {
  const [username, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [mode, setMode] = useState<Mode>('login')

  const handleClick = async () => {
    switch (mode) {
      case 'login':
        try {
          const signInResponse = await signIn({ email, password })
          localStorage.setItem(StorageKey.aceessToken, signInResponse.access)
          localStorage.setItem(StorageKey.refreshToken, signInResponse.refresh)
          console.log(signInResponse)
        } catch (e) {
          console.error(e)
        }
        break
      case 'register':
        const signUpResponse = await signUp({
          email,
          password,
          username,
          passwordConfirm: confirmPassword,
        })

        console.log(signUpResponse)
        localStorage.setItem(StorageKey.aceessToken, signUpResponse.access)
        localStorage.setItem(StorageKey.refreshToken, signUpResponse.refresh)

        break
      case 'change-password':
        const changePasswordResult = await changePassword({
          newPassword: password,
          newPasswordConfirm: confirmPassword,
        })
        console.log(changePasswordResult)
        break
    }
  }

  return (
    <div>
      <RadioGroup
        onChange={(e) => {
          setMode(e as Mode)
        }}
        value={mode}
      >
        <VStack>
          <Radio value="login">Login</Radio>
          <Radio value="register">Signup</Radio>
          <Radio value="change-password">Change Password</Radio>
        </VStack>
      </RadioGroup>

      <VStack m={3}>
        {mode === 'register' && (
          <Input
            placeholder="username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
        )}
        {mode !== 'change-password' && (
          <Input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        )}
        <Input
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {mode !== 'login' && (
          <Input
            placeholder="confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}
        <Button onClick={handleClick}>
          {mode === 'login' ? 'Login' : mode === 'register' ? 'Register' : 'Change Password'}
        </Button>
        <Button
          onClick={async () => {
            await signOut()
            localStorage.removeItem(StorageKey.aceessToken)
            localStorage.removeItem(StorageKey.refreshToken)
          }}
        >
          SIGN OUT
        </Button>
      </VStack>
    </div>
  )
}

export default AuthTest
