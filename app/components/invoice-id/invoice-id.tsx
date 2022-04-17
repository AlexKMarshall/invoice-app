type Props = { id: string }
export function InvoiceId({ id }: Props): JSX.Element {
  return <span className="text-strong text-uppercase invoice-id">{id}</span>
}
