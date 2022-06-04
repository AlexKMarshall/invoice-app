import { ButtonHTMLAttributes, ReactNode } from 'react'

type Props = {
  icon: ReactNode
  label: string
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'>
export function IconButton({ icon, label, ...props }: Props): JSX.Element {
  return (
    <button {...props} className="tap-target radius-circle icon-button">
      {icon}
      <span className="sr-only">{label}</span>
    </button>
  )
}
