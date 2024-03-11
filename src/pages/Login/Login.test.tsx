import { expect, test, describe, beforeAll } from 'vitest'
import { screen, waitFor, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

import i18n, { NS_RULES } from 'src/i18n/i18n'
import { logScreen, renderWithRoute } from 'src/utils/testUtils'
import URLs from 'src/constants/url'

describe('Test Login Form', () => {
  beforeAll(async () => {
    renderWithRoute(URLs.login)
    await waitFor(() => {
      expect(screen.getByPlaceholderText(i18n.t('email') as string)).toBeInTheDocument()
      expect(screen.getByPlaceholderText(i18n.t('password') as string)).toBeInTheDocument()
    })
  })
  test('Test Field Required Error Messge', async () => {
    const buttonSubmit = document.querySelector('form button[type="submit"]') as HTMLButtonElement
    fireEvent.click(buttonSubmit)
    expect(await screen.findAllByText(i18n.t(`${NS_RULES}:required`) as string)).toHaveLength(2)
  })

  test('Test Invalid Email & Password Error Message', async () => {
    const buttonSubmit = document.querySelector('form button[type="submit"]') as HTMLButtonElement
    const emailInput = document.querySelector('form input[type="email"]') as HTMLInputElement
    const passwordInput = document.querySelector('form input[type="password"]') as HTMLInputElement

    fireEvent.input(emailInput, {
      target: { value: 'email' }
    })
    fireEvent.input(passwordInput, {
      target: { value: 'pass' }
    })
    fireEvent.click(buttonSubmit)
    await waitFor(() => {
      expect(screen.getByText(i18n.t(`${NS_RULES}:email_invalid`) as string)).toBeInTheDocument()
      expect(screen.getByText(i18n.t(`${NS_RULES}:password_length`) as string)).toBeInTheDocument()
    })
    // await logScreen()
  })
})
