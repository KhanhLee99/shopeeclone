import { describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Button from './Button'

describe('Button Component', () => {
  test('renders button with text content', () => {
    render(<Button>Click me</Button>)
    const buttonElement = screen.getByText('Click me')
    expect(buttonElement).toBeTruthy()
  })
})
