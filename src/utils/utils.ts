import axios, { AxiosError } from 'axios'
import HttpStatusCode from 'src/constants/httpStatus'

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
