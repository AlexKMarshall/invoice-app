import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ComponentProps } from 'react'
import { InvoiceSummary } from '.'
import { darkMode } from '~/storybook-helpers/dark-mode'

const meta: ComponentMeta<typeof InvoiceSummary> = {
  title: 'Components/InvoiceSummary',
  includeStories: /^[A-Z]/,
  component: InvoiceSummary,
  argTypes: {},
}

export default meta

export const defaultArgs: ComponentProps<typeof InvoiceSummary> = {
  id: 'RT3080',
  name: 'Jensen Huang',
  due: new Date('19 Aug 2021'),
  amount: 1800.9,
  currency: 'GBP',
  status: 'paid',
}

const Template: ComponentStory<typeof InvoiceSummary> = (args) => (
  <InvoiceSummary {...args} />
)

export const Default = Template.bind({})
Default.args = {
  id: 'RT3080',
  name: 'Jensen Huang',
  due: new Date('19 Aug 2021'),
  amount: 1800.9,
  currency: 'GBP',
  status: 'paid',
}

export const DefaultDarkMode = Template.bind({})
DefaultDarkMode.args = {
  ...Default.args,
}
DefaultDarkMode.decorators = [darkMode]
