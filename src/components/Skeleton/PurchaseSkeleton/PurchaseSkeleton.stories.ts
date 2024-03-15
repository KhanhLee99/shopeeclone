import { Meta, StoryObj } from '@storybook/react'
import PurchaseSkeleton from '.'

const meta = {
  title: 'Components/Skeleton/PurchaseSkeleton',
  component: PurchaseSkeleton,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  }
} satisfies Meta<typeof PurchaseSkeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
export const Secondary: Story = {
  args: {
    classNameWrap: 'mt-4 rounded-sm border-black/10 bg-white p-6 shadow-sm'
  }
}
