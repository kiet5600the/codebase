import { loginUrl } from '@/Api/Endpoints'
import { NetWorkService } from '@/Networking'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { HookLoginInterface } from '../Hooks/usePostLogin'
import type { LoginRequestParam } from '../requestTypes'
import type {
  LoginResponse,
  LoginValidationErrorsInterface,
} from '../responseTypes'

export interface PostLoginInterface extends HookLoginInterface {
  body: LoginRequestParam
}
export const postLogin = createAsyncThunk(
  'auth/login',
  async (
    { failureCallback, successCallback, body }: PostLoginInterface,
    { rejectWithValue, dispatch },
  ) => {
    try {
      const response: AxiosResponse<LoginResponse> = await NetWorkService.Post({
        url: loginUrl,
      })
      successCallback && successCallback(response.data)
      return response.data
    } catch (err) {
      const error = err as AxiosError<LoginValidationErrorsInterface>
      failureCallback && failureCallback(error)
      return rejectWithValue(error)
    }
  },
)
