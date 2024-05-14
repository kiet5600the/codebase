import { StyleSheet } from 'react-native'
import { authActions } from '@/Store/Slices'
import { dispatch, getState } from '@/Store/utils'
import Axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  Method,
} from 'axios'
import { TIME_OUT } from './ApiCode'
import { ParamsNetwork, ResponseBase } from './type'

const TOKEN_HEADER = 'authorization'

const AxiosInstance = Axios.create({})

let CANCEL_TOKEN_SOURCE = Axios.CancelToken.source()

const generateNewCancelTokenSource = () => {
  CANCEL_TOKEN_SOURCE = Axios.CancelToken.source()
}

export const finishPendingRequests = () => {
  CANCEL_TOKEN_SOURCE.cancel('RouteChange')
  generateNewCancelTokenSource()
}

export const handleParameter = <T extends ParamsNetwork>(
  props: T,
  method: Method,
): AxiosRequestConfig & ParamsNetwork => {
  const { url, body, params, baseUrl } = props
  return {
    ...props,
    method,
    url,
    data: body,
    params,
    baseUrl,
  }
}

AxiosInstance.interceptors.response.use(
  response => response,
  async function (error) {
    const originalRequest = error.config
    if (
      error &&
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      // bug that retry not set to true
      originalRequest._retry = true
      const newToken: any | null = await refreshToken()
      if (newToken === null) {
        return Promise.reject(error)
      }
      dispatch(authActions.onSetToken(newToken))
      // If using Bearer`Bearer ${newToken.access_token}`;
      originalRequest.headers[TOKEN_HEADER] = newToken.access_token
      return AxiosInstance(originalRequest)
    }
    return Promise.reject(error)
  },
)

// refresh token
const refreshToken = async (): Promise<any | null> => {
  const { refresh_token } = getState('auth')
  const { env } = getState('app')
  const headers: AxiosRequestConfig['headers'] = {
    'Content-Type': 'multipart/form-data',
  }
  return AxiosInstance.post(
    'oauth/token',
    {
      refresh_token: refresh_token,
      grant_type: 'refresh_token',
      client_secret: env.CLIENT_SECRET,
      client_id: env.CLIENT_ID,
    },
    { headers },
  )
    .then((res: AxiosResponse) => res.data)
    .catch(() => null)
}

// base
function Request<T = Record<string, unknown>>(
  config: AxiosRequestConfig & ParamsNetwork,
) {
  const { env } = getState('app')
  const { access_token } = getState('auth')
  console.log(
    'endpoint: ',
    `${config.baseUrl ? config.baseUrl : env?.API_URL}${config.url}`,
  )
  const defaultConfig: AxiosRequestConfig = {
    baseURL: env?.API_URL,
    timeout: TIME_OUT,
    headers: {
      'Content-Type': 'application/json',
      [TOKEN_HEADER]: access_token ? `Bearer ${access_token}` : '',
    },
  }

  return new Promise<T>((rs, rj) => {
    AxiosInstance.request(StyleSheet.flatten([defaultConfig, config]))
      .then((res: AxiosResponse<T>) => {
        return rs(res.data)
      })
      .catch((error: AxiosError) => {
        let err
        if (error && error.response) {
          err = error.response
          if (error.response.status === 401) {
            // Show message dialog with force logout
          }
          // Show message dialog
        } else {
          err = 'Network Error'
          // Show message dialog
        }
        rj(err)
      })
  })
}

// get
async function Get<T>(params: ParamsNetwork) {
  return Request<T>(handleParameter(params, 'GET'))
}

// post
async function Post<T>(params: ParamsNetwork) {
  return Request<T>(handleParameter(params, 'POST'))
}

// post FormData
async function PostFormData<T>(params: ParamsNetwork) {
  const headers: AxiosRequestConfig['headers'] = {
    'Content-Type': 'multipart/form-data',
  }
  return Request<T>(handleParameter({ ...params, headers }, 'POST'))
}

// put
async function Put<T>(params: ParamsNetwork) {
  return Request<T>(handleParameter(params, 'PUT'))
}

// delete
async function Delete<T>(params: ParamsNetwork) {
  return Request<T>(handleParameter(params, 'DELETE'))
}
export type NetWorkResponseType<T> = (
  params: ParamsNetwork,
) => Promise<ResponseBase<T> | null>

export const NetWorkService = {
  Get,
  Post,
  Put,
  Delete,
  PostFormData,
  Request,
}
