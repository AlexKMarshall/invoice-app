import { ArrowRightIcon } from '~/components/icons/arrow-right'
import { InvoiceId } from '~/components/invoice-id'
import { RemixLinkProps } from '@remix-run/react/components'
import { StatusBadge } from '~/components/status-badge'
import clsx from 'clsx'
import { useRef } from 'react'

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
  Link: any // cop-out until possible to mock Remix
  to: RemixLinkProps['to']
}
export function InvoiceSummary({
  id,
  name,
  due,
  amount,
  currency,
  status,
  Link,
  to,
}: Props): JSX.Element {
  const linkRef = useRef<HTMLAnchorElement>(null)

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
    <article
      className={className}
      onClick={() => {
        linkRef.current?.click()
      }}
    >
      <h2 className="heading">
        <Link to={to} ref={linkRef}>
          <InvoiceId id={id} />
        </Link>
      </h2>
      <p className="name">{name}</p>
      <div className="due-amount">
        <p className="due">Due {formattedDueDate}</p>
        <p className="text-color-strong font-size-4 font-weight-bold amount">
          {formattedAmount}
        </p>
      </div>
      <StatusBadge status={status} />
      <ArrowRightIcon className="color-primary" />
    </article>
  )
}
