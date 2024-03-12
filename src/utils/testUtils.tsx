import { screen, render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'

import App from 'src/App'
import { AppProvider, getInitialValue } from 'src/contexts/app.context'

export const delay = (time: number) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, time)
  })

export const logScreen = async (
  body: HTMLElement = document.body.parentElement as HTMLElement,
  timeout = 1000,
  lineNumber = 99999999
) => {
  await delay(timeout - 100)
  screen.debug(body, lineNumber)
}

export const renderWithRoute = (route = '/') => {
  window.history.pushState({}, '', route)
  const initialValue = getInitialValue()
  return {
    user: userEvent.setup(),
    ...render(
      <AppProvider defaultValue={initialValue}>
        <App />
      </AppProvider>,
      {
        wrapper: BrowserRouter
      }
    )
  }
}
