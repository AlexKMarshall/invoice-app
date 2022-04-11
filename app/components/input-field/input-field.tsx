import { InputHTMLAttributes } from 'react'

type Props = { label: string; id: string } & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'className'
>
export function InputField({ label, id, ...props }: Props): JSX.Element {
  return (
    <div className="stack font-size-2 input-field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        className="surface surface-1 padding-block-4 padding-inline-5 radius-xs font-weight-bold"
        {...props}
      />
    </div>
  )
}
