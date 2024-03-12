import { expect, test, describe } from 'vitest'
import { waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

import { logScreen, renderWithRoute } from 'src/utils/testUtils'
import URLs from 'src/constants/url'
import { saveAccessTokenToLS } from 'src/utils/auth'

describe('Profile Page', () => {
  test('Test Render Profile Page', async () => {
    saveAccessTokenToLS('Bearer access_token')
    const { container } = renderWithRoute(URLs.profile)
    await waitFor(() => {
      expect((container.querySelector('form input[name="name"]') as HTMLInputElement).value).toBe('LVK')
    })
    await logScreen()
  })
})
