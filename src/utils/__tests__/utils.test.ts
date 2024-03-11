import { describe, it, expect } from 'vitest'
import { AxiosError } from 'axios'

import { getLanguageFromLS, isAxiosError, isErrorUnprocessableEntity, setLanguageToLS } from '../utils'
import HttpStatusCode from 'src/constants/httpStatus'

// describe dùng để mô tả tập hợp các ngữ cảnh
// hoặc 1 đơn vị cần test: Ví dụ function, component
describe('isAxiosError', () => {
  // it dùng để ghi chú trường hợp cần test
  it('isAxiosError func return boolean', () => {
    expect(isAxiosError(new AxiosError())).toBe(true)
    expect(isAxiosError(new Error())).toBe(false)
  })
})

describe('isErrorUnprocessableEntity', () => {
  it('isErrorUnprocessableEntity func return boolean', () => {
    expect(
      isErrorUnprocessableEntity(
        new AxiosError(undefined, undefined, undefined, undefined, {
          status: HttpStatusCode.UnprocessableEntity
        } as any)
      )
    ).toBe(true)
    expect(
      isErrorUnprocessableEntity(
        new AxiosError(undefined, undefined, undefined, undefined, {
          status: HttpStatusCode.Unauthorized
        } as any)
      )
    ).toBe(false)
  })
})

describe('language', () => {
  it('language set to LS', () => {
    setLanguageToLS('en')
    expect(getLanguageFromLS()).toBe('en')
  })
})
