import clsx from 'clsx'
import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfToday,
  startOfWeek,
} from 'date-fns'
import { ButtonHTMLAttributes, useRef } from 'react'

import {
  InteractiveGrid,
  useGridCellContent,
} from '~/components/interactive-grid'
import { Coordinates, toMatrix } from '~/lib/matrix'

type Props = {}
export function Calendar(props: Props): JSX.Element {
  const today = startOfToday()
  const daysOfMonth = eachDayOfInterval({
    start: startOfWeek(startOfMonth(today)),
    end: endOfWeek(endOfMonth(today)),
  })
  const daysMatrix = toMatrix(daysOfMonth, 7)

  return (
    <InteractiveGrid matrix={daysMatrix} className="calendar">
      <InteractiveGrid.Row>
        {weekHeaders.map((day) => (
          <InteractiveGrid.ColumnHeader key={day.label}>
            {day.display}
          </InteractiveGrid.ColumnHeader>
        ))}
      </InteractiveGrid.Row>
      {daysMatrix.map((row, rowIndex) => (
        <InteractiveGrid.Row key={rowIndex}>
          {row.map((day, columnIndex) => (
            <InteractiveGrid.Cell
              key={columnIndex}
              className="cell"
              aria-selected={isSameDay(today, day)}
            >
              <Day
                coordinates={[rowIndex, columnIndex]}
                className={clsx(
                  'touch-target font-weight-bold day',
                  isSameMonth(day, today) ? 'text-strong' : null
                )}
              >
                <time dateTime={format(day, 'yyyy-mm-dd')}>
                  {format(day, 'd')}
                </time>
              </Day>
            </InteractiveGrid.Cell>
          ))}
        </InteractiveGrid.Row>
      ))}
    </InteractiveGrid>
  )
}

const weekHeaders = [
  { display: 'S', label: 'Sunday' },
  { display: 'M', label: 'Monday' },
  { display: 'T', label: 'Tuesday' },
  { display: 'W', label: 'Wednesday' },
  { display: 'T', label: 'Thursday' },
  { display: 'F', label: 'Friday' },
  { display: 'S', label: 'Saturday' },
]

type DayProps = {
  coordinates: Coordinates
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'tabIndex'>
const Day = ({ coordinates, ...props }: DayProps) => {
  const ref = useRef<HTMLButtonElement>(null)
  const { getCellContentProps } = useGridCellContent({ coordinates, ref })

  return <button {...getCellContentProps(props)} />
}
