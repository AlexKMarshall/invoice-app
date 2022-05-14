import { InputHTMLAttributes, ReactNode } from 'react'

type Props = { label: ReactNode } & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'className' | 'type'
>
export function Checkbox({ label, ...props }: Props): JSX.Element {
  return (
    <label className="checkbox text-strong">
      <input type="checkbox" {...props} />
      {label}
    </label>
  )
}
