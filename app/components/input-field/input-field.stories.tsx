import { ComponentMeta, ComponentStory } from '@storybook/react'

import { InputField } from '.'
import { darkMode } from '~/storybook-helpers/dark-mode'

const meta: ComponentMeta<typeof InputField> = {
  title: 'Components/InputField',
  component: InputField,
  argTypes: {},
  args: {
    label: 'Street Address',
    id: 'street-address',
    defaultValue: '123 Main Street',
  },
}

export default meta

const Template: ComponentStory<typeof InputField> = (args) => (
  <InputField {...args} />
)

export const Default = Template.bind({})

export const DefaultDarkMode = Template.bind({})
DefaultDarkMode.decorators = [darkMode]

export const WithError = Template.bind({})
WithError.args = {
  errorMessage: `Can't be empty`,
}

export const WithErrorDarkMode = Template.bind({})
WithErrorDarkMode.args = {
  ...WithError.args,
}
WithErrorDarkMode.decorators = [darkMode]

export const ReadOnly = Template.bind({})
ReadOnly.args = {
  readOnly: true,
}

export const ReadOnlyDarkMode = Template.bind({})
ReadOnlyDarkMode.args = {
  ...ReadOnly.args,
}
ReadOnlyDarkMode.decorators = [darkMode]
