import { screen, waitFor } from '@testing-library/react'
import { expect } from 'vitest'

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
