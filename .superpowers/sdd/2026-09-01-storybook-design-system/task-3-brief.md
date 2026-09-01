### Task 3: Button 컴포넌트

**Files:**
- Create: `src/components/Button/Button.tsx`
- Create: `src/components/Button/Button.module.css`
- Create: `src/components/Button/Button.stories.tsx`
- Create: `src/components/Button/index.ts`

**Interfaces:**
- Consumes: `src/styles/tokens.css` (CSS Variables)
- Produces: `<Button>` 컴포넌트 — `variant`, `size`, `disabled`, `children` props

- [ ] **Step 1: Button.tsx 작성**

Figma Button 컴포넌트의 Variant를 Props로 매핑:
- Type(Primary/Secondary/Tertiary) → `variant` prop
- Size(Small/Medium/Large) → `size` prop
- State(Disabled) → `disabled` prop

```tsx
// src/components/Button/Button.tsx
import styles from './Button.module.css'

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  children: React.ReactNode
  onClick?: () => void
}

export function Button({
  variant = 'primary',
  size = 'medium',
  disabled = false,
  children,
  onClick,
}: ButtonProps) {
  const className = [
    styles.button,
    styles[variant],
    styles[size],
  ].join(' ')

  return (
    <button
      className={className}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
```

- [ ] **Step 2: Button.module.css 작성**

CSS Variables(토큰)만 사용하여 스타일링:

```css
/* src/components/Button/Button.module.css */
.button {
  font-family: var(--font-family);
  font-weight: var(--font-weight-bold);
  letter-spacing: var(--letter-spacing);
  border: none;
  cursor: pointer;
  border-radius: var(--radius-sm);
  transition: background-color 0.15s ease, color 0.15s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.button:disabled {
  cursor: not-allowed;
  opacity: 0.4;
}

/* Variants */
.primary {
  background-color: var(--color-primary-default);
  color: var(--color-label-inverse);
}
.primary:hover:not(:disabled) {
  background-color: var(--color-primary-hovered);
}
.primary:active:not(:disabled) {
  background-color: var(--color-primary-pressed);
}

.secondary {
  background-color: var(--color-secondary-default);
  color: var(--color-label-inverse);
}
.secondary:hover:not(:disabled) {
  background-color: var(--color-secondary-hovered);
}
.secondary:active:not(:disabled) {
  background-color: var(--color-secondary-pressed);
}

.tertiary {
  background-color: var(--color-tertiary-default);
  color: var(--color-label-primary);
}
.tertiary:hover:not(:disabled) {
  background-color: var(--color-tertiary-hovered);
}
.tertiary:active:not(:disabled) {
  background-color: var(--color-tertiary-pressed);
}

/* Sizes */
.small {
  font-size: var(--font-size-12);
  line-height: var(--line-height-18);
  padding: var(--spacing-8) var(--spacing-12);
  min-height: 34px;
}

.medium {
  font-size: var(--font-size-14);
  line-height: var(--line-height-20);
  padding: var(--spacing-8) var(--spacing-16);
  min-height: 40px;
}

.large {
  font-size: var(--font-size-16);
  line-height: var(--line-height-24);
  padding: var(--spacing-12) var(--spacing-24);
  min-height: 48px;
}
```

- [ ] **Step 3: index.ts barrel export 작성**

```ts
// src/components/Button/index.ts
export { Button } from './Button'
export type { ButtonProps } from './Button'
```

- [ ] **Step 4: Button.stories.tsx 작성**

```tsx
// src/components/Button/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    disabled: { control: 'boolean' },
    children: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Playground: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    disabled: false,
    children: '버튼',
  },
}

export const Primary: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Button variant="primary" size="small">Small</Button>
      <Button variant="primary" size="medium">Medium</Button>
      <Button variant="primary" size="large">Large</Button>
      <Button variant="primary" disabled>Disabled</Button>
    </div>
  ),
}

export const Secondary: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Button variant="secondary" size="small">Small</Button>
      <Button variant="secondary" size="medium">Medium</Button>
      <Button variant="secondary" size="large">Large</Button>
      <Button variant="secondary" disabled>Disabled</Button>
    </div>
  ),
}

export const Tertiary: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Button variant="tertiary" size="small">Small</Button>
      <Button variant="tertiary" size="medium">Medium</Button>
      <Button variant="tertiary" size="large">Large</Button>
      <Button variant="tertiary" disabled>Disabled</Button>
    </div>
  ),
}

export const AllVariants: Story = {
  name: 'Overview',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h3 style={{ marginBottom: '12px', fontFamily: 'var(--font-family)' }}>Primary</h3>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Button variant="primary" size="small">Small</Button>
          <Button variant="primary" size="medium">Medium</Button>
          <Button variant="primary" size="large">Large</Button>
          <Button variant="primary" disabled>Disabled</Button>
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: '12px', fontFamily: 'var(--font-family)' }}>Secondary</h3>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Button variant="secondary" size="small">Small</Button>
          <Button variant="secondary" size="medium">Medium</Button>
          <Button variant="secondary" size="large">Large</Button>
          <Button variant="secondary" disabled>Disabled</Button>
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: '12px', fontFamily: 'var(--font-family)' }}>Tertiary</h3>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Button variant="tertiary" size="small">Small</Button>
          <Button variant="tertiary" size="medium">Medium</Button>
          <Button variant="tertiary" size="large">Large</Button>
          <Button variant="tertiary" disabled>Disabled</Button>
        </div>
      </div>
    </div>
  ),
}
```

- [ ] **Step 5: Storybook에서 Button 확인**

```bash
npm run storybook
```

Components → Button에서 모든 Story가 올바르게 렌더링되는지 확인. Playground에서 variant, size, disabled를 바꿔보며 Figma 디자인과 비교.

- [ ] **Step 6: 커밋**

```bash
git add src/components/Button/
git commit -m "feat: Button 컴포넌트 구현 (Primary/Secondary/Tertiary, 3 sizes)"
```

---