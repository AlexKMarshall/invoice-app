import {
  LinkActionWrapper,
  buildLink,
} from '~/storybook-helpers/storybook-link'
import { Meta, Story } from '@storybook/react'
import { userEvent, within } from '@storybook/testing-library'

import { ComponentProps } from 'react'
import { InvoiceSummary } from '.'
import { darkMode } from '~/storybook-helpers/dark-mode'
import { expect } from '@storybook/jest'

type StoryArgs = ComponentProps<typeof InvoiceSummary> &
  ComponentProps<typeof LinkActionWrapper>

const meta: Meta<StoryArgs> = {
  title: 'Components/InvoiceSummary',
  includeStories: /^[A-Z]/,
  component: InvoiceSummary,
  argTypes: {
    onWouldNavigate: {
      action: true,
    },
  },
  args: {
    id: 'rt3080',
    name: 'Jensen Huang',
    due: new Date('19 Aug 2021'),
    amount: 1800.9,
    currency: 'GBP',
    status: 'paid',
    Link: buildLink({ href: '/invoices/rt3080' }),
  },
}

export default meta

const Template: Story<StoryArgs> = ({ onWouldNavigate, ...args }) => (
  <LinkActionWrapper onWouldNavigate={onWouldNavigate}>
    <InvoiceSummary {...args} />
  </LinkActionWrapper>
)

export const Default = Template.bind({})

export const DefaultDarkMode = Template.bind({})
DefaultDarkMode.decorators = [darkMode]

export const ClickedLink = Template.bind({})
ClickedLink.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)
  const link = await canvas.findByRole('link', { name: args.id })
  await userEvent.click(link)
  await expect(args.onWouldNavigate).toHaveBeenCalledTimes(1)
  await expect(args.onWouldNavigate).toHaveBeenCalledWith(
    `/invoices/${args.id}`
  )
}
ClickedLink.parameters = {
  chromatic: { viewports: [375] },
}

export const ClickedOutsideLink = Template.bind({})
ClickedOutsideLink.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)
  const name = await canvas.findByText(args.name)
  await userEvent.click(name)
  await expect(args.onWouldNavigate).toHaveBeenCalledTimes(1)
  await expect(args.onWouldNavigate).toHaveBeenCalledWith(
    `/invoices/${args.id}`
  )
}
ClickedOutsideLink.parameters = {
  chromatic: { viewports: [375] },
}
