export interface CreateAccountRequestParam {
  firstName: string
  lastName: string
  email: string
  password: string
  mobile: string
  mobileVerified: boolean
}

export interface LoginRequestParam {
  email?: string
  password?: string
}
