// src/components/Toast/Toast.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Toast } from './Toast'

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  argTypes: {
    type: { control: 'select', options: ['success', 'warning', 'error'] },
    message: { control: 'text' },
    description: { control: 'text' },
    icon: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Toast>

export const Playground: Story = {
  args: { type: 'success', message: '저장되었습니다.' },
}

export const AllTypes: Story = {
  name: 'Overview',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 320px)', gap: '24px' }}>
      <Toast type="success" message="한줄 토스트" />
      <Toast type="warning" message="한줄 토스트" />
      <Toast type="error" message="한줄 토스트" />
      <Toast type="success" message="서브 텍스트 토스트" description="안녕 너무 졸리다 안녕 너무 졸리다..." />
      <Toast type="warning" message="서브 텍스트 토스트" description="안녕 너무 졸리다 안녕 너무 졸리다..." />
      <Toast type="error" message="서브 텍스트 토스트" description="안녕 너무 졸리다 안녕 너무 졸리다..." />
    </div>
  ),
}
