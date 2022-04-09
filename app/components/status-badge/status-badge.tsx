import clsx from 'clsx'

const statusClassMap = {
  pending: 'status-badge-pending',
  paid: 'status-badge-paid',
  draft: 'status-badge-draft',
}

type Props = {
  status: 'pending' | 'paid' | 'draft'
}
export function StatusBadge({ status }: Props): JSX.Element {
  const baseClass = 'status-badge'
  const statusClass = statusClassMap[status]
  const className = clsx(baseClass, statusClass)

  return <p className={className}>{status}</p>
}
