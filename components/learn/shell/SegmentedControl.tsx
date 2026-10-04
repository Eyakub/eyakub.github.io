interface Option { value: string; label: string; lang?: string }
interface Props {
  label?: string
  ariaLabel?: string
  options: Option[]
  value: string
  onChange: (v: string) => void
  className?: string
}

export default function SegmentedControl({ label, ariaLabel, options, value, onChange, className }: Props) {
  const cls = ['seg', options.length > 3 ? 'chips' : '', className ?? ''].filter(Boolean).join(' ')
  return (
    <div className={cls} role="group" aria-label={ariaLabel ?? label}>
      {options.map((o) => (
        <button key={o.value} type="button" lang={o.lang} aria-pressed={o.value === value} onClick={() => onChange(o.value)}>
          {o.label}
        </button>
      ))}
    </div>
  )
}
