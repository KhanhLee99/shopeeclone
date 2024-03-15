import { Meta, StoryObj } from '@storybook/react'
import CartHeader from './CartHeader'

const meta = {
  title: 'Components/Header/CartHeader',
  component: CartHeader,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen'
  }
} satisfies Meta<typeof CartHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
