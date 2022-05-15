import { InputHTMLAttributes, ReactNode } from 'react'

import { useCheckboxGroup } from '../checkbox-group'

type Props = { children: ReactNode } & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'className' | 'type'
>
export function Checkbox({
  children,
  name: nameOverride,
  ...props
}: Props): JSX.Element {
  const checkboxGroup = useCheckboxGroup()
  const name = nameOverride ?? checkboxGroup?.name

  return (
    <label className="checkbox text-strong">
      <input type="checkbox" name={name} {...props} />
      {children}
    </label>
  )
}
