import { HttpResponse, http } from 'msw'

import config from 'src/constants/config'
import PATH_API from 'src/constants/pathApi'

const meRes = {
  message: 'Lấy người dùng thành công',
  data: {
    _id: '63802f1f5fdc5f037e6f6a2e',
    roles: ['User'],
    email: 'levietkhanh@gmail.com',
    createdAt: '2022-11-12T12:36:46.282Z',
    updatedAt: '2022-12-02T07:57:45.069Z',
    avatar: 'b8ef4df0-4331-4d52-9a19-71058f9a81a7.jpeg',
    name: 'LVK'
  }
}

const getMeRequest = http.get(`${config.baseUrl}${PATH_API.me}`, () => {
  return HttpResponse.json(meRes)
})

const userRequests = [getMeRequest]

export default userRequests
