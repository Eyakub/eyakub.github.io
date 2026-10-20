import { useState, type FormEvent } from 'react'
import { useWorkout } from '../../../contexts/WorkoutContext'
import { formatDay } from '../../../lib/workout/dates'
import { latestMeasurement, type MeasurementField } from '../../../lib/workout/doc'
import { RANGES, checkRequired } from '../../../lib/workout/fields'
import { formatInches, formatKg } from '../../../lib/workout/format'
import { NumberField } from '../shell/NumberField'
import { Sheet } from '../shell/Sheet'
import { useToast } from '../shell/Toast'

interface Props {
  /** Which measurement to log; null keeps the sheet closed. */
  field: MeasurementField | null
  today: Date
  onClose: () => void
}

const COPY = {
  weightKg: { title: 'Log weight', label: 'Morning weight, kg', range: RANGES.weightKg, format: formatKg },
  waistIn: { title: 'Log waist', label: 'Waist at the navel, inches', range: RANGES.waistIn, format: formatInches },
} as const

function LogForm({ field, today, onClose }: { field: MeasurementField; today: Date; onClose: () => void }) {
  const { doc, logToday } = useWorkout()
  const toast = useToast()
  const copy = COPY[field]
  const latest = doc ? latestMeasurement(doc, field) : null
  const [text, setText] = useState(latest ? copy.format(latest.value) : '')
  const [error, setError] = useState<string | null>(null)

  const save = (e: FormEvent) => {
    e.preventDefault()
    const r = checkRequired(text, copy.range)
    if (r.status === 'invalid') {
      setError(r.error)
      return
    }
    logToday({ [field]: r.value })
    toast(`Logged ${copy.format(r.value)} ${copy.range.unit} for today`)
    onClose()
  }

  return (
    <form className="sheet-form" onSubmit={save} noValidate>
      <div className="sheet-head">
        <h2>{copy.title}</h2>
        <span className="lbl">{formatDay(today)}</span>
      </div>
      <NumberField
        id="wo-log"
        label={copy.label}
        value={text}
        onChange={(v) => {
          setText(v)
          setError(null)
        }}
        error={error}
      />
      <div className="sheet-actions">
        <button type="submit" className="btn btn-go">
          Save
        </button>
        <button type="button" className="btn btn-quiet" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  )
}

export function LogMeasurementSheet({ field, today, onClose }: Props) {
  return (
    <Sheet open={field !== null} onClose={onClose} label={field ? COPY[field].title : 'Log measurement'}>
      {field && <LogForm field={field} today={today} onClose={onClose} />}
    </Sheet>
  )
}
