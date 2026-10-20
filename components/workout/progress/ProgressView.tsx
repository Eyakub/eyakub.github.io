import { useWorkout } from '../../../contexts/WorkoutContext'
import { formatDayMonth, parseIsoDate } from '../../../lib/workout/dates'
import { measurementSeries } from '../../../lib/workout/doc'
import { formatInches, formatKg } from '../../../lib/workout/format'
import { weekTotals } from '../../../lib/workout/progress'
import { chronological, recentWeeks } from '../../../lib/workout/rotation'
import { useToday } from '../shell/useToday'
import { ExerciseSection } from './ExerciseSection'
import { MeasureSection } from './MeasureSection'
import { WeeksSection } from './WeeksSection'

export function ProgressView() {
  const { doc } = useWorkout()
  const today = useToday()
  if (!doc) return null

  const weeks = weekTotals(recentWeeks(doc, today, 9), doc.program.weeklyGoal)
  const count = doc.sessions.length
  const sub = count
    ? `${count} ${count === 1 ? 'session' : 'sessions'} since ${formatDayMonth(parseIsoDate(chronological(doc)[0].date))}`
    : 'Nothing logged yet'

  return (
    <div className="screen">
      <header className="page-head">
        <h1 className="page-title">Progress</h1>
        <p className="page-sub">{sub}</p>
      </header>
      <WeeksSection doc={doc} weeks={weeks} />
      <MeasureSection title="Weight" unit="kg" series={measurementSeries(doc, 'weightKg')} target={doc.profile.targets.weightKg} format={formatKg} />
      <MeasureSection title="Waist" unit="in" series={measurementSeries(doc, 'waistIn')} target={doc.profile.targets.waistIn} format={formatInches} />
      <ExerciseSection doc={doc} />
    </div>
  )
}
