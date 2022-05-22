import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Calendar } from '.'
import { darkMode } from '~/storybook-helpers/dark-mode'

const meta: ComponentMeta<typeof Calendar> = {
  title: 'Components/Calendar',
  component: Calendar,
  argTypes: {},
  args: { id: 'calendar' },
}

export default meta

const Template: ComponentStory<typeof Calendar> = (args) => (
  <Calendar {...args} />
)

export const Default = Template.bind({})

export const DefaultDarkMode = Template.bind({})
DefaultDarkMode.decorators = [darkMode]
