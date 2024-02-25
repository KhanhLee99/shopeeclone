import http from 'src/utils/http'
import { AuthResponse } from 'src/types/auth.type'
import PATH_API from 'src/constants/pathApi'

const authApi = {
  registerAccount(body: { email: string; password: string }) {
    return http.post<AuthResponse>(PATH_API.register, body)
  },
  login(body: { email: string; password: string }) {
    return http.post<AuthResponse>(PATH_API.login, body)
  },
  logout() {
    return http.post<AuthResponse>(PATH_API.logout)
  }
}

export default authApi
