import fetchHandler from './fetchHandler'

interface User {
  id: number
  email: string
  username: string
}

interface SignInResponse {
  access: string
  refresh: string
  user: User
}

export async function signIn({
  email,
  password,
}: {
  email: string
  password: string
}): Promise<SignInResponse> {
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
}: {
  username: string
  email: string
  password: string
  passwordConfirm: string
}): Promise<SignInResponse> {
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
}): Promise<SignInResponse> {
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
