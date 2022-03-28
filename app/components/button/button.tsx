type Props = {
  label: string
}
export function Button({ label }: Props): JSX.Element {
  return <button className="button button-primary">{label}</button>
}
