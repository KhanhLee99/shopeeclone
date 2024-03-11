import { describe, expect, it } from 'vitest'
import { AxiosError } from 'axios'

import HttpStatusCode from 'src/constants/httpStatus'
import PATH_API from 'src/constants/pathApi'
import http from '../http'

describe('Http Axios', () => {
  // Test get api without access token
  it('Test api get Product List', async () => {
    const res = await http.get(PATH_API.products)
    expect(res.status).toBe(HttpStatusCode.Ok)
  })

  // Test api login success
  it('Test api login success', async () => {
    const res = await http.post(PATH_API.login, {
      email: 'vkhang542@gmail.com',
      password: '123456'
    })
    expect(res.status).toBe(HttpStatusCode.Ok)
  })

  // Test api login fail
  it('Test api login fail return status code 422', async () => {
    await http
      .post(PATH_API.login, {
        email: 'vkhang542@gmail.com',
        password: '1234567' // password wrong
      })
      .catch((error: AxiosError) => {
        expect(error.response?.status).toBe(HttpStatusCode.UnprocessableEntity)
      })
  })

  // Test api need access token
  it('Test api get me success', async () => {
    await http.post(PATH_API.login, {
      email: 'vkhang542@gmail.com',
      password: '123456'
    })
    const resGetMe = await http.get(PATH_API.me)
    expect(resGetMe.status).toBe(HttpStatusCode.Ok)
    const resLogout = await http.post(PATH_API.logout)
    expect(resLogout.status).toBe(HttpStatusCode.Ok)
  })
})
