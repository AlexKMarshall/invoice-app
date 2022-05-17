import {
  Coordinates,
  Matrix,
  Move,
  getElement,
  movePosition,
  setElement,
} from '~/lib/matrix'
import {
  HTMLAttributes,
  KeyboardEventHandler,
  RefObject,
  useCallback,
  useRef,
  useState,
} from 'react'

import { Cell } from './cell'
import { ColumnHeader } from './column-header'
import { Provider } from './context'
import { Row } from './row'
import { callAllEventHandlers } from '~/lib/event'

type GetGridPropsFn = (
  props?: Omit<HTMLAttributes<HTMLDivElement>, 'role'>
) => HTMLAttributes<HTMLDivElement>

type Props<T extends unknown> = {
  matrix: Matrix<T>
  defaultFocusStop?: Coordinates
} & Omit<HTMLAttributes<HTMLDivElement>, 'role'>
export function InteractiveGrid<T extends unknown>({
  matrix,
  defaultFocusStop,
  ...props
}: Props<T>): JSX.Element {
  const { registerRef, getGridProps, rovingFocusStop, setRovingFocusStop } =
    useGridWrapper({ matrix, defaultFocusStop })

  return (
    <Provider value={{ rovingFocusStop, registerRef, setRovingFocusStop }}>
      <div {...getGridProps(props)}></div>
    </Provider>
  )
}

InteractiveGrid.Row = Row
InteractiveGrid.ColumnHeader = ColumnHeader
InteractiveGrid.Cell = Cell

const keyMoveMap: Record<string, Move | undefined> = {
  ArrowUp: 'up',
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowRight: 'right',
}

type UseGridWrapperProps = {
  matrix: Matrix
  defaultFocusStop?: Coordinates
}
const useGridWrapper = ({ matrix, defaultFocusStop }: UseGridWrapperProps) => {
  const refsMatrix = useRef<Matrix<RefObject<HTMLButtonElement> | undefined>>(
    []
  )

  const registerRef = useCallback(
    (ref: RefObject<HTMLButtonElement>, coordinates: Coordinates) => {
      setElement(refsMatrix.current, coordinates, ref)
    },
    []
  )

  const [rovingFocusStop, setRovingFocusStop] = useState<Coordinates>(
    defaultFocusStop ?? [0, 0]
  )

  const moveFocus = (move: Move) => {
    const newPosition = movePosition(matrix, rovingFocusStop, move)
    if (!newPosition) return

    const refToFocus = getElement(refsMatrix.current, newPosition)
    refToFocus?.current?.focus()
    setRovingFocusStop(newPosition)
  }

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    const { key } = event
    const move = keyMoveMap[key]
    if (!move) return
    moveFocus(move)
  }

  const getGridProps: GetGridPropsFn = ({ onKeyDown, ...props } = {}) => ({
    ...props,
    role: 'grid',
    onKeyDown: callAllEventHandlers(handleKeyDown, onKeyDown),
  })

  return { getGridProps, registerRef, rovingFocusStop, setRovingFocusStop }
}
