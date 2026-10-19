import { useEffect, useState, type FormEvent } from 'react'
import { checkOptional, checkRequired, type FieldRange } from '../../../lib/workout/fields'

interface Props {
  id: string
  label: string
  /** Small line under the label, e.g. "Now 72.4 kg". */
  sub?: string
  unit: string
  range: FieldRange
  /** The saved value; the field follows it when it changes elsewhere, e.g. after a backup import. */
  value: number | null
  format: (n: number) => string
  required?: boolean
  onSave: (value: number | null) => void
}

// Saves on blur or Enter. A bad entry stays in the field with its error until it is fixed.
export function TargetRow({ id, label, sub, unit, range, value, format, required, onSave }: Props) {
  const show = (v: number | null) => (v === null ? '' : format(v))
  const [text, setText] = useState(show(value))
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setText(value === null ? '' : format(value))
    setError(null)
  }, [value, format])

  const commit = () => {
    const r = required ? checkRequired(text, range) : checkOptional(text, range)
    if (r.status === 'invalid') {
      setError(r.error)
      return
    }
    setError(null)
    setText(show(r.value))
    if (r.value !== value) onSave(r.value)
  }

  const submit = (e: FormEvent) => {
    e.preventDefault()
    commit()
  }

  return (
    <>
      <div className="row">
        <div className="row-l">
          <label htmlFor={id}>{label}</label>
          {sub && <small>{sub}</small>}
        </div>
        <form className="row-r" onSubmit={submit} noValidate>
          <input
            id={id}
            className="mini"
            type="text"
            inputMode="decimal"
            enterKeyHint="done"
            autoComplete="off"
            placeholder="Set"
            value={text}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${id}-err` : undefined}
            onChange={(e) => {
              setText(e.target.value)
              setError(null)
            }}
            onBlur={commit}
          />
          <span>{unit}</span>
        </form>
      </div>
      {error && (
        <p className="field-err" id={`${id}-err`} role="alert">
          {error}
        </p>
      )}
    </>
  )
}
