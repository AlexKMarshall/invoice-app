type Props = {
  status: 'pending' | 'paid' | 'draft'
}
export function StatusBadge({ status }: Props): JSX.Element {
  return <p>{status}</p>
}
