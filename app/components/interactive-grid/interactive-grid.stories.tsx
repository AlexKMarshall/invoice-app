import { ComponentMeta, ComponentStory } from '@storybook/react'

import { InteractiveGrid } from '.'

const meta: ComponentMeta<typeof InteractiveGrid> = {
  title: 'Components/InteractiveGrid',
  component: InteractiveGrid,
  args: {},
}

export default meta

const Template: ComponentStory<typeof InteractiveGrid> = (args) => (
  <InteractiveGrid {...args} />
)

export const Default = Template.bind({})
