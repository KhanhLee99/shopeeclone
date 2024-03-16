import { vi, afterAll, afterEach, beforeAll } from 'vitest'
import { setupServer } from 'msw/node'

import authRequest from './src/msw/auth.msw'
import userRequests from './src/msw/user.msw'
import productsRequest from './src/msw/products.msw'

const server = setupServer(...authRequest, ...userRequests, ...productsRequest)
const IntersectionObserverMock = vi.fn(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  takeRecords: vi.fn(),
  unobserve: vi.fn()
}))
vi.stubGlobal('IntersectionObserver', IntersectionObserverMock)

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

//  Close server after all tests
afterAll(() => server.close())

// Reset handlers after each test `important for test isolation`
afterEach(() => {
  server.resetHandlers()
})
