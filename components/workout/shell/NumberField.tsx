interface Props {
  id: string
  /** Include the unit, e.g. "Weight, kg". */
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  error?: string | null
  compact?: boolean
}

export function NumberField({ id, label, value, onChange, placeholder, error, compact }: Props) {
  const errId = `${id}-err`
  return (
    <div className={compact ? 'field field-sm' : 'field'}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="text"
        inputMode="decimal"
        autoComplete="off"
        value={value}
        placeholder={placeholder}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errId : undefined}
        onChange={(e) => onChange(e.target.value)}
      />
      {error && (
        <p className="field-err" id={errId} role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
