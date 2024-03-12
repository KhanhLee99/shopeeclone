// import type { Meta, StoryObj } from '@storybook/react';
import { Meta, StoryObj } from '@storybook/react'
import Header from './Header'

const meta = {
  title: 'Components/Header/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};