import { beforeEach, describe, expect, it } from 'vitest'

import { clearLS, getAccessTokenFromLS, getProfileFromLS, saveAccessTokenToLS, saveProfileToLS } from '../auth'
import { User } from 'src/types/user.type'

const access_token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzODAyZjFmNWZkYzVmMDM3ZTZmNmEyZSIsImVtYWlsIjoidmtoYW5nNTQyQGdtYWlsLmNvbSIsInJvbGVzIjpbIlVzZXIiXSwiY3JlYXRlZF9hdCI6IjIwMjQtMDMtMDZUMTA6MDk6MTkuNzk0WiIsImlhdCI6MTcwOTcxOTc1OSwiZXhwIjoxNzEwMzI0NTU5fQ.AHXBOw18VTlyKDOeu2FnNyIRypQbGRq-Nn4PYCxw2ZE'
const profile =
  '{"_id":"63802f1f5fdc5f037e6f6a2e","roles":["User"],"email":"vkhang542@gmail.com","createdAt":"2022-11-25T02:57:35.355Z","updatedAt":"2024-03-06T07:09:00.751Z","address":"Da Nang","name":"Khanh Le Vie","phone":"0935486181","date_of_birth":"1999-02-28T17:00:00.000Z","avatar":"c417d59d-1b02-4e8a-b395-bd051933a253.jpg"}'

beforeEach(() => {
  localStorage.clear()
})

describe('access_token', () => {
  it('access_token set to local storage', () => {
    saveAccessTokenToLS(access_token)
    expect(getAccessTokenFromLS()).toBe(access_token)
  })
})

describe('clearLS', () => {
  it('clearLS func excute to clear local storage', () => {
    saveAccessTokenToLS(access_token)
    clearLS()
    expect(getAccessTokenFromLS()).toBe('')
  })
})

describe('profile', () => {
  it('set & get profile to local storage', () => {
    const _profile = JSON.parse(profile) as User
    const { _id, email, address, name, phone, date_of_birth, avatar, roles, createdAt, updatedAt } = _profile
    saveProfileToLS({
      _id,
      email,
      address,
      name,
      phone,
      date_of_birth,
      avatar,
      roles,
      createdAt,
      updatedAt
    })
    expect(getProfileFromLS()).toEqual(_profile)
  })
})
