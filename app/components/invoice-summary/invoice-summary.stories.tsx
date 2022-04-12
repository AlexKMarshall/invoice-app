import { ComponentMeta, ComponentStory } from '@storybook/react'
import { ComponentProps, ReactNode } from 'react'

import { InvoiceSummary } from '.'
import { darkMode } from '~/storybook-helpers/dark-mode'
import { forwardRef } from 'react'

const meta: ComponentMeta<typeof InvoiceSummary> = {
  title: 'Components/InvoiceSummary',
  includeStories: /^[A-Z]/,
  component: InvoiceSummary,
  argTypes: {},
}

export default meta
type MockLinkProps = {
  to: string
  children: ReactNode
}
const MockLink = forwardRef<HTMLAnchorElement, MockLinkProps>(
  ({ to, children }: MockLinkProps, ref) => {
    return (
      <a
        href={to}
        ref={ref}
        onClick={(e) => {
          e.preventDefault()
        }}
      >
        {children}
      </a>
    )
  }
)
MockLink.displayName = 'MockLink'

export const defaultArgs: ComponentProps<typeof InvoiceSummary> = {
  id: 'RT3080',
  name: 'Jensen Huang',
  due: new Date('19 Aug 2021'),
  amount: 1800.9,
  currency: 'GBP',
  status: 'paid',
  Link: MockLink,
  to: '/some-path',
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
  Link: MockLink,
  to: '/some-path',
}

export const DefaultDarkMode = Template.bind({})
DefaultDarkMode.args = {
  ...Default.args,
}
DefaultDarkMode.decorators = [darkMode]
