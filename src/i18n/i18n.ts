import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from 'src/locales/en/index.json'
import rules_en from 'src/locales/en/rules.json'
import vi from 'src/locales/vi/index.json'
import rules_vi from 'src/locales/vi/rules.json'

export const NS_RULES = 'rules'

const resources = {
  vi: {
    translation: vi,
    [NS_RULES]: rules_vi
  },
  en: {
    translation: en,
    [NS_RULES]: rules_en
  }
} as const

i18n.use(initReactI18next).init({
  resources,
  lng: 'vi', // if you're using a language detector, do not define the lng option
  fallbackLng: 'vi',
  ns: ['translation', NS_RULES],
  interpolation: {
    escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
  }
})

export default i18n

export type Langs = 'en' | 'vi'

export const locales: { [key in Langs]: string } = {
  en: 'English',
  vi: 'Tiếng Việt'
} as const
