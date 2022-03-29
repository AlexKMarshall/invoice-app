import { Button } from '.'
import { ComponentMeta } from '@storybook/react'
import { ComponentProps } from 'react'

const meta: ComponentMeta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  argTypes: {},
}

export default meta

type ButtonStory = {
  args: ComponentProps<typeof Button>
}

const defaultArgs: ButtonStory['args'] = {
  label: 'Press Me',
}

export const Primary: ButtonStory = {
  args: {
    ...defaultArgs,
    color: 'primary',
  },
}

export const Secondary: ButtonStory = {
  args: {
    ...defaultArgs,
    color: 'secondary',
  },
}

export const Mono: ButtonStory = {
  args: {
    ...defaultArgs,
    color: 'mono',
  },
}

export const Danger: ButtonStory = {
  args: {
    ...defaultArgs,
    color: 'danger',
  },
}
