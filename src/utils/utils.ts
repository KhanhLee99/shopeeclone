import { FieldErrors } from 'react-hook-form'
import axios, { AxiosError } from 'axios'

import HttpStatusCode from 'src/constants/httpStatus'
import userImage from 'src/assets/avt-default.jpg'
import URLs from 'src/constants/url'
import i18n, { NS_RULES } from 'src/i18n/i18n'

export const isAxiosError = (error: unknown): error is AxiosError => {
  return axios.isAxiosError(error)
}

export const isErrorUnprocessableEntity = <T>(error: unknown): error is AxiosError<T> => {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}

export function formatCurrency(currency: number) {
  return new Intl.NumberFormat('de-DE').format(currency)
}

export function formatNumberToSocialStyle(value: number) {
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1
  })
    .format(value)
    .replace('.', ',')
    .toLowerCase()
}

export const rateSale = (original: number, sale: number) => Math.round(((original - sale) / original) * 100) + '%'

const removeSpecialCharacter = (str: string) =>
  str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, '')

export const generateNameId = ({ name, id }: { name: string; id: string }) => {
  return removeSpecialCharacter(name).replace(/\s/g, '-') + `-i-${id}`
}

export const pathToProductDetail = ({ name, id }: { name: string; id: string }) => {
  return `${URLs.productList}${generateNameId({ name, id })}`
}

export const getIdFromNameId = (nameId: string) => {
  const arr = nameId.split('-i-')
  return arr[arr.length - 1]
}

export const getAvatarUrl = (avatarName?: string) => {
  const baseUrl = import.meta.env.VITE_APP_BASE_URL
  return avatarName ? `${baseUrl}images/${avatarName}` : userImage
}

export const renderErrorMessage = <T>(errors: FieldErrors<{ [K in keyof T]: T[K] }>, field: keyof T): string => {
  if (errors[field]?.type === 'Server') {
    return errors[field]?.message as string
  }
  return errors[field]?.message ? i18n.t(`${NS_RULES}:${errors[field]?.message}`) : ''
}
