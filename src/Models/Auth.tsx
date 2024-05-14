export interface AuthState {
  loadingLogin: boolean
  access_token: string | null
  refresh_token: string | null
  user_info: any
}
