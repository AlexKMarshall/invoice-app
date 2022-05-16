/** 2-dimensional matrix of values */
export type Matrix<T = unknown> = T[][]
/** [Y-Axis position, X-Axis position], alternatively [Row-index, Column-index] */
type Coordinates = [number, number]
type Move = 'up' | 'down' | 'left' | 'right'

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
