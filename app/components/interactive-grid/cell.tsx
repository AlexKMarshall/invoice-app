import { HTMLAttributes } from 'react'

type Props = Omit<HTMLAttributes<HTMLDivElement>, 'role'>

export function Cell(props: Props) {
  return <div {...props} role="gridcell" />
}

type GetCellPropsFn = (
  props?: Omit<HTMLAttributes<HTMLDivElement>, 'role'>
) => HTMLAttributes<HTMLDivElement>

export const useGridCell = () => {
  const getCellProps: GetCellPropsFn = ({ ...props } = {}) => ({
    ...props,
    role: 'gridcell',
  })

  return { getCellProps }
}
