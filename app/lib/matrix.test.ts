import { Matrix, movePosition } from './matrix'

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
