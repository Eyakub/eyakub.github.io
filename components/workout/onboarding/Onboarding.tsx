import { Fragment, useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import { useWorkout } from '../../../contexts/WorkoutContext'
import { readBackupFile } from '../../../lib/workout/backup'
import type { OnboardingInput } from '../../../lib/workout/doc'
import { RANGES, checkOptional, checkRequired, type FieldRange } from '../../../lib/workout/fields'
import { EQUIPMENT_LABEL } from '../../../lib/workout/labels'
import type { Equipment } from '../../../lib/workout/types'
import { NumberField } from '../shell/NumberField'
import { CheckIcon } from '../shell/icons'

type Pick = Exclude<Equipment, 'bodyweight'>
type Key = 'weight' | 'waist' | 'height' | 'goalWeight' | 'goalWaist' | 'dumbbell'

const PICKS: { id: Pick; hint?: string }[] = [
  { id: 'dumbbells' },
  { id: 'pull-up-bar' },
  { id: 'chair', hint: 'Decline push-ups, split squats, supported rows' },
  { id: 'step', hint: 'Calf raises' },
]

const BLANK: Record<Key, string> = { weight: '', waist: '', height: '', goalWeight: '', goalWaist: '', dumbbell: '7.5' }
const ALL_PICKED: Record<Pick, boolean> = { dumbbells: true, 'pull-up-bar': true, chair: true, step: true }

interface Spec { key: Key; range: FieldRange; required?: boolean }

export function Onboarding() {
  const { completeOnboarding, replaceDoc } = useWorkout()
  const [text, setText] = useState(BLANK)
  const [picked, setPicked] = useState(ALL_PICKED)
  const [errors, setErrors] = useState<Partial<Record<Key, string>>>({})
  const [restoreFailed, setRestoreFailed] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const set = (key: Key) => (value: string) => {
    setText((t) => ({ ...t, [key]: value }))
    setErrors((e) => ({ ...e, [key]: undefined }))
  }

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const specs: Spec[] = [
      { key: 'weight', range: RANGES.weightKg, required: true },
      { key: 'waist', range: RANGES.waistIn },
      { key: 'height', range: RANGES.heightCm },
      { key: 'goalWeight', range: RANGES.weightKg },
      { key: 'goalWaist', range: RANGES.waistIn },
    ]
    if (picked.dumbbells) specs.push({ key: 'dumbbell', range: RANGES.dumbbellKg, required: true })

    const found: Partial<Record<Key, string>> = {}
    const values: Partial<Record<Key, number | null>> = {}
    for (const s of specs) {
      const r = s.required ? checkRequired(text[s.key], s.range) : checkOptional(text[s.key], s.range)
      if (r.status === 'valid') values[s.key] = r.value
      else found[s.key] = r.error
    }
    const firstBad = specs.find((s) => found[s.key])
    if (firstBad) {
      setErrors(found)
      document.getElementById(`wo-${firstBad.key}`)?.focus()
      return
    }

    const input: OnboardingInput = {
      weightKg: values.weight as number,
      waistIn: values.waist ?? null,
      heightCm: values.height ?? null,
      targetWeightKg: values.goalWeight ?? null,
      targetWaistIn: values.goalWaist ?? null,
      equipment: [...PICKS.filter((p) => picked[p.id]).map((p) => p.id), 'bodyweight'],
      dumbbellKg: picked.dumbbells ? (values.dumbbell as number) : 7.5,
    }
    completeOnboarding(input)
    // Today replaces this long form in place; without this it opens scrolled to the old position.
    window.scrollTo(0, 0)
  }

  const restore = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    const doc = await readBackupFile(file)
    if (doc) {
      replaceDoc(doc)
      window.scrollTo(0, 0)
    } else setRestoreFailed(true)
  }

  return (
    <div className="screen onb">
      <div className="onb-head">
        <p className="eyebrow">Set up</p>
        <h1 className="display page-title">Your starting point</h1>
        <p className="onb-lede">Saved in this browser only.</p>
      </div>

      <form className="onb-form" onSubmit={submit} noValidate>
        <NumberField id="wo-weight" label="Weight, kg" placeholder="kg" value={text.weight} onChange={set('weight')} error={errors.weight} />

        <div className="sec">
          <p className="eyebrow">Optional</p>
          <div className="onb-grid">
            <NumberField id="wo-waist" label="Waist, in" placeholder="in" value={text.waist} onChange={set('waist')} error={errors.waist} />
            <NumberField id="wo-height" label="Height, cm" placeholder="cm" value={text.height} onChange={set('height')} error={errors.height} />
            <NumberField id="wo-goalWeight" label="Goal weight, kg" placeholder="kg" value={text.goalWeight} onChange={set('goalWeight')} error={errors.goalWeight} />
            <NumberField id="wo-goalWaist" label="Goal waist, in" placeholder="in" value={text.goalWaist} onChange={set('goalWaist')} error={errors.goalWaist} />
          </div>
        </div>

        <section className="sec" aria-labelledby="wo-equipment">
          <h2 className="sec-title" id="wo-equipment">
            Equipment
          </h2>
          <div className="opts">
            {PICKS.map((p) => (
              <Fragment key={p.id}>
                <label className="opt">
                  <input
                    type="checkbox"
                    checked={picked[p.id]}
                    onChange={(e) => setPicked((s) => ({ ...s, [p.id]: e.target.checked }))}
                  />
                  <span className="opt-box" aria-hidden="true">
                    <CheckIcon />
                  </span>
                  <span className="opt-t">
                    {EQUIPMENT_LABEL[p.id]}
                    {p.hint && <small>{p.hint}</small>}
                  </span>
                </label>
                {p.id === 'dumbbells' && picked.dumbbells && (
                  <div className="opt-extra">
                    <NumberField
                      id="wo-dumbbell"
                      label="Dumbbell weight, kg each"
                      value={text.dumbbell}
                      onChange={set('dumbbell')}
                      error={errors.dumbbell}
                      compact
                    />
                  </div>
                )}
              </Fragment>
            ))}
          </div>
          <p className="foot-note">Bodyweight is always included.</p>
        </section>

        <div className="onb-foot">
          <button type="submit" className="btn btn-primary btn-wide">
            Start tracking
          </button>
          <button type="button" className="link" onClick={() => fileRef.current?.click()}>
            Restore from a backup file
          </button>
          {restoreFailed && (
            <p className="field-err" role="alert">
              That file isn&apos;t a workout backup.
            </p>
          )}
          <input ref={fileRef} type="file" accept="application/json" hidden onChange={restore} />
        </div>
      </form>
    </div>
  )
}
