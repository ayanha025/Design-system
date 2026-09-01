// src/components/Checkbox/Checkbox.stories.tsx
import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox } from './Checkbox'

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof Checkbox>

export const Playground: Story = {
  args: {
    checked: false,
    disabled: false,
    label: '체크박스 라벨',
  },
  render: function Render(args) {
    const [checked, setChecked] = useState(args.checked)
    return <Checkbox {...args} checked={checked} onChange={setChecked} />
  },
}

export const AllStates: Story = {
  name: 'Overview',
  render: function Render() {
    const [checked1, setChecked1] = useState(false)
    const [checked2, setChecked2] = useState(true)
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Checkbox label="미선택" checked={checked1} onChange={setChecked1} />
        <Checkbox label="선택됨" checked={checked2} onChange={setChecked2} />
        <Checkbox label="비활성화 (미선택)" disabled />
        <Checkbox label="비활성화 (선택됨)" checked disabled />
      </div>
    )
  },
}
