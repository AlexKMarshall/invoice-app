import {
  ButtonHTMLAttributes,
  Dispatch,
  EventHandler,
  KeyboardEventHandler,
  ReactNode,
  RefObject,
  SetStateAction,
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import {
  Coordinates,
  Matrix,
  Move,
  getElement,
  movePosition,
  setElement,
} from '~/lib/matrix'

type Props = {
  // /** [row count, column count] */
  // size: [number, number]
}
export function InteractiveGrid(props: Props): JSX.Element {
  const headingRow = ['a', 'b', 'c']
  const matrix = [
    [
      { item: 1, ref: useRef<HTMLButtonElement>(null) },
      { item: 2, ref: useRef<HTMLButtonElement>(null) },
      { item: 3, ref: useRef<HTMLButtonElement>(null) },
    ],
    [
      { item: 4, ref: useRef<HTMLButtonElement>(null) },
      { item: 5, ref: useRef<HTMLButtonElement>(null) },
      { item: 6, ref: useRef<HTMLButtonElement>(null) },
    ],
    [
      { item: 7, ref: useRef<HTMLButtonElement>(null) },
      { item: 8, ref: useRef<HTMLButtonElement>(null) },
      { item: 9, ref: useRef<HTMLButtonElement>(null) },
    ],
    [
      { item: 10, ref: useRef<HTMLButtonElement>(null) },
      { item: 11, ref: useRef<HTMLButtonElement>(null) },
      { item: 12, ref: useRef<HTMLButtonElement>(null) },
    ],
  ]

  const refsMatrix = useRef<Matrix<RefObject<HTMLButtonElement> | undefined>>(
    []
  )

  const registerRef = useCallback(
    (ref: RefObject<HTMLButtonElement>, coordinates: Coordinates) => {
      setElement(refsMatrix.current, coordinates, ref)
    },
    []
  )

  const [rovingFocusStop, setRovingFocusStop] = useState<Coordinates>([0, 0])

  const rowCount = matrix.length
  const columnCount = matrix[0].length

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

  const getGridProps = () => ({
    role: 'grid',
    onKeyDown: handleKeyDown,
  })

  const getRowProps = () => ({
    role: 'row',
  })

  const getColumnHeaderProps = () => ({
    role: 'columnheader',
  })

  return (
    <div
      style={{
        display: 'grid',
        width: 'fit-content',
        gridTemplateRows: `repeat(${rowCount}, 1fr)`,
        gridTemplateColumns: `repeat(${columnCount}, 1fr`,
      }}
      {...getGridProps()}
    >
      <div {...getRowProps()} style={{ display: 'contents' }}>
        {headingRow.map((headingCell) => (
          <div key={headingCell} {...getColumnHeaderProps()}>
            {headingCell}
          </div>
        ))}
      </div>
      {matrix.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: 'contents' }} {...getRowProps()}>
          {row.map((cell, columnIndex) => (
            <GridCell
              key={columnIndex}
              rovingFocusStop={rovingFocusStop}
              setRovingFocusStop={setRovingFocusStop}
              coordinates={[rowIndex, columnIndex]}
              registerRef={registerRef}
            >
              {cell.item}
            </GridCell>
          ))}
        </div>
      ))}
    </div>
  )
}

type GetCellPropsFn = (
  props: ButtonHTMLAttributes<HTMLButtonElement>
) => ButtonHTMLAttributes<HTMLButtonElement>

type GridCellProps = {
  coordinates: Coordinates
  rovingFocusStop: Coordinates
  setRovingFocusStop: Dispatch<SetStateAction<Coordinates>>
  registerRef: (
    ref: RefObject<HTMLButtonElement>,
    coordinates: Coordinates
  ) => void
  children: ReactNode
}
function GridCell({
  coordinates,
  registerRef,
  rovingFocusStop,
  setRovingFocusStop,
  children,
}: GridCellProps) {
  const [rowIndex, columnIndex] = coordinates
  const ref = useRef<HTMLButtonElement>(null)

  const { getCellProps } = useGridCell({
    coordinates,
    rovingFocusStop,
    setRovingFocusStop,
    registerRef,
    ref,
  })

  return (
    <button
      key={columnIndex}
      {...getCellProps({
        style: {
          minWidth: 44,
          minHeight: 44,
          display: 'grid',
          placeContent: 'center',
        },
      })}
    >
      {children}
    </button>
  )
}

const isCurrentRovingFocus = (
  rovingFocusCoordinates: Coordinates,
  elementCoordinates: Coordinates
) => {
  const [rovingY, rovingX] = rovingFocusCoordinates
  const [elementY, elementX] = elementCoordinates

  return rovingY === elementY && rovingX === elementX
}

const keyMoveMap: Record<string, Move | undefined> = {
  ArrowUp: 'up',
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowRight: 'right',
}

const callAllEventHandlers =
  <E extends SyntheticEvent>(...handlers: Array<EventHandler<E> | undefined>) =>
  (event: E) => {
    handlers.forEach((handler) => handler?.(event))
  }

type UseGridCellProps = {
  coordinates: Coordinates
  rovingFocusStop: Coordinates
  setRovingFocusStop: Dispatch<SetStateAction<Coordinates>>
  registerRef: (
    ref: RefObject<HTMLButtonElement>,
    coordinates: Coordinates
  ) => void
  ref: RefObject<HTMLButtonElement>
}
const useGridCell = ({
  coordinates,
  rovingFocusStop,
  setRovingFocusStop,
  registerRef,
  ref,
}: UseGridCellProps) => {
  const [rowIndex, columnIndex] = coordinates

  useEffect(() => {
    registerRef(ref, [rowIndex, columnIndex])
  }, [columnIndex, ref, registerRef, rowIndex])

  const getCellProps: GetCellPropsFn = ({ onClick, ...props }) => ({
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
