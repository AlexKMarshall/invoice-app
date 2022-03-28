import { Button } from '.'
import { ComponentMeta } from '@storybook/react'

const meta: ComponentMeta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  argTypes: {},
}

export default meta

export const Default = {
  args: {
    label: 'Press Me',
  },
}
