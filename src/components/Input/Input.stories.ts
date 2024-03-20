import { Meta, StoryObj } from '@storybook/react'
import Input from './Input'

const meta = {
  title: 'Components/Input/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  argTypes: {}
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    name: 'basicInput',
    placeholder: 'Enter something...'
  }
}

export const WithError: Story = {
  args: {
    name: 'errorInput',
    placeholder: 'Enter something...',
    errorMessage: 'This field is required.'
  }
}
