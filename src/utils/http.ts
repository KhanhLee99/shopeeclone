import axios, { AxiosInstance, AxiosError } from 'axios'
import { toast } from 'react-toastify'

import HttpStatusCode from 'src/constants/httpStatus'
import PATH_API from 'src/constants/pathApi'
import { AuthResponse } from 'src/types/auth.type'
import { getAccessTokenFromLS, clearLS, saveAccessTokenToLS, saveProfileToLS } from './auth'

class Http {
  instance: AxiosInstance
  private accessToken: string
  constructor() {
    this.accessToken = getAccessTokenFromLS()
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_APP_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.authorization = this.accessToken
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
    // Add a response interceptor
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if (url === PATH_API.login || url === PATH_API.register) {
          const { data } = response.data as AuthResponse
          this.accessToken = data.access_token
          saveAccessTokenToLS(this.accessToken)
          saveProfileToLS(data.user)
        } else if (url === PATH_API.logout) {
          this.accessToken = ''
          clearLS()
        }
        return response
      },
      function (error: AxiosError) {
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          const errorMessage: string = (error.response?.data as any)?.message || error.message
          toast.error(errorMessage)
        }
        if (error.response?.status === HttpStatusCode.Unauthorized) {
          clearLS()
        }
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance
export default http
