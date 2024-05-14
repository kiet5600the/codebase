export interface CreateAccountResponse {
  id: string
  firstName: string
  lastName: string
  mobile: string
  email: string
  wrsId?: any
  createdAt: string
  lastModified: string
}

export interface CreateAccountValidationErrorsInterface {
  errors: any
}

export interface LoginResponse {
  access_token: string
}
export interface LoginValidationErrorsInterface {
  errors: any
}
