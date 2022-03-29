import { ComponentMeta, ComponentStory } from '@storybook/react'
import { ComponentProps, ReactNode, useLayoutEffect } from 'react'

import { Button } from '.'

const meta: ComponentMeta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  argTypes: {},
}

export default meta

const defaultArgs: ComponentProps<typeof Button> = {
  label: 'Press Me',
}

const Template: ComponentStory<typeof Button> = (args) => (
  <Button {...defaultArgs} {...args} />
)

export const Primary = Template.bind({})

export const Secondary = Template.bind({})
Secondary.args = {
  color: 'secondary',
}

export const SecondaryDarkMode = Template.bind({})
SecondaryDarkMode.args = {
  ...Secondary.args,
}
SecondaryDarkMode.decorators = [
  (Story) => (
    <DarkMode>
      <Story />
    </DarkMode>
  ),
]

export const Mono = Template.bind({})
Mono.args = { color: 'mono' }

export const MonoDarkMode = Template.bind({})
MonoDarkMode.args = { ...Mono.args }
MonoDarkMode.decorators = [
  (Story) => (
    <DarkMode>
      <Story />
    </DarkMode>
  ),
]

export const Danger = Template.bind({})
Danger.args = {
  color: 'danger',
}

function DarkMode({ children }: { children: ReactNode }) {
  useLayoutEffect(() => {
    const body = document.querySelector('body')
    body?.setAttribute('data-theme', 'dark')

    return () => {
      body?.removeAttribute('data-theme')
    }
  }, [])

  return <>{children}</>
}
