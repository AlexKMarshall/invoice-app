import { ButtonHTMLAttributes, RefObject, useEffect, useRef } from 'react'

import { Coordinates } from '~/lib/matrix'
import { callAllEventHandlers } from '~/lib/event'
import { useGridContext } from './context'

type Props = {
  coordinates: Coordinates
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'role' | 'tabIndex'>

export function Cell({ coordinates, ...props }: Props) {
  const ref = useRef<HTMLButtonElement>(null)

  const { getCellProps } = useGridCell({
    coordinates,
    ref,
  })

  return (
    <button
      {...getCellProps({
        ...props,
      })}
    />
  )
}

type GetCellPropsFn = (
  props?: Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'role' | 'tabIndex'>
) => ButtonHTMLAttributes<HTMLButtonElement>

type UseGridCellProps = {
  coordinates: Coordinates
  ref: RefObject<HTMLButtonElement>
}
export const useGridCell = ({ coordinates, ref }: UseGridCellProps) => {
  const [rowIndex, columnIndex] = coordinates

  const { registerRef, rovingFocusStop, setRovingFocusStop } = useGridContext()

  useEffect(() => {
    registerRef(ref, [rowIndex, columnIndex])
  }, [columnIndex, ref, registerRef, rowIndex])

  const getCellProps: GetCellPropsFn = ({ onClick, ...props } = {}) => ({
    ...props,
    role: 'gridcell',
    ref,
    tabIndex: isCurrentRovingFocus(rovingFocusStop, coordinates) ? 0 : -1,
    onClick: callAllEventHandlers(
      () => setRovingFocusStop(coordinates),
      onClick
    ),
  })

  return { getCellProps }
}

const isCurrentRovingFocus = (
  rovingFocusCoordinates: Coordinates,
  elementCoordinates: Coordinates
) => {
  const [rovingY, rovingX] = rovingFocusCoordinates
  const [elementY, elementX] = elementCoordinates

  return rovingY === elementY && rovingX === elementX
}
