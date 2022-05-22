import { ButtonHTMLAttributes, useRef, useReducer } from 'react'
import { Coordinates, toMatrix } from '~/lib/matrix'
import {
  InteractiveGrid,
  useGridCellContent,
} from '~/components/interactive-grid'
import {
  addMonths,
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

import clsx from 'clsx'
import { IconButton } from '../icon-button'
import { ArrowLeftIcon } from '../icons/arrow-left'
import { ArrowRightIcon } from '../icons/arrow-right'

type State = {
  visibleMonth: Date
  selectedDate: Date | null
}
type Action =
  | {
      type: 'nextMonth'
    }
  | { type: 'previousMonth' }
  | { type: 'selectDate'; payload: Date }
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'nextMonth':
      return { ...state, visibleMonth: addMonths(state.visibleMonth, 1) }
    case 'previousMonth':
      return { ...state, visibleMonth: addMonths(state.visibleMonth, -1) }
    case 'selectDate':
      return {
        ...state,
        selectedDate: action.payload,
        visibleMonth: action.payload,
      }
  }
}

type Props = { id: string; defaultSelectedDate?: Date }
export function Calendar({
  id,
  defaultSelectedDate,
  ...props
}: Props): JSX.Element {
  const [{ visibleMonth, selectedDate }, dispatch] = useReducer(reducer, {
    selectedDate: defaultSelectedDate ?? null,
    visibleMonth: defaultSelectedDate ?? startOfToday(),
  })
  const daysOfMonth = eachDayOfInterval({
    start: startOfWeek(startOfMonth(visibleMonth)),
    end: endOfWeek(endOfMonth(visibleMonth)),
  })
  const daysMatrix = toMatrix(daysOfMonth, 7)

  const labelId = `${id}-label`

  return (
    <div className="stack calendar">
      <div className="header">
        <IconButton
          icon={<ArrowLeftIcon className="width-3" />}
          label="Previous month"
          onClick={() => dispatch({ type: 'previousMonth' })}
        />
        <div id={labelId} className="text-strong font-weight-bold">
          {format(visibleMonth, 'MMM yyyy')}
        </div>
        <IconButton
          icon={<ArrowRightIcon className="width-3" />}
          label="Next month"
          onClick={() => dispatch({ type: 'nextMonth' })}
        />
      </div>
      <InteractiveGrid
        key={visibleMonth.toString()}
        matrix={daysMatrix}
        className="calendar-grid"
        aria-labelledby={labelId}
      >
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
                aria-selected={
                  !selectedDate ? undefined : isSameDay(selectedDate, day)
                }
              >
                <Day
                  coordinates={[rowIndex, columnIndex]}
                  className={clsx(
                    'touch-target font-weight-bold day',
                    isSameMonth(day, visibleMonth) ? 'text-strong' : null
                  )}
                  aria-label={format(day, 'do MMM yyyy iiii')}
                  onClick={() => dispatch({ type: 'selectDate', payload: day })}
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
    </div>
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
