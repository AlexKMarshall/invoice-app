import { InvoiceId } from '~/components/invoice-id'
import { StatusBadge } from '~/components/status-badge'
import clsx from 'clsx'

const intlDateTimeFormat = new Intl.DateTimeFormat(undefined, {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
})

type Props = {
  id: string
  name: string
  due: Date
  amount: number
  currency: 'GBP'
  status: 'paid' | 'pending' | 'draft'
}
export function InvoiceSummary({
  id,
  name,
  due,
  amount,
  currency,
  status,
}: Props): JSX.Element {
  const formattedDueDate = intlDateTimeFormat.format(due)

  const currencyFormatter = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency,
  })
  const formattedAmount = currencyFormatter.format(amount)
  const utilityClasses = ['surface', 'surface-1', 'radius-m']
  const blockClasses = ['invoice-summary']
  const className = clsx(utilityClasses, blockClasses)

  return (
    <article className={className}>
      <h2>
        <InvoiceId id={id} />
      </h2>
      <p>{name}</p>
      <div className="due-amount">
        <p>Due {formattedDueDate}</p>
        <p className="text-color-strong font-size-4 font-weight-bold">
          {formattedAmount}
        </p>
      </div>
      <StatusBadge status={status} />
    </article>
  )
}
