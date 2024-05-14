import { MMKV } from 'react-native-mmkv'
export const storage = new MMKV()

export enum storageMethod {
  String = 'string',
  Number = 'number',
  Boolean = 'boolean',
}

export const saveToStorage = (
  key: string,
  value: boolean | string | number,
): void => {
  storage.set(key, value)
}
export const getValueFromStorage = (method: string, key: string) => {
  switch (method) {
    case 'string':
      return storage.getString(key)
    case 'number':
      return storage.getNumber(key)
    case 'boolean':
      return storage.getBoolean(key)
    default:
      return storage.getBoolean(key)
  }
}

export const deleteKeyFromStorage = (key: string): void => {
  storage.delete(key)
}

export const getAllKey = (): void => {
  storage.getAllKeys()
}

export const deleteAllKey = (): void => {
  storage.clearAll()
}
