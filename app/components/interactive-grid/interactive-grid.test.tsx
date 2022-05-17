import { ButtonHTMLAttributes, useRef } from 'react'
import { render, screen } from '@testing-library/react'

import { Coordinates } from '~/lib/matrix'
import { InteractiveGrid } from '.'
import { useGridCellContent } from './cell-content'
import userEvent from '@testing-library/user-event'

describe('<InteractiveGrid/>', () => {
  test('focus management', async () => {
    const matrix = [
      [1, 2],
      [3, 4],
    ]
    const Ui = () => (
      <>
        <button>Before</button>
        <InteractiveGrid matrix={matrix}>
          <InteractiveGrid.Row>
            <InteractiveGrid.ColumnHeader>A</InteractiveGrid.ColumnHeader>
            <InteractiveGrid.ColumnHeader>B</InteractiveGrid.ColumnHeader>
          </InteractiveGrid.Row>
          {matrix.map((row, rowIndex) => (
            <InteractiveGrid.Row key={rowIndex}>
              {row.map((cell, columnIndex) => (
                <InteractiveGrid.Cell key={columnIndex}>
                  <CustomButton coordinates={[rowIndex, columnIndex]}>
                    {cell}
                  </CustomButton>
                </InteractiveGrid.Cell>
              ))}
            </InteractiveGrid.Row>
          ))}
        </InteractiveGrid>
        <button>After</button>
      </>
    )

    render(<Ui />)
    const before = screen.getByRole('button', { name: /before/i })
    const button1 = screen.getByRole('button', { name: /1/i })
    const button2 = screen.getByRole('button', { name: /2/i })
    const button3 = screen.getByRole('button', { name: /3/i })
    const button4 = screen.getByRole('button', { name: /4/i })
    const after = screen.getByRole('button', { name: /after/i })

    // Grid contains only single tab stop
    await userEvent.tab()
    expect(before).toHaveFocus()
    await userEvent.tab()
    expect(button1).toHaveFocus()
    await userEvent.tab()
    expect(after).toHaveFocus()

    // Arrow keys navigate within grid
    await userEvent.tab({ shift: true })
    expect(button1).toHaveFocus()
    await userEvent.keyboard('{ArrowDown}')
    expect(button3).toHaveFocus()

    // Roving focus point is maintained on leaving and re-entering grid
    await userEvent.tab({ shift: true })
    expect(before).toHaveFocus()
    await userEvent.tab()
    expect(button3).toHaveFocus()
  })
})

type CustomButtonProps = {
  coordinates: Coordinates
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'tabIndex'>
const CustomButton = ({ coordinates, ...props }: CustomButtonProps) => {
  const ref = useRef<HTMLButtonElement>(null)
  const { getCellContentProps } = useGridCellContent({ coordinates, ref })

  return <button {...getCellContentProps(props)} />
}
