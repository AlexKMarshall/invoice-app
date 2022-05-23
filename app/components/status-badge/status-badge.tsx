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
  const variantClass = statusClassMap[status]

  return (
    <p
      className={clsx(
        'inline-flex items-baseline justify-center gap-2 rounded px-4 py-3 font-bold capitalize',
        'before:aspect-square before:w-2 before:rounded-full', // bullet icon
        'status-badge',
        variantClass
      )}
    >
      {status}
    </p>
  )
}
