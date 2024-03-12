import { expect, test, describe, beforeAll } from 'vitest'
import { screen, waitFor, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

import i18n, { NS_RULES } from 'src/i18n/i18n'
import { logScreen, renderWithRoute } from 'src/utils/testUtils'
import URLs from 'src/constants/url'

describe('Test Login Form', () => {
  let buttonSubmit: HTMLButtonElement
  let emailInput: HTMLInputElement
  let passwordInput: HTMLInputElement
  beforeAll(async () => {
    renderWithRoute(URLs.login)
    await waitFor(() => {
      expect(screen.getByPlaceholderText(i18n.t('email') as string)).toBeInTheDocument()
      expect(screen.getByPlaceholderText(i18n.t('password') as string)).toBeInTheDocument()
    })
    buttonSubmit = document.querySelector('form button[type="submit"]') as HTMLButtonElement
    emailInput = document.querySelector('form input[type="email"]') as HTMLInputElement
    passwordInput = document.querySelector('form input[type="password"]') as HTMLInputElement
  })
  test('Test Field Required Error Messge', async () => {
    fireEvent.click(buttonSubmit)
    expect(await screen.findAllByText(i18n.t(`${NS_RULES}:required`) as string)).toHaveLength(2)
  })

  test('Test Invalid Email & Password Error Message', async () => {
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
  })

  test('Test Login Success', async () => {
    fireEvent.input(emailInput, {
      target: { value: 'vkhang542@gmail.com' }
    })
    fireEvent.input(passwordInput, {
      target: { value: '123456' }
    })
    // Những trường hợp chứng minh rằng tìm không ra text hay là element
    // Thì nên dùng query hơn là find hay get
    await waitFor(() => {
      expect(screen.queryByText('Email không đúng định dạng')).toBeFalsy()
      expect(screen.queryByText('Độ dài từ 6 - 160 ký tự')).toBeFalsy()
    })
    fireEvent.click(buttonSubmit)
    await waitFor(() => {
      expect(document.querySelector('title')?.textContent).toBe(`${i18n.t('home')} | Shopee Clone`)
      expect(window.location.pathname).toBe(URLs.productList)
    })
    await logScreen()
  })
})
