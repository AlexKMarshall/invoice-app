type Props = { id: string }
export function InvoiceId({ id }: Props): JSX.Element {
  return <span className="invoice-id">{id}</span>
}
