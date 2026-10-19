import { useWorkout } from '../../../contexts/WorkoutContext'
import { latestMeasurement } from '../../../lib/workout/doc'
import { RANGES } from '../../../lib/workout/fields'
import { formatInches, formatKg } from '../../../lib/workout/format'
import { DataGroup } from './DataGroup'
import { EquipmentGroup } from './EquipmentGroup'
import { TargetRow } from './TargetRow'

const whole = (n: number) => String(n)

export function SettingsView() {
  const { doc, updateProfile } = useWorkout()
  if (!doc) return null

  const { targets, heightCm } = doc.profile
  const weight = latestMeasurement(doc, 'weightKg')
  const waist = latestMeasurement(doc, 'waistIn')

  return (
    <div className="screen">
      <div className="topline">
        <span className="eyebrow">Saved in this browser</span>
      </div>
      <div className="page-head">
        <h1 className="display page-title">Settings</h1>
      </div>

      <section className="group">
        <h2 className="sec-title group-title">Targets</h2>
        <TargetRow
          id="wo-set-goal-weight"
          label="Goal weight"
          sub={weight ? `Now ${formatKg(weight.value)} kg` : undefined}
          unit="kg"
          range={RANGES.weightKg}
          value={targets.weightKg}
          format={formatKg}
          onSave={(v) => updateProfile({ targets: { ...targets, weightKg: v } })}
        />
        <TargetRow
          id="wo-set-goal-waist"
          label="Goal waist"
          sub={waist ? `Now ${formatInches(waist.value)} in` : undefined}
          unit="in"
          range={RANGES.waistIn}
          value={targets.waistIn}
          format={formatInches}
          onSave={(v) => updateProfile({ targets: { ...targets, waistIn: v } })}
        />
        <TargetRow
          id="wo-set-height"
          label="Height"
          unit="cm"
          range={RANGES.heightCm}
          value={heightCm}
          format={whole}
          onSave={(v) => updateProfile({ heightCm: v })}
        />
      </section>

      <EquipmentGroup doc={doc} />
      <DataGroup doc={doc} />
    </div>
  )
}
