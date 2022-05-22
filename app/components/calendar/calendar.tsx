import { ButtonHTMLAttributes, useRef, useReducer, HTMLAttributes } from 'react'
import { Coordinates, Matrix, toMatrix } from '~/lib/matrix'
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
  monthsToQuarters,
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
  const previousMonth = addMonths(visibleMonth, -1)
  const nextMonth = addMonths(visibleMonth, 1)

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
      <div className="grid-wrapper">
        <CalendarGrid
          key={previousMonth.toISOString()}
          onSelectDate={(date) =>
            dispatch({ type: 'selectDate', payload: date })
          }
          month={previousMonth}
          selectedDate={selectedDate}
          data-month="previous"
          aria-hidden
        />
        <CalendarGrid
          key={visibleMonth.toISOString()}
          aria-labelledby={labelId}
          onSelectDate={(date) =>
            dispatch({ type: 'selectDate', payload: date })
          }
          month={visibleMonth}
          selectedDate={selectedDate}
        />
        <CalendarGrid
          key={nextMonth.toISOString()}
          onSelectDate={(date) =>
            dispatch({ type: 'selectDate', payload: date })
          }
          month={nextMonth}
          selectedDate={selectedDate}
          data-month="next"
          aria-hidden
        />
      </div>
    </div>
  )
}

type CalendarGridProps = {
  month: Date
  selectedDate: Date | null
  onSelectDate: (date: Date) => void
} & Omit<HTMLAttributes<HTMLDivElement>, 'className'>
const CalendarGrid = ({
  month,
  selectedDate,
  onSelectDate,
  ...props
}: CalendarGridProps) => {
  const daysOfMonth = eachDayOfInterval({
    start: startOfWeek(startOfMonth(month)),
    end: endOfWeek(endOfMonth(month)),
  })
  const daysMatrix = toMatrix(daysOfMonth, 7)
  return (
    <InteractiveGrid matrix={daysMatrix} className="calendar-grid" {...props}>
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
              key={day.toISOString()}
              className="cell"
              aria-selected={
                !selectedDate ? undefined : isSameDay(selectedDate, day)
              }
            >
              <Day
                coordinates={[rowIndex, columnIndex]}
                className={clsx(
                  'touch-target font-weight-bold day',
                  isSameMonth(day, month) ? 'text-strong' : null
                )}
                aria-label={format(day, 'do MMM yyyy iiii')}
                onClick={() => onSelectDate(day)}
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
