import { useState } from 'react'
import Link from 'next/link'
import { useWorkout } from '../../../contexts/WorkoutContext'
import { formatLongDay } from '../../../lib/workout/dates'
import { currentRoutine, type MeasurementField } from '../../../lib/workout/doc'
import { nextUp, weekSessions } from '../../../lib/workout/rotation'
import { GearIcon } from '../shell/icons'
import { useToday } from '../shell/useToday'
import { BodyStats } from './BodyStats'
import { LogMeasurementSheet } from './LogMeasurementSheet'
import { NextUpCard } from './NextUpCard'
import { OtherRoutines } from './OtherRoutines'
import { WeekSection } from './WeekSection'

export function TodayView() {
  const { doc } = useWorkout()
  const today = useToday()
  const [logging, setLogging] = useState<MeasurementField | null>(null)
  const routine = doc ? currentRoutine(doc, nextUp(doc)) : undefined
  if (!doc || !routine) return null

  return (
    <div className="screen">
      <header className="top">
        <p className="date">{formatLongDay(today)}</p>
        <Link className="iconbtn" href="/workout/settings" aria-label="Settings">
          <GearIcon />
        </Link>
      </header>
      <WeekSection sessions={weekSessions(doc, today)} goal={doc.program.weeklyGoal} />
      <NextUpCard routine={routine} />
      <OtherRoutines doc={doc} />
      <BodyStats doc={doc} onLog={setLogging} />
      <LogMeasurementSheet field={logging} today={today} onClose={() => setLogging(null)} />
    </div>
  )
}
