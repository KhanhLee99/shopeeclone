export const saveAccessTokenToLS = (access_token: string) => localStorage.setItem('access_token', access_token)
export const getAccessTokenFromLS = () => localStorage.getItem('access_token') || ''
export const removeAccessTokenFromLS = () => localStorage.removeItem('access_token')
