import clsx from 'clsx'

const statusClassMap = {
  pending: 'bg-pending-transparent text-pending before:bg-pending',
  paid: 'bg-paid-transparent text-paid before:bg-paid',
  draft: clsx(
    'bg-draft-transparent text-draft before:bg-draft',
    'dark:bg-draft-dark-transparent dark:text-draft-dark dark:before:bg-draft'
  ),
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
        'min-w-[6.25rem]', // hack to fix the width
        'before:aspect-square before:w-2 before:rounded-full', // bullet icon
        'status-badge',
        variantClass
      )}
    >
      {status}
    </p>
  )
}
