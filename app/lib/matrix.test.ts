import {
  Matrix,
  getElement,
  map,
  movePosition,
  setElement,
  toMatrix,
} from './matrix'

describe('toMatrix', () => {
  test('converts array to matrix', () => {
    const array = [1, 2, 3, 4, 5, 6]
    expect(toMatrix(array, 2)).toEqual([
      [1, 2],
      [3, 4],
      [5, 6],
    ])
    expect(toMatrix(array, 3)).toEqual([
      [1, 2, 3],
      [4, 5, 6],
    ])
  })
})

describe('movePosition', () => {
  test('should move stepwise', () => {
    const sourceMatrix = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 9, 0],
    ]

    expect(movePosition(sourceMatrix, [1, 1], 'up')).toEqual([0, 1])
    expect(movePosition(sourceMatrix, [1, 1], 'down')).toEqual([2, 1])
    expect(movePosition(sourceMatrix, [1, 1], 'left')).toEqual([1, 0])
    expect(movePosition(sourceMatrix, [1, 1], 'right')).toEqual([1, 2])
  })
  test('should not leave bounds of matrix', () => {
    const sourceMatrix = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 9, 0],
    ]

    expect(movePosition(sourceMatrix, [0, 1], 'up')).toEqual([0, 1])
    expect(movePosition(sourceMatrix, [2, 1], 'down')).toEqual([2, 1])
    expect(movePosition(sourceMatrix, [1, 0], 'left')).toEqual([1, 0])
    expect(movePosition(sourceMatrix, [1, 2], 'right')).toEqual([1, 2])
  })
  test('returns null for empty matrix', () => {
    const fullyEmpty: Matrix = []
    const emptyRows: Matrix = [[], []]

    expect(movePosition(fullyEmpty, [0, 0], 'up')).toBeNull()
    expect(movePosition(emptyRows, [0, 0], 'up')).toBeNull()
  })
  test.todo('skips null entries when moving', () => {
    const sourceMatrix = [
      [1, null, 3, null],
      [null, 6, null, 8],
      [9, null, null, 12],
      [13, 14, 15, 16],
    ]

    expect(movePosition(sourceMatrix, [0, 0], 'down')).toEqual([2, 0])
  })
})

describe('map', () => {
  test('returns a mapped matrix', () => {
    const matrix = [
      [-4, 2],
      [7, 0],
    ]
    expect(map(matrix, (el) => (el > 0 ? 1 : el < 0 ? -1 : 0))).toEqual([
      [-1, 1],
      [1, 0],
    ])
  })
})

describe('getElement', () => {
  test('returns element at given coordinates', () => {
    const matrix = [
      [1, 2],
      [3, 4],
    ]
    expect(getElement(matrix, [1, 0])).toBe(3)
  })
  test('returns null if coordinates not in matrix', () => {
    const matrix = [
      [1, 2],
      [3, 4],
    ]
    expect(getElement(matrix, [5, 2])).toBe(null)
  })
})

describe('setElement', () => {
  test('mutates matrix with element at coordinates', () => {
    const matrix = [
      [1, 2],
      [3, 4],
    ]
    setElement(matrix, [0, 1], 9)
    expect(matrix).toEqual([
      [1, 9],
      [3, 4],
    ])
  })
  test('can insert into empty matrix', () => {
    const matrix: Matrix<number> = []
    setElement(matrix, [1, 1], 9)
    // eslint-disable-next-line no-sparse-arrays
    expect(matrix).toEqual([, [, 9]])
  })
})
