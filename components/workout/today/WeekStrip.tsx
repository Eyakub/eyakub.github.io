import { toIsoDate, weekDates, formatDay } from '../../../lib/workout/dates'
import { WEEKDAY_SHORT } from '../../../lib/workout/schedule'
import { weekStatus, type DayState } from '../../../lib/workout/stats'
import type { WorkoutDoc } from '../../../lib/workout/types'
import { CheckIcon, CrossIcon } from '../shell/icons'
import { dayView } from './plan'

interface Props {
  doc: WorkoutDoc
  today: Date
  selected: number
  onSelect: (index: number) => void
}

const STATE_CLASS: Record<DayState, string> = {
  done: 'is-done',
  missed: 'is-miss',
  today: 'is-today',
  upcoming: '',
  recovery: 'is-rec',
  rest: 'is-rest',
}

const STATE_WORD: Partial<Record<DayState, string>> = {
  done: 'done',
  missed: 'missed',
  today: 'today',
  upcoming: 'upcoming',
}

function Glyph({ state }: { state: DayState }) {
  switch (state) {
    case 'done':
      return <CheckIcon />
    case 'missed':
      return <CrossIcon />
    case 'today':
      return <span className="ring" />
    case 'upcoming':
      return <span className="dot" />
    case 'recovery':
      return <span className="dot faint" />
    case 'rest':
      return null
  }
}

export function WeekStrip({ doc, today, selected, onSelect }: Props) {
  const todayIso = toIsoDate(today)
  const dates = weekDates(today)
  return (
    <ol className="week" aria-label="This week">
      {weekStatus(doc, today).map((day, i) => {
        const view = dayView(doc, day.plan)
        // A planned day from before the app existed is 'rest' but has a routine behind it
        const word = STATE_WORD[day.state] ?? (day.plan.kind === 'routine' ? 'before you started' : '')
        const cls = ['wd', STATE_CLASS[day.state], day.date === todayIso ? 'is-today' : ''].filter(Boolean).join(' ')
        return (
          <li key={day.date}>
            <button
              type="button"
              className={cls}
              aria-pressed={selected === i}
              aria-label={`${formatDay(dates[i])}, ${view.name}${word ? `, ${word}` : ''}`}
              onClick={() => onSelect(i)}
            >
              <span className="wd-d">{WEEKDAY_SHORT[i][0]}</span>
              <span className="wd-n">{dates[i].getDate()}</span>
              <span className="wd-t">{view.short}</span>
              <span className="wd-s">
                <Glyph state={day.state} />
              </span>
            </button>
          </li>
        )
      })}
    </ol>
  )
}
