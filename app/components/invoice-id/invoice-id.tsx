type Props = { id: string }
export function InvoiceId({ id }: Props): JSX.Element {
  return <span className="text-strong invoice-id">{id}</span>
}
