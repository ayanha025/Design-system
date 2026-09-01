// src/components/Toast/Toast.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Toast } from './Toast'

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  argTypes: {
    type: { control: 'select', options: ['success', 'error', 'warning', 'info'] },
    message: { control: 'text' },
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Toast type="success" message="저장되었습니다." onClose={() => {}} />
      <Toast type="error" message="오류가 발생했습니다." onClose={() => {}} />
      <Toast type="warning" message="주의가 필요합니다." onClose={() => {}} />
      <Toast type="info" message="새로운 알림이 있습니다." onClose={() => {}} />
    </div>
  ),
}
