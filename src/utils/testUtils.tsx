import { expect } from 'vitest'
import { screen, waitFor, render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'

import App from 'src/App'

const delay = (time: number) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, time)
  })

export const logScreen = async (body: HTMLElement = document.body.parentElement as HTMLElement, timeout = 1000) => {
  await waitFor(
    async () => {
      expect(await delay(timeout - 100)).toBe(true)
    },
    {
      timeout
    }
  )
  screen.debug(body, 99999999)
}

export const renderWithRoute = (route = '/') => {
  window.history.pushState({}, '', route)
  return {
    user: userEvent.setup(),
    ...render(<App />, {
      wrapper: BrowserRouter
    })
  }
}
