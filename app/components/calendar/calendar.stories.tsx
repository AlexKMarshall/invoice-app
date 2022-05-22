import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Calendar } from '.'

const meta: ComponentMeta<typeof Calendar> = {
  title: 'Components/Calendar',
  component: Calendar,
  argTypes: {},
  args: {},
}

export default meta

const Template: ComponentStory<typeof Calendar> = (args) => (
  <Calendar {...args} />
)

export const Default = Template.bind({})
