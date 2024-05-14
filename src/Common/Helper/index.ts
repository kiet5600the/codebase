import { get } from 'lodash'

const customGet = (
  val: object,
  path: string[] = [],
  defaultValue: any = undefined,
) => {
  const result = get(val, path, defaultValue)
  if (typeof result === 'object' && !result) {
    return defaultValue
  }
  return result
}

export const helper = {
  get: customGet,
}
