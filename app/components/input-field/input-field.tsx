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
      className="stack font-size-2 input-field"
      data-invalid={isInvalid || undefined}
      data-readOnly={readOnly || undefined}
    >
      <div className="cluster labels">
        <label htmlFor={id}>{label}</label>
        <p id={errorMessageId} aria-live="polite">
          {errorMessage}
        </p>
      </div>
      <input
        id={id}
        className="surface surface-1 padding-block-4 padding-inline-5 radius-xs font-weight-bold"
        aria-invalid={isInvalid || undefined}
        aria-errormessage={isInvalid ? errorMessageId : undefined}
        readOnly={readOnly}
        {...props}
      />
    </div>
  )
}
