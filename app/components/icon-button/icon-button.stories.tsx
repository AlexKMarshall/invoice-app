import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ArrowLeftIcon } from '../icons/arrow-left'
import { ArrowRightIcon } from '../icons/arrow-right'
import { IconButton } from '.'
import { darkMode } from '~/storybook-helpers/dark-mode'

const meta: ComponentMeta<typeof IconButton> = {
  title: 'Components/IconButton',
  component: IconButton,
  argTypes: {},
  args: { icon: <ArrowRightIcon />, label: 'Previous Month' },
}

export default meta

const Template: ComponentStory<typeof IconButton> = (args) => (
  <IconButton {...args} />
)

export const Default = Template.bind({})

export const DefaultDarkMode = Template.bind({})
DefaultDarkMode.decorators = [darkMode]
