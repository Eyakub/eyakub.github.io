import { Fragment } from 'react'
import { EQUIPMENT_LABEL, EQUIPMENT_PICKS, type EquipmentPick } from '../../../lib/workout/labels'
import { NumberField } from '../shell/NumberField'
import { CheckIcon } from '../shell/icons'

interface Props {
  picked: Record<EquipmentPick, boolean>
  onPick: (id: EquipmentPick, on: boolean) => void
  dumbbell: { value: string; error?: string; onChange: (value: string) => void }
}

export function EquipmentChecklist({ picked, onPick, dumbbell }: Props) {
  return (
    <section className="sec" aria-labelledby="wo-equipment">
      <h2 id="wo-equipment">Equipment</h2>
      <div className="panel">
        {EQUIPMENT_PICKS.map((p) => (
          <Fragment key={p.id}>
            <label className="opt">
              <input type="checkbox" checked={picked[p.id]} onChange={(e) => onPick(p.id, e.target.checked)} />
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
                <NumberField id="wo-dumbbell" label="Dumbbell weight, kg each" value={dumbbell.value} onChange={dumbbell.onChange} error={dumbbell.error} compact />
              </div>
            )}
          </Fragment>
        ))}
      </div>
      <p className="foot-note">Bodyweight is always included.</p>
    </section>
  )
}
