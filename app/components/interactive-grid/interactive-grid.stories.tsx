import { ComponentMeta, ComponentStory } from '@storybook/react'

import { InteractiveGrid } from '.'

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
            <InteractiveGrid.Cell
              key={columnIndex}
              coordinates={[rowIndex, columnIndex]}
              style={{
                minWidth: 44,
                minHeight: 44,
                display: 'grid',
                placeContent: 'center',
              }}
            >
              {cell.item}
            </InteractiveGrid.Cell>
          ))}
        </InteractiveGrid.Row>
      ))}
    </InteractiveGrid>
  )
}

export const Default = Template.bind({})
