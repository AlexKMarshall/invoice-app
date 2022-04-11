import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ComponentProps } from 'react'
import { InputField } from '.'
import { darkMode } from '~/storybook-helpers/dark-mode'

const meta: ComponentMeta<typeof InputField> = {
  title: 'Components/InputField',
  component: InputField,
  argTypes: {},
}

export default meta

const defaultArgs: ComponentProps<typeof InputField> = {
  label: 'Street Address',
  id: 'street-address',
}

const Template: ComponentStory<typeof InputField> = (args) => (
  <InputField {...defaultArgs} {...args} />
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
