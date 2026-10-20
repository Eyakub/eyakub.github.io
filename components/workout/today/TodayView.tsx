import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useWorkout } from '../../../contexts/WorkoutContext'
import { formatLongDay } from '../../../lib/workout/dates'
import { currentRoutine, type MeasurementField } from '../../../lib/workout/doc'
import { nextUp, weekSessions } from '../../../lib/workout/rotation'
import { TODAY_HREF } from '../../../lib/workout/routes'
import { GearIcon } from '../shell/icons'
import { useToday } from '../shell/useToday'
import { BodyStats } from './BodyStats'
import { InProgressCard } from './InProgressCard'
import { LogMeasurementSheet } from './LogMeasurementSheet'
import { NextUpCard } from './NextUpCard'
import { OtherRoutines } from './OtherRoutines'
import { WeekSection } from './WeekSection'

export function TodayView() {
  const { doc } = useWorkout()
  const today = useToday()
  const router = useRouter()
  const [logging, setLogging] = useState<MeasurementField | null>(null)
  const [loadNew, setLoadNew] = useState(false)

  // Coming back from a saved workout: play the new plate once, then drop the query so a reload doesn't replay it
  const justSaved = router.isReady && router.query.loaded === '1'
  useEffect(() => {
    if (!justSaved) return
    setLoadNew(true)
    void router.replace(TODAY_HREF, undefined, { shallow: true })
    // keyed on justSaved alone: the router object is new on every render
  }, [justSaved])

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
      <WeekSection sessions={weekSessions(doc, today)} goal={doc.program.weeklyGoal} loadNewest={loadNew} />
      {doc.active ? <InProgressCard active={doc.active} /> : <NextUpCard routine={routine} />}
      <OtherRoutines doc={doc} />
      <BodyStats doc={doc} onLog={setLogging} />
      <LogMeasurementSheet field={logging} today={today} onClose={() => setLogging(null)} />
    </div>
  )
}
