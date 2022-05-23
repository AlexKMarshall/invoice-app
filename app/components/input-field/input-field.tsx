import clsx from 'clsx'
import { InputHTMLAttributes } from 'react'

type Props = { label: string; id: string; errorMessage?: string } & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'className' | 'aria-invalid' | 'aria-errormessage' | 'id'
>
export function InputField({
  label,
  id,
  errorMessage = '',
  readOnly,
  ...props
}: Props): JSX.Element {
  const errorMessageId = `${id}-error`
  const isInvalid = Boolean(errorMessage)

  return (
    <div
      className={clsx('stack gap-2', 'font-size-2 input-field')}
      data-invalid={isInvalid || undefined}
      data-readonly={readOnly || undefined}
    >
      <div className="cluster labels">
        <label htmlFor={id}>{label}</label>
        <p id={errorMessageId} aria-live="polite">
          {errorMessage}
        </p>
      </div>
      <input
        id={id}
        className={clsx(
          'rounded-sm border-none px-5 py-4 font-bold text-strong outline outline-1'
        )}
        aria-invalid={isInvalid || undefined}
        aria-errormessage={isInvalid ? errorMessageId : undefined}
        readOnly={readOnly}
        {...props}
      />
    </div>
  )
}
