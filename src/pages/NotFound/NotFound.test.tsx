import { expect, test } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { MemoryRouter } from 'react-router-dom'

import i18n from 'src/i18n/i18n'
import App from 'src/App'
import { logScreen } from 'src/utils/testUtils'

test('Test Not Found Page', async () => {
  const badRoute = '/bad/route'
  render(
    <MemoryRouter initialEntries={[badRoute]}>
      <App />
    </MemoryRouter>
  )
  await waitFor(() => {
    expect(screen.getByText(new RegExp(i18n.t('page not found') as string, 'i'))).toBeTruthy()
  })
  // await logScreen()
})
