import { ComponentMeta, ComponentStory } from '@storybook/react'
import { ReactNode, useLayoutEffect } from 'react'

import { StatusBadge } from '.'

const meta: ComponentMeta<typeof StatusBadge> = {
  title: 'Components/StatusBadge',
  component: StatusBadge,
  argTypes: {},
}

export default meta

const Template: ComponentStory<typeof StatusBadge> = (args) => (
  <StatusBadge {...args} />
)

export const Pending = Template.bind({})
Pending.args = {
  status: 'pending',
}

export const Paid = Template.bind({})
Paid.args = {
  status: 'paid',
}

export const Draft = Template.bind({})
Draft.args = {
  status: 'draft',
}

export const DraftDarkMode = Template.bind({})
DraftDarkMode.args = {
  ...Draft.args,
}
DraftDarkMode.decorators = [
  (Story) => (
    <DarkMode>
      <Story />
    </DarkMode>
  ),
]

function DarkMode({ children }: { children: ReactNode }) {
  useLayoutEffect(() => {
    const body = document.querySelector('body')
    body?.setAttribute('data-theme', 'dark')

    return () => {
      body?.removeAttribute('data-theme')
    }
  }, [])

  return <>{children}</>
}
