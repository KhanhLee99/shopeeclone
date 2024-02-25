import { User } from './user.type'
import { SuccessResponse } from './utils.type'

export type AuthResponse = SuccessResponse<{
  access_token: string
  expires: number
  user: User
  refresh_token: string
  expires_refresh_token: number
}>
