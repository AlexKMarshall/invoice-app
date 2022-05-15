import { ComponentStory, Meta } from '@storybook/react'
import {
  LinkActionWrapper,
  buildLink,
} from '~/storybook-helpers/storybook-link'

import { ComponentProps } from 'react'
import { InvoiceList } from '.'
import { InvoiceSummary } from '../invoice-summary'
import { darkMode } from '~/storybook-helpers/dark-mode'

type InvoiceListGeneratorProps = ComponentProps<typeof InvoiceList> & {
  items?: ComponentProps<typeof InvoiceSummary>[]
} & ComponentProps<typeof LinkActionWrapper>

const meta: Meta<InvoiceListGeneratorProps> = {
  title: 'Components/InvoiceList',
  component: InvoiceList,
  argTypes: { onWouldNavigate: { action: true } },
}

export default meta

const InvoiceListGenerator = ({
  items,
  onWouldNavigate,
  ...args
}: InvoiceListGeneratorProps) => (
  <LinkActionWrapper onWouldNavigate={onWouldNavigate}>
    <InvoiceList {...args}>
      {items?.map((item) => (
        <InvoiceSummary {...item} key={item.id} />
      ))}
    </InvoiceList>
  </LinkActionWrapper>
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
      Link: buildLink({ href: '/invoices/1' }),
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
      Link: buildLink({ href: '/invoices/2' }),
    },
    {
      id: 'XM9141',
      name: 'Alex Grim',
      due: new Date('20 Sep 2021'),
      amount: 556,
      currency: 'GBP',
      status: 'pending',
      Link: buildLink({ href: '/invoices/3' }),
    },
    {
      id: 'FV2353',
      name: 'Anita Wainwright',
      due: new Date('12 Nov 2021'),
      amount: 3102.04,
      currency: 'GBP',
      status: 'draft',
      Link: buildLink({ href: '/invoices/4' }),
    },
  ],
}

export const MultipleItemsDarkMode = Template.bind({})
MultipleItemsDarkMode.args = { ...MultipleItems.args }
MultipleItemsDarkMode.decorators = [darkMode]
