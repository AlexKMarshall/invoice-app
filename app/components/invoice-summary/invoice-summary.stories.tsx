import { ComponentMeta, ComponentStory } from '@storybook/react'
import { userEvent, within } from '@storybook/testing-library'

import { InvoiceSummary } from '.'
import MockLink from '~/storybook-helpers/mock-link'
import { darkMode } from '~/storybook-helpers/dark-mode'
import { expect } from '@storybook/jest'

const meta: ComponentMeta<typeof InvoiceSummary> = {
  title: 'Components/InvoiceSummary',
  includeStories: /^[A-Z]/,
  component: InvoiceSummary,
  argTypes: {
    onClick: { action: true },
  },
  args: {
    id: 'RT3080',
    name: 'Jensen Huang',
    due: new Date('19 Aug 2021'),
    amount: 1800.9,
    currency: 'GBP',
    status: 'paid',
    Link: MockLink,
    to: '/some-path',
  },
}

export default meta

const Template: ComponentStory<typeof InvoiceSummary> = (args) => (
  <InvoiceSummary {...args} />
)

export const Default = Template.bind({})

export const DefaultDarkMode = Template.bind({})
DefaultDarkMode.decorators = [darkMode]

export const ClickedLink = Template.bind({})
ClickedLink.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)
  const link = await canvas.findByRole('link', { name: args.id })
  await userEvent.click(link)
  await expect(args.onClick).toHaveBeenCalledTimes(1)
}

export const ClickedName = Template.bind({})
ClickedName.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)
  const name = await canvas.findByText(args.name)
  await userEvent.click(name)
  await expect(args.onClick).toHaveBeenCalledTimes(1)
}
