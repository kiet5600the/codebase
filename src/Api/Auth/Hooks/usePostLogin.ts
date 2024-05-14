import { AppDispatch, RootState } from '@/Store'
import { AxiosError } from 'axios'
import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postLogin } from '../Requests'
import { LoginRequestParam } from '../requestTypes'
import { LoginResponse } from '../responseTypes'

export interface HookLoginInterface {
  failureCallback?: (err: AxiosError) => void
  successCallback?: (data: LoginResponse) => void
}

type ReturnDataType = {
  isLoading: boolean
  isError: boolean
  responseData: null | LoginResponse
  runRequest: (data: LoginRequestParam) => void
}

export const usePostLogin: (args: HookLoginInterface) => ReturnDataType = ({
  failureCallback: componentFailureCallback,
  successCallback: componentSuccessCallback,
}) => {
  const isLoading = useSelector((state: RootState) => state.auth.loadingLogin)
  const [isError, setIsError] = useState<boolean>(false)
  const [responseData, setResponseData] = useState<null | LoginResponse>(null)
  const dispatch = useDispatch<AppDispatch>()

  const runRequest = useCallback(
    (body: LoginRequestParam) => {
      setIsError(false)
      dispatch(
        postLogin({
          body,
          failureCallback: err => {
            setIsError(true)
            componentFailureCallback && componentFailureCallback(err)
          },
          successCallback: data => {
            setResponseData(data)
            componentSuccessCallback && componentSuccessCallback(data)
          },
        }),
      )
    },
    [componentFailureCallback, componentSuccessCallback, dispatch],
  )

  const returnObject: ReturnDataType = {
    isLoading,
    isError,
    runRequest,
    responseData,
  }

  return returnObject
}
