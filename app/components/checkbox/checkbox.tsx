import { InputHTMLAttributes, ReactNode } from 'react'

import clsx from 'clsx'
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
    <label
      className={clsx(
        'touch-target grid grid-cols-[1em_auto] items-center gap-[1em] text-strong',
        'checkbox'
      )}
    >
      <input
        type="checkbox"
        name={name}
        className={clsx(
          'm-0 grid h-[1.15em] w-[1.15em] translate-y-[-0.1em] appearance-none place-content-center rounded-sm border-2 border-transparent bg-surface-alt text-current outline-2 outline-offset-0 outline-transparent',
          'before:h-[0.65em] before:w-[0.65em] before:origin-bottom-left before:scale-0 before:shadow-[inset_1em_1em] before:shadow-white', // checkmark
          'before:[clip-path:polygon(14%_44%,0_65%,50%_100%,100%_16%,80%_0%,43%_62%)]', // checkmark polygon
          'checked:bg-primary checked:before:scale-100',
          'hover:border-primary',
          'focus-visible:outline-offset-4 focus-visible:outline-primary'
        )}
        {...props}
      />
      {children}
    </label>
  )
}
