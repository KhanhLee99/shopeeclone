import { Meta, StoryObj } from '@storybook/react'
import Button, { ButtonProps } from './Button'
import { CartPlus } from '../Icons'

const ButtonComponent = (props: ButtonProps) => (
  <div className='flex w-[500px] items-center justify-center bg-gray-300/40 px-3 py-4'>
    <Button {...props} />
  </div>
)

const meta = {
  title: 'Components/Button',
  component: ButtonComponent,
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  tags: ['autodocs'],
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered'
  },
  argTypes: {
    loading: {
      description: 'Set the loading status of button',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
      control: 'boolean'
    },
    children: {
      description: 'Button content',
      table: { type: { summary: 'React.ReactNode' }, defaultValue: { summary: '' } }
    },
    className: {
      description: 'Semantic DOM class',
      table: { type: { summary: 'string' }, defaultValue: { summary: '' } },
      control: 'text'
    },
    disabled: {
      description: 'Disabled state of button',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
      control: 'boolean'
    },
    buttonType: {
      description: 'Set button type',
      table: { type: { summary: 'union' }, defaultValue: { summary: 'primary' } },
      options: ['primary', 'secondary', 'ghost'],
      control: { type: 'radio' }
    },
    size: {
      description: 'Set the size of button',
      table: { type: { summary: 'union' }, defaultValue: { summary: 'middle' } },
      options: ['small', 'middle', 'large'],
      control: { type: 'radio' }
    },
    icon: {
      description: 'Set the icon component of button',
      table: { type: { summary: 'React.ReactNode' }, defaultValue: { summary: '' } }
    }
  }
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: 'Đăng nhập',
    disabled: false,
    loading: false,
    block: true,
    className: '',
    buttonType: 'primary',
    size: 'middle'
  }
}

export const Secondary: Story = {
  args: {
    children: 'Đăng nhập',
    buttonType: 'secondary',
    disabled: false,
    loading: false
  }
}

export const Ghost: Story = {
  args: {
    children: 'Thêm vào giỏ hàng',
    buttonType: 'ghost',
    disabled: false,
    loading: false,
    icon: <CartPlus />
  }
}
