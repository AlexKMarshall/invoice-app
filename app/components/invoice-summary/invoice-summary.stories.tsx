import { ComponentMeta, ComponentStory } from '@storybook/react'

import { InvoiceSummary } from '.'

// import { ComponentProps, ReactNode, useLayoutEffect } from 'react'

const meta: ComponentMeta<typeof InvoiceSummary> = {
  title: 'Components/InvoiceSummary',
  component: InvoiceSummary,
  argTypes: {},
}

export default meta

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

// function DarkMode({ children }: { children: ReactNode }) {
//   useLayoutEffect(() => {
//     const body = document.querySelector('body')
//     body?.setAttribute('data-theme', 'dark')

//     return () => {
//       body?.removeAttribute('data-theme')
//     }
//   }, [])

//   return <>{children}</>
// }
