import { ArrowRightIcon } from '~/components/icons/arrow-right'
import { InvoiceId } from '~/components/invoice-id'
import { StatusBadge } from '~/components/status-badge'
import clsx from 'clsx'
import useClickUnlessDrag from '~/hooks/use-click-unless-drag'
import {
  ForwardRefExoticComponent,
  MouseEventHandler,
  ReactNode,
  RefAttributes,
  useRef,
} from 'react'

const intlDateTimeFormat = new Intl.DateTimeFormat(undefined, {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
})

type LinkProps = {
  className?: string
  children: ReactNode
}
type Link = ForwardRefExoticComponent<
  LinkProps & RefAttributes<HTMLAnchorElement>
>

type Props = {
  id: string
  name: string
  due: Date
  amount: number
  currency: 'GBP'
  status: 'paid' | 'pending' | 'draft'
  Link: Link
  onClick?: MouseEventHandler
}
export function InvoiceSummary({
  id,
  name,
  due,
  amount,
  currency,
  status,
  Link,
  onClick,
}: Props): JSX.Element {
  const linkRef = useRef<HTMLAnchorElement>(null)

  const formattedDueDate = intlDateTimeFormat.format(due)

  const currencyFormatter = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency,
  })
  const formattedAmount = currencyFormatter.format(amount)

  const utilityClasses = ['surface1', 'radius-m']
  const blockClasses = ['invoice-summary']
  const className = clsx(utilityClasses, blockClasses)

  const dragOrClickProps = useClickUnlessDrag({
    minDragTime: 200,
    onClick: (e) => {
      linkRef.current?.click()
      onClick?.(e)
    },
  })

  return (
    <article className={className} {...dragOrClickProps}>
      <h2 className="heading">
        <Link ref={linkRef}>
          <InvoiceId id={id} />
        </Link>
      </h2>
      <p className="name">{name}</p>
      <div className="due-amount">
        <p className="due">Due {formattedDueDate}</p>
        <p className="text-strong font-size-4 font-weight-bold amount">
          {formattedAmount}
        </p>
      </div>
      <StatusBadge status={status} />
      <ArrowRightIcon className="color-primary" />
    </article>
  )
}
