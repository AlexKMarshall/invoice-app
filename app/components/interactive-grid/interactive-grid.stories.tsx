import { ButtonHTMLAttributes, useRef } from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { InteractiveGrid, useGridCellContent } from '.'

import { Coordinates } from '~/lib/matrix'

const meta: ComponentMeta<typeof InteractiveGrid> = {
  title: 'Components/InteractiveGrid',
  component: InteractiveGrid,
  args: {
    style: {
      display: 'grid',
      width: 'fit-content',
      gridTemplateRows: `repeat(4, 1fr)`,
      gridTemplateColumns: `repeat(3, 1fr)`,
    },
  },
}

type CustomButtonProps = {
  coordinates: Coordinates
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'tabIndex'>
const CustomButton = ({ coordinates, ...props }: CustomButtonProps) => {
  const ref = useRef<HTMLButtonElement>(null)
  const { getCellContentProps } = useGridCellContent({ coordinates, ref })

  return <button {...getCellContentProps(props)} />
}

export default meta

const Template: ComponentStory<typeof InteractiveGrid> = (args) => {
  const matrix = [
    [{ item: 1 }, { item: 2 }, { item: 3 }],
    [{ item: 4 }, { item: 5 }, { item: 6 }],
    [{ item: 7 }, { item: 8 }, { item: 9 }],
    [{ item: 10 }, { item: 11 }, { item: 12 }],
  ]
  const headingRow = ['a', 'x', 'z']
  return (
    <InteractiveGrid {...args} matrix={matrix}>
      <InteractiveGrid.Row style={{ display: 'contents' }}>
        {headingRow.map((headingCell) => (
          <InteractiveGrid.ColumnHeader key={headingCell}>
            {headingCell}
          </InteractiveGrid.ColumnHeader>
        ))}
      </InteractiveGrid.Row>
      {matrix.map((row, rowIndex) => (
        <InteractiveGrid.Row key={rowIndex} style={{ display: 'contents' }}>
          {row.map((cell, columnIndex) => (
            <InteractiveGrid.Cell key={columnIndex}>
              <CustomButton
                coordinates={[rowIndex, columnIndex]}
                style={{
                  minWidth: 44,
                  minHeight: 44,
                  display: 'grid',
                  placeContent: 'center',
                }}
              >
                {cell.item}
              </CustomButton>
            </InteractiveGrid.Cell>
          ))}
        </InteractiveGrid.Row>
      ))}
    </InteractiveGrid>
  )
}

export const Default = Template.bind({})
