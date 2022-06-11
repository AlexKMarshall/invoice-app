import clsx from 'clsx'

const statusClassMap = {
  pending: 'status-color-pending',
  paid: 'status-color-paid',
  draft: 'status-color-draft',
}

type Props = {
  status: 'pending' | 'paid' | 'draft'
}
export function StatusBadge({ status }: Props): JSX.Element {
  return (
    <p
      className={clsx(
        'status-color inline-flex items-baseline justify-center gap-2 rounded bg-status-transparent px-4 py-3 font-bold capitalize text-status',
        'min-w-[6.25rem]', // hack to fix the width
        'before:aspect-square before:w-2 before:rounded-full before:bg-status', // bullet icon
        statusClassMap[status]
      )}
    >
      {status}
    </p>
  )
}
