import { useEffect, useState } from 'react'
import { useWorkout } from '../../../contexts/WorkoutContext'
import { formatDay, toIsoDate, weekDates, weekNumberSince, weekdayIndex } from '../../../lib/workout/dates'
import { planFor, type MeasurementField } from '../../../lib/workout/doc'
import { estimateMinutes } from '../../../lib/workout/stats'
import { LogMeasurementSheet } from './LogMeasurementSheet'
import { PlanCard } from './PlanCard'
import { StatGrid } from './StatGrid'
import { WeekStrip } from './WeekStrip'
import { dayView, totalSets } from './plan'

// A tab left open overnight should roll over to the next day when you come back to it
function useToday(): Date {
  const [today, setToday] = useState(() => new Date())
  useEffect(() => {
    const refresh = () =>
      setToday((prev) => {
        const now = new Date()
        return toIsoDate(now) === toIsoDate(prev) ? prev : now
      })
    document.addEventListener('visibilitychange', refresh)
    return () => document.removeEventListener('visibilitychange', refresh)
  }, [])
  return today
}

export function TodayView() {
  const { doc } = useWorkout()
  const today = useToday()
  const [picked, setPicked] = useState<number | null>(null)
  const [logging, setLogging] = useState<MeasurementField | null>(null)
  if (!doc) return null

  const selected = picked ?? weekdayIndex(today)
  const view = dayView(doc, planFor(doc, today))
  const meta =
    view.kind === 'routine'
      ? `${view.routine.items.length} exercises · ${totalSets(view.routine)} sets · about ${estimateMinutes(view.routine)} min`
      : view.kind === 'recovery'
        ? 'Easy movement. Nothing heavy.'
        : 'No training planned.'

  return (
    <div className="screen">
      <div className="topline">
        <span className="eyebrow">
          {formatDay(today)} · Week {weekNumberSince(doc.createdAt, today)}
        </span>
      </div>
      <section className="day-hero">
        <p className="eyebrow">Today</p>
        <h1 className="display day-title">{view.title}</h1>
        <p className="day-meta">{meta}</p>
      </section>
      <WeekStrip doc={doc} today={today} selected={selected} onSelect={setPicked} />
      <PlanCard doc={doc} date={weekDates(today)[selected]} isToday={selected === weekdayIndex(today)} />
      <StatGrid doc={doc} today={today} />
      <div className="quick">
        <button type="button" className="btn" onClick={() => setLogging('weightKg')}>
          Log weight
        </button>
        <button type="button" className="btn" onClick={() => setLogging('waistIn')}>
          Log waist
        </button>
      </div>
      <LogMeasurementSheet field={logging} today={today} onClose={() => setLogging(null)} />
    </div>
  )
}
