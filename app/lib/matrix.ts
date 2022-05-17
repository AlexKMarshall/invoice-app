/** 2-dimensional matrix of values */
export type Matrix<T = unknown> = T[][]
/** [Y-Axis position, X-Axis position], alternatively [Row-index, Column-index] */
export type Coordinates = [number, number]
export type Move = 'up' | 'down' | 'left' | 'right'

const buildEmptyMatrix = ({
  rows,
  columns,
}: {
  rows: number
  columns: number
}): Matrix<null> =>
  Array.from({ length: rows }, () =>
    Array.from({ length: columns }, () => null)
  )

const getLinearIndex = (
  columnCount: number,
  coordinates: Coordinates
): number => {
  const [rowIndex, columnIndex] = coordinates
  return rowIndex * columnCount + columnIndex
}

export const toMatrix = <T>(array: T[], columnCount: number): Matrix<T> => {
  const rowCount = Math.ceil(array.length / columnCount)
  const emptyMatrix = buildEmptyMatrix({ rows: rowCount, columns: columnCount })

  return map(emptyMatrix, (el, coordinates) => {
    const linearIndex = getLinearIndex(columnCount, coordinates)
    return array[linearIndex]
  })
}

const moveOffset: Record<Move, Coordinates> = {
  up: [-1, 0],
  down: [1, 0],
  left: [0, -1],
  right: [0, 1],
}

/**
 * Move inside a matrix of values
 * @param matrix a 2 dimensional matrix
 * @param origin starting coordinates for the move
 * @param move move to make
 * @returns new coordinates
 */
export const movePosition = (
  matrix: Matrix,
  origin: Coordinates,
  move: Move
): Coordinates | null => {
  if (matrix.length === 0 || matrix.every((row) => row.length === 0)) {
    return null
  }
  const [originY, originX] = origin
  const [offsetY, offSetX] = moveOffset[move]

  const minY = 0
  const minX = 0
  const maxY = matrix.length - 1
  const maxX = matrix[0].length - 1

  const newY = clamp(minY, originY + offsetY, maxY)
  const newX = clamp(minX, originX + offSetX, maxX)

  return [newY, newX]
}

const clamp = (min: number, target: number, max: number): number => {
  return Math.min(Math.max(target, min), max)
}

export const map = <T, U>(
  matrix: Matrix<T>,
  transformFn: (el: T, coordinates: Coordinates, matrix: Matrix<T>) => U
): Matrix<U> => {
  return matrix.map((row, rowIndex) =>
    row.map((element, columnIndex) =>
      transformFn(element, [rowIndex, columnIndex], matrix)
    )
  )
}

export const getElement = <T>(
  matrix: Matrix<T>,
  coordinates: Coordinates
): T | null => {
  const [rowIndex, colIndex] = coordinates
  return matrix[rowIndex]?.[colIndex] ?? null
}

export const setElement = <T>(
  matrix: Matrix<T>,
  [rowIndex, columnIndex]: Coordinates,
  element: T
) => {
  const row = matrix[rowIndex] ?? []
  row[columnIndex] = element
  matrix[rowIndex] = row
}
