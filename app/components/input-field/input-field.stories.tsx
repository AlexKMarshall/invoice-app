import { ComponentMeta, ComponentStory } from '@storybook/react'
import { userEvent, within } from '@storybook/testing-library'

import { InputField } from '.'
import { darkMode } from '~/storybook-helpers/dark-mode'
import { expect } from '@storybook/jest'

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
Default.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)
  const input = await canvas.findByRole('textbox', { name: args.label })
  await userEvent.clear(input)
  await userEvent.type(input, 'New address value')

  await expect(input).toHaveValue('New address value')
  await expect(input).toBeValid()
}

export const DefaultDarkMode = Template.bind({})
DefaultDarkMode.decorators = [darkMode]

export const WithError = Template.bind({})
WithError.args = {
  errorMessage: `Can't be empty`,
}
WithError.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)
  const input = await canvas.findByRole('textbox', { name: args.label })

  await expect(input).toBeInvalid()
  await expect(input).toHaveErrorMessage(args.errorMessage)
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
