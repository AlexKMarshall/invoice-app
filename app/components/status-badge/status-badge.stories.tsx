import { ComponentMeta, ComponentStory } from '@storybook/react'

import { StatusBadge } from '.'
import { darkMode } from '~/storybook-helpers/dark-mode'

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
DraftDarkMode.decorators = [darkMode]
