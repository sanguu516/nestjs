const EMAIL_REGEX =
  /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
const SPECIAL_REGEX = /[!@#$%^&*(),.?":{}|<>]/

export const validateAuth = {
  password: (password: string, passwordConfrim: string) => password === passwordConfrim,
  email: (email: string) => email === '' || EMAIL_REGEX.test(email),
  username: (nickname: string) => !SPECIAL_REGEX.test(nickname),
}
