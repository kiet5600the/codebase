import { ERROR_NETWORK_CODE, ERROR_NOT_FOUND } from '@/Networking/ApiCode'
import { ResponseBase } from '@/Networking/type'
import { translate } from '@/Translations'

const handleData = (responseError: ResponseBase<null>) => {
  return responseError
}

export const handleErrorApi = (status: number, data: any) => {
  if (data === null) {
    return handleData({
      code: ERROR_NETWORK_CODE,
      msg: translate('error:haveError'),
      data: null,
      status: false,
    })
  }
  switch (status) {
    case ERROR_NOT_FOUND:
      return handleData({
        code: status,
        msg: translate('error:400'),
        data: null,
        status: false,
      })
    default:
      return handleData({
        code: status,
        msg: data.message,
        data: null,
        status: false,
      })
  }
}
