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
  const utilityClasses = ['radius-s']
  const blockClass = 'status-badge'
  const variantClass = statusClassMap[status]
  const className = clsx(utilityClasses, blockClass, variantClass)

  return <p className={className}>{status}</p>
}
