import { HTMLAttributes } from 'react'

type Props = Omit<HTMLAttributes<HTMLDivElement>, 'role'>
export function ColumnHeader(props: Props): JSX.Element {
  return <div {...props} role="columnheader" />
}
