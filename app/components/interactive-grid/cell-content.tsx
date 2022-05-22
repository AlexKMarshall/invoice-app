import { ButtonHTMLAttributes, RefObject, useEffect } from 'react'

import { Coordinates } from '~/lib/matrix'
import { callAllEventHandlers } from '~/lib/event'
import { useGridContext } from './context'

type UseGridCellContentProps = {
  coordinates: Coordinates
  ref: RefObject<HTMLButtonElement>
}
export const useGridCellContent = ({
  coordinates,
  ref,
}: UseGridCellContentProps) => {
  const [rowIndex, columnIndex] = coordinates
  const { rovingFocusStop, setRovingFocusStop, registerRef } = useGridContext()
  useEffect(() => {
    registerRef(ref, [rowIndex, columnIndex])
  }, [columnIndex, ref, registerRef, rowIndex])

  const getCellContentProps: GetCellContentPropsFn = ({
    onClick,
    ...props
  } = {}) => ({
    ...props,
    ref,
    tabIndex: isCurrentRovingFocus(rovingFocusStop, coordinates) ? 0 : -1,
    onClick: callAllEventHandlers(
      () => setRovingFocusStop(coordinates),
      onClick
    ),
  })

  return { getCellContentProps }
}

type GetCellContentPropsFn = (
  props: Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'tabIndex'>
) => ButtonHTMLAttributes<HTMLButtonElement>

const isCurrentRovingFocus = (
  rovingFocusCoordinates: Coordinates,
  elementCoordinates: Coordinates
) => {
  const [rovingY, rovingX] = rovingFocusCoordinates
  const [elementY, elementX] = elementCoordinates

  return rovingY === elementY && rovingX === elementX
}
