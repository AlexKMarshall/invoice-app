import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ComponentProps } from 'react'
import { InvoiceList } from '.'
import { InvoiceSummary } from '../invoice-summary'
import MockLink from '~/storybook-helpers/mock-link'
import { darkMode } from '~/storybook-helpers/dark-mode'

const meta: ComponentMeta<typeof InvoiceList> = {
  title: 'Components/InvoiceList',
  component: InvoiceList,
  argTypes: {},
}

export default meta

type InvoiceListGeneratorProps = ComponentProps<typeof InvoiceList> & {
  items?: ComponentProps<typeof InvoiceSummary>[]
}
const InvoiceListGenerator = ({
  items,
  ...args
}: InvoiceListGeneratorProps) => (
  <InvoiceList {...args}>
    {items?.map((item) => (
      <InvoiceSummary {...item} key={item.id} />
    ))}
  </InvoiceList>
)

const Template: ComponentStory<typeof InvoiceListGenerator> = (args) => (
  <InvoiceListGenerator {...args} />
)

export const OneItem = Template.bind({})
OneItem.args = {
  items: [
    {
      id: 'RT3080',
      name: 'Jensen Huang',
      due: new Date('19 Aug 2021'),
      amount: 1800.9,
      currency: 'GBP',
      status: 'paid',
      Link: MockLink,
      to: '/some-page',
    },
  ],
}

export const MultipleItems = Template.bind({})
MultipleItems.args = {
  items: [
    {
      id: 'RT3080',
      name: 'Jensen Huang',
      due: new Date('19 Aug 2021'),
      amount: 1800.9,
      currency: 'GBP',
      status: 'paid',
      Link: MockLink,
      to: '/some-page',
    },
    {
      id: 'XM9141',
      name: 'Alex Grim',
      due: new Date('20 Sep 2021'),
      amount: 556,
      currency: 'GBP',
      status: 'pending',
      Link: MockLink,
      to: '/some-page',
    },
    {
      id: 'FV2353',
      name: 'Anita Wainwright',
      due: new Date('12 Nov 2021'),
      amount: 3102.04,
      currency: 'GBP',
      status: 'draft',
      Link: MockLink,
      to: '/some-page',
    },
  ],
}

export const MultipleItemsDarkMode = Template.bind({})
MultipleItemsDarkMode.args = { ...MultipleItems.args }
MultipleItemsDarkMode.decorators = [darkMode]
