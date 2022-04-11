import { Children, ReactNode } from 'react'

type Props = { children: ReactNode }
export function InvoiceList({ children }: Props): JSX.Element {
  return (
    <ul className="stack invoice-list">
      {Children.map(children, (child) => (
        <li>{child}</li>
      ))}
    </ul>
  )
}
