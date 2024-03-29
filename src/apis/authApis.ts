import fetchHandler from './fetchHandler'

export interface User {
  id: number
  email: string
  username: string
}

export interface SignInResponse {
  access: string
  refresh: string
  user: User
}

export interface ISigninForm {
  email: string
  password: string
}

// 전화번호 관련 코드 주석 처리
export type ISignupForm = {
  username: string
  email: string
  password: string
  passwordConfirm: string
  // tel:string
}

export async function signIn({ email, password }: ISigninForm): Promise<SignInResponse> {
  return fetchHandler('auth/login/', {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
    }),
  })
}

export async function signUp({
  username,
  email,
  password,
  passwordConfirm,
}: ISignupForm): Promise<SignInResponse> {
  return fetchHandler('auth/registration/', {
    method: 'POST',
    body: JSON.stringify({
      username,
      email,
      password1: password,
      password2: passwordConfirm,
    }),
  })
}

export function changePassword({
  newPassword,
  newPasswordConfirm,
}: {
  newPassword: string
  newPasswordConfirm: string
}) {
  return fetchHandler('auth/password/change/', {
    method: 'POST',
    body: JSON.stringify({
      new_password1: newPassword,
      new_password2: newPasswordConfirm,
    }),
  })
}

export function signOut() {
  return fetchHandler('auth/logout/', {
    method: 'POST',
  })
}
