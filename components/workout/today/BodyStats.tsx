import { latestMeasurement, measurementSeries, type MeasurementField } from '../../../lib/workout/doc'
import { formatInches, formatKg } from '../../../lib/workout/format'
import { bodySubline } from '../../../lib/workout/progress'
import type { WorkoutDoc } from '../../../lib/workout/types'

interface Props {
  doc: WorkoutDoc
  onLog: (field: MeasurementField) => void
}

interface CardProps {
  doc: WorkoutDoc
  field: MeasurementField
  label: string
  unit: string
  /** Only weight shows the distance to a goal here; waist shows its change. */
  target: number | null
  format: (n: number) => string
  onLog: (field: MeasurementField) => void
}

function Card({ doc, field, label, unit, target, format, onLog }: CardProps) {
  const latest = latestMeasurement(doc, field)
  const value = latest ? `${format(latest.value)} ${unit}` : null
  return (
    <button type="button" aria-haspopup="dialog" aria-label={`Log ${label.toLowerCase()}${value ? `, now ${value}` : ''}`} onClick={() => onLog(field)}>
      <span className="lbl">{label}</span>
      <span className="big-num">
        {latest ? format(latest.value) : '–'}
        {latest && <small> {unit}</small>}
      </span>
      <span className="sub">{bodySubline(measurementSeries(doc, field), target, unit, format)}</span>
    </button>
  )
}

export function BodyStats({ doc, onLog }: Props) {
  return (
    <section className="body-stats" aria-label="Body">
      <Card doc={doc} field="weightKg" label="Weight" unit="kg" target={doc.profile.targets.weightKg} format={formatKg} onLog={onLog} />
      <Card doc={doc} field="waistIn" label="Waist" unit="in" target={null} format={formatInches} onLog={onLog} />
    </section>
  )
}
