import { HTMLAttributes } from 'react'

type Props = Omit<HTMLAttributes<HTMLDivElement>, 'role'>
export function Row(props: Props): JSX.Element {
  return <div {...props} role="row" />
}
