import { ButtonHTMLAttributes } from 'react'
import clsx from 'clsx'

const colorClassMap = {
  primary: 'button-color-primary',
  secondary: 'button-color-secondary',
  mono: 'button-color-mono',
}

type Props = {
  label: string
  color?: 'primary' | 'secondary' | 'mono'
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'>
export function Button({
  label,
  color = 'primary',
  ...props
}: Props): JSX.Element {
  const baseClass = 'button'
  const colorClass = colorClassMap[color]

  const className = clsx(baseClass, colorClass)
  return (
    <button className={className} {...props}>
      {label}
    </button>
  )
}
