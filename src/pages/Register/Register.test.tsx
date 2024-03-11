import { expect, test } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

import i18n from 'src/i18n/i18n'
import { logScreen, renderWithRoute } from 'src/utils/testUtils'
import URLs from 'src/constants/url'

test('Test Render Register Page', async () => {
  renderWithRoute(URLs.register)
  await waitFor(() => {
    expect(screen.getByText(new RegExp(i18n.t('have account') as string, 'i'))).toBeInTheDocument()
  })
  // await logScreen()
})
