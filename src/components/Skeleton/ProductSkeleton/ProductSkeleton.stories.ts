import { Meta, StoryObj } from '@storybook/react'
import ProductSkeleton from '.'

const meta = {
  title: 'Components/Skeleton/ProductSkeleton',
  component: ProductSkeleton,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded'
  }
} satisfies Meta<typeof ProductSkeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
