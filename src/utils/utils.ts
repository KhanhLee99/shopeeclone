import axios, { AxiosError } from 'axios'
import HttpStatusCode from 'src/constants/httpStatus'

export const isAxiosError = (error: unknown): error is AxiosError => {
  return axios.isAxiosError(error)
}

export const isErrorUnprocessableEntity = <T>(error: unknown): error is AxiosError<T> => {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}
