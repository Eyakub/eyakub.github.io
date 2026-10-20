import { useWorkout } from '../../../contexts/WorkoutContext'
import { RANGES } from '../../../lib/workout/fields'
import { formatKg } from '../../../lib/workout/format'
import { EQUIPMENT_LABEL, EQUIPMENT_ORDER, EQUIPMENT_PICKS, type EquipmentPick } from '../../../lib/workout/labels'
import type { WorkoutDoc } from '../../../lib/workout/types'
import { Switch } from '../shell/Switch'
import { TargetRow } from './TargetRow'

export function EquipmentGroup({ doc }: { doc: WorkoutDoc }) {
  const { updateProfile } = useWorkout()
  const have = new Set(doc.profile.equipment)

  const toggle = (id: EquipmentPick, on: boolean) => {
    const next = new Set(have)
    if (on) next.add(id)
    else next.delete(id)
    // Bodyweight needs nothing, so it is always on
    next.add('bodyweight')
    updateProfile({ equipment: EQUIPMENT_ORDER.filter((e) => next.has(e)) })
  }

  return (
    <section className="sec">
      <h2>Equipment</h2>
      <div className="panel">
        {EQUIPMENT_PICKS.map((p) => (
          <div className="row" key={p.id}>
            <div className="row-l">
              <span>{EQUIPMENT_LABEL[p.id]}</span>
              {p.hint && <small>{p.hint}</small>}
            </div>
            <Switch checked={have.has(p.id)} onChange={(on) => toggle(p.id, on)} label={EQUIPMENT_LABEL[p.id]} />
          </div>
        ))}
        {have.has('dumbbells') && (
          <TargetRow
            id="wo-set-dumbbell"
            label="Dumbbell weight"
            sub="Each dumbbell"
            unit="kg"
            range={RANGES.dumbbellKg}
            value={doc.profile.dumbbellKg}
            format={formatKg}
            required
            onSave={(v) => v !== null && updateProfile({ dumbbellKg: v })}
          />
        )}
      </div>
      <p className="foot-note">Swaps only suggest exercises you have the equipment for.</p>
    </section>
  )
}
