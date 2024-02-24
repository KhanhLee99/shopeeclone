import http from 'src/utils/http'
import { AuthResponse } from 'src/types/auth.type'

export const registerAccount = (body: { email: string; password: string }) => http.post<AuthResponse>('/register', body)
