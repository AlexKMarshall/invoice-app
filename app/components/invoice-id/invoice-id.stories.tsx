import { ComponentMeta, ComponentStory } from '@storybook/react'

import { InvoiceId } from '.'

const meta: ComponentMeta<typeof InvoiceId> = {
  title: 'Components/InvoiceId',
  component: InvoiceId,
  argTypes: {},
}

export default meta

const Template: ComponentStory<typeof InvoiceId> = (args) => (
  <InvoiceId {...args} />
)

export const Default = Template.bind({})
Default.args = {
  id: 'RT3080',
}
