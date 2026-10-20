import type { ReactNode } from 'react'
import { formatInches, formatKg } from '../../../lib/workout/format'
import { measurementSeries, type MeasurementField } from '../../../lib/workout/doc'
import type { WorkoutDoc } from '../../../lib/workout/types'
import { Sparkline } from './Sparkline'

interface Props {
  doc: WorkoutDoc
}

interface MeasureProps {
  doc: WorkoutDoc
  field: MeasurementField
  label: string
  unit: string
  goal: number | null
  format: (n: number) => string
}

function MeasureStat({ doc, field, label, unit, goal, format }: MeasureProps) {
  const values = measurementSeries(doc, field).map((p) => p.value)
  const latest = values.length ? values[values.length - 1] : null

  let sub = 'Not logged yet'
  let trend: ReactNode = null
  if (latest !== null) {
    if (goal === null) sub = 'Set a goal in Settings'
    else {
      const gap = format(Math.abs(latest - goal))
      sub = parseFloat(gap) === 0 ? 'At your goal' : `${gap} ${unit} to goal`
    }
    trend = values.length >= 2 ? <Sparkline points={values.slice(-20)} /> : <span className="stat-s">Log again to see a trend</span>
  }

  return (
    <div className="stat">
      <span className="eyebrow">{label}</span>
      <span className="stat-v">
        {latest === null ? '-' : format(latest)}
        {latest !== null && <small>{unit}</small>}
      </span>
      <span className="stat-s">{sub}</span>
      {trend}
    </div>
  )
}

export function StatGrid({ doc }: Props) {
  const total = doc.sessions.length
  return (
    <section aria-label="Your numbers">
      <div className="stats">
        <div className="stat">
          <span className="eyebrow">Sessions</span>
          <span className="stat-v">{total}</span>
          <span className="stat-s">{total > 0 ? 'Logged so far' : 'Starts with your next session'}</span>
        </div>
        <MeasureStat doc={doc} field="weightKg" label="Weight" unit="kg" goal={doc.profile.targets.weightKg} format={formatKg} />
        <MeasureStat doc={doc} field="waistIn" label="Waist" unit="in" goal={doc.profile.targets.waistIn} format={formatInches} />
      </div>
    </section>
  )
}
