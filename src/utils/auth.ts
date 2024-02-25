import { User } from 'src/types/user.type'

export const saveAccessTokenToLS = (access_token: string) => {
  localStorage.setItem('access_token', access_token)
}
export const getAccessTokenFromLS = () => localStorage.getItem('access_token') || ''

export const clearLS = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('profile')
}

export const saveProfileToLS = (profile: User) => {
  localStorage.setItem('profile', JSON.stringify(profile))
}

export const getProfileFromLS = (): User | null => {
  const profile = localStorage.getItem('profile')
  return profile ? JSON.parse(profile) : null
}
