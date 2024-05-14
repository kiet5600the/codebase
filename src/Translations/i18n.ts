import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import * as resources from './resources'
import {
  getValueFromStorage,
  saveToStorage,
  storageMethod,
} from '@/Common/Storage'
import * as RNLocalize from 'react-native-localize'

const STORE_LANGUAGE_KEY = 'settings.lang'

const languageDetectorPlugin: any = {
  type: 'languageDetector',
  async: true,
  init: () => {},
  detect: function (callback: (lang: string) => void) {
    try {
      const locales = RNLocalize.getLocales()
      //get stored language from Async storage
      const language = getValueFromStorage(
        storageMethod.String,
        STORE_LANGUAGE_KEY,
      ) as string
      if (language) {
        //if language was stored before, use this language in the app
        return callback(language)
      } else {
        //if language was not stored yet, use device's locale
        return callback(locales[0].languageCode)
      }
    } catch (error) {
      console.log('Error reading language', error)
    }
  },
  cacheUserLanguage: function (language: string) {
    saveToStorage(STORE_LANGUAGE_KEY, language)
  },
}

i18n
  .use(initReactI18next)
  .use(languageDetectorPlugin)
  .init({
    compatibilityJSON: 'v3',
    resources: {
      ...Object.entries(resources).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]: {
            translation: value,
          },
        }),
        {},
      ),
    },
    lng: 'en',
  })

export default i18n
