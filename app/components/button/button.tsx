import { ButtonHTMLAttributes } from 'react'
import clsx from 'clsx'

const colorClassMap = {
  primary: 'button-color-primary',
  secondary: 'button-color-secondary',
  mono: 'button-color-mono',
  danger: 'button-color-danger',
}

type Props = {
  label: string
  color?: 'primary' | 'secondary' | 'mono' | 'danger'
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'>
export function Button({
  label,
  color = 'primary',
  ...props
}: Props): JSX.Element {
  const blockClass = 'button'
  const variantClass = colorClassMap[color]

  return (
    <button
      className={clsx(
        'rounded-full py-4 px-6 font-bold outline outline-offset-0 outline-transparent',
        'focus-visible:outline-2 focus-visible:outline-offset-4',
        'button-color',
        blockClass,
        variantClass
      )}
      {...props}
    >
      {label}
    </button>
  )
}
