import { Meta, StoryObj } from '@storybook/react'
import Button from './Button'

const meta = {
  title: 'Components/Button',
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  tags: ['autodocs'],
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered'
  },
  argTypes: {
    isLoading: {
      description: 'Hiển thị icon loading'
    },
    children: {
      description: 'Nội dung button',
      table: { type: { summary: 'React.ReactNode' }, defaultValue: { summary: '' } }
    },
    className: {
      description: 'class',
      table: { type: { summary: 'string' }, defaultValue: { summary: '' } }
    },
    disabled: {
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } }
    }
  }
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: 'Đăng nhập',
    className: 'flex items-center justify-center bg-red-500 py-4 px-2 text-sm uppercase text-white hover:bg-red-600',
    isLoading: true,
    disabled: false
  }
}

export const Secondary: Story = {
  args: {
    children: 'Đăng nhập',
    className: 'flex items-center justify-center bg-red-500 py-4 px-2 text-sm uppercase text-white hover:bg-red-600',
    isLoading: false
  }
}
