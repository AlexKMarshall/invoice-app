import { ComponentMeta, ComponentStory } from '@storybook/react'
import { userEvent, within } from '@storybook/testing-library'

import { FilterMenu } from '.'
import { darkMode } from '~/storybook-helpers/dark-mode'
import { expect } from '@storybook/jest'

const meta: ComponentMeta<typeof FilterMenu> = {
  title: 'Components/FilterMenu',
  component: FilterMenu,
}

export default meta

const Template: ComponentStory<typeof FilterMenu> = (args) => (
  <FilterMenu {...args} />
)

export const Menu = Template.bind({})

export const MenuDarkMode = Template.bind({})
MenuDarkMode.decorators = [darkMode]

// export const Secondary = Template.bind({})
// Secondary.args = {
//   color: 'secondary',
// }

// export const SecondaryDarkMode = Template.bind({})
// SecondaryDarkMode.args = {
//   ...Secondary.args,
// }
// SecondaryDarkMode.decorators = [darkMode]

// export const Mono = Template.bind({})
// Mono.args = { color: 'mono' }

// export const MonoDarkMode = Template.bind({})
// MonoDarkMode.args = { ...Mono.args }
// MonoDarkMode.decorators = [darkMode]

// export const Danger = Template.bind({})
// Danger.args = {
//   color: 'danger',
// }

// export const PressButton = Template.bind({})
// PressButton.play = async ({ args, canvasElement }) => {
//   const canvas = within(canvasElement)
//   const button = await canvas.findByRole('button', { name: args.label })

//   await userEvent.click(button)

//   await expect(args.onClick).toHaveBeenCalledTimes(1)
// }
