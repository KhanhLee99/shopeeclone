import { describe, expect, test } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

import i18n from './i18n/i18n'
import { renderWithRoute } from './utils/testUtils'

describe('Test App Render', () => {
  test('Test render and navigate page', async () => {
    const { user } = renderWithRoute()
    /**
     * waitFor sẽ run callback 1 vài lần
     * cho đến khi hết timeout hoặc expect pass
     * số lần run phụ thuộc vào timeout và interval
     * mặc định: timeout = 1000ms và interval = 50ms
     */
    await waitFor(
      () => {
        expect(document.querySelector('title')?.textContent).toBe(`${i18n.t('home')} | Shopee Clone`)
      },
      {
        timeout: 10000
      }
    )

    await user.click(screen.getByText(new RegExp(i18n.t('login') as string, 'i')))
    await waitFor(() => {
      expect(screen.queryByText(new RegExp(i18n.t('dont have account') as string, 'i'))).toBeInTheDocument()
      expect(document.querySelector('title')?.textContent).toBe(`${i18n.t('login')} | Shopee Clone`)
    })
    // screen.debug(document.body.parentElement as HTMLElement, 99999999)
  })
})
