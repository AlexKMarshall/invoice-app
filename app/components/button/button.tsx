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
  const utilityClasses = ['radius-pill']
  const blockClass = 'button'
  const variantClass = colorClassMap[color]

  const className = clsx(utilityClasses, blockClass, variantClass)
  return (
    <button className={className} {...props}>
      {label}
    </button>
  )
}
