import http from 'src/utils/http'
import { AuthResponse } from 'src/types/auth.type'
import PATH_API from 'src/constants/pathApi';

export const registerAccount = (body: { email: string; password: string }) => http.post<AuthResponse>(PATH_API.register, body)
export const login = (body: { email: string; password: string }) => http.post<AuthResponse>(PATH_API.login, body)
export const logout = () => http.post<AuthResponse>(PATH_API.logout)