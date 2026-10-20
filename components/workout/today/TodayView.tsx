import { useEffect, useState } from 'react'
import { useWorkout } from '../../../contexts/WorkoutContext'
import { formatDay, toIsoDate, weekNumberSince } from '../../../lib/workout/dates'
import { currentRoutine, type MeasurementField } from '../../../lib/workout/doc'
import { nextUp } from '../../../lib/workout/rotation'
import { estimateMinutes } from '../../../lib/workout/stats'
import { LogMeasurementSheet } from './LogMeasurementSheet'
import { PlanCard } from './PlanCard'
import { StatGrid } from './StatGrid'
import { WeekSummary } from './WeekSummary'
import { totalSets } from './plan'

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
  const [logging, setLogging] = useState<MeasurementField | null>(null)
  const routine = doc ? currentRoutine(doc, nextUp(doc)) : undefined
  if (!doc || !routine) return null

  return (
    <div className="screen">
      <div className="topline">
        <span className="eyebrow">
          {formatDay(today)} · Week {weekNumberSince(doc.createdAt, today)}
        </span>
      </div>
      <section className="day-hero">
        <p className="eyebrow">Up next</p>
        <h1 className="display day-title">{routine.name}</h1>
        <p className="day-meta">
          {routine.items.length} exercises · {totalSets(routine)} sets · about {estimateMinutes(routine)} min
        </p>
      </section>
      <WeekSummary doc={doc} today={today} />
      <PlanCard routine={routine} />
      <StatGrid doc={doc} />
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
