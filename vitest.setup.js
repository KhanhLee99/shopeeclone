import { afterAll, afterEach, beforeAll } from 'vitest'
import { setupServer } from 'msw/node'
import { HttpResponse, http } from 'msw'

import APP_CONFIG from './src/constants/config'
import PATH_API from './src/constants/pathApi'

const loginRes = {
  message: 'Đăng nhập thành công',
  data: {
    access_token:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzODAyZjFmNWZkYzVmMDM3ZTZmNmEyZSIsImVtYWlsIjoidmtoYW5nNTQyQGdtYWlsLmNvbSIsInJvbGVzIjpbIlVzZXIiXSwiY3JlYXRlZF9hdCI6IjIwMjQtMDMtMTJUMDI6NTU6NTguNDU5WiIsImlhdCI6MTcxMDIxMjE1OCwiZXhwIjoxNzEwODE2OTU4fQ.GYIXsT_ymUjwQWMYniPmDmGi15htINjyofCgUjabi-k',
    expires: 604800,
    refresh_token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzODAyZjFmNWZkYzVmMDM3ZTZmNmEyZSIsImVtYWlsIjoidmtoYW5nNTQyQGdtYWlsLmNvbSIsInJvbGVzIjpbIlVzZXIiXSwiY3JlYXRlZF9hdCI6IjIwMjQtMDMtMTJUMDI6NTU6NTguNDU5WiIsImlhdCI6MTcxMDIxMjE1OCwiZXhwIjoxNzE4ODUyMTU4fQ.XHkjRVcVq0mftfW4AMHDi-EU0ja9SjNOAJp0vxRpNuM',
    expires_refresh_token: 8640000,
    user: {
      _id: '63802f1f5fdc5f037e6f6a2e',
      roles: ['User'],
      email: 'levietkhanh@gmail.com',
      createdAt: '2022-11-12T12:36:46.282Z',
      updatedAt: '2022-12-02T07:57:45.069Z',
      __v: 0,
      avatar: 'b8ef4df0-4331-4d52-9a19-71058f9a81a7.jpeg',
      name: 'LVK'
    }
  }
}

export const restHandlers = [
  http.post(`${APP_CONFIG.baseUrl}${PATH_API.login}`, () => {
    return HttpResponse.json(loginRes)
  })
]

const server = setupServer(...restHandlers)

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

//  Close server after all tests
afterAll(() => server.close())

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers())
