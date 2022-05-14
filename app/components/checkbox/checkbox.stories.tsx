import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Checkbox } from '.'
import { darkMode } from '~/storybook-helpers/dark-mode'

const meta: ComponentMeta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  args: {
    label: 'My Checkbox',
  },
}

export default meta

const Template: ComponentStory<typeof Checkbox> = (args) => (
  <Checkbox {...args} />
)

export const Unchecked = Template.bind({})
export const UncheckedDarkMode = Template.bind({})
UncheckedDarkMode.decorators = [darkMode]

export const Checked = Template.bind({})
Checked.args = {
  defaultChecked: true,
}

export const CheckedDarkMode = Template.bind({})
CheckedDarkMode.args = { ...Checked.args }
CheckedDarkMode.decorators = [darkMode]
