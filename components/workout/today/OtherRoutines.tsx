import Link from 'next/link'
import { currentRoutine } from '../../../lib/workout/doc'
import { shortRoutineName } from '../../../lib/workout/labels'
import { nextUp, openCycle } from '../../../lib/workout/rotation'
import { sessionHref } from '../../../lib/workout/routes'
import type { WorkoutDoc } from '../../../lib/workout/types'

export function OtherRoutines({ doc }: { doc: WorkoutDoc }) {
  const next = nextUp(doc)
  const done = openCycle(doc).flatMap((id) => {
    const r = currentRoutine(doc, id)
    return r ? [shortRoutineName(r.name)] : []
  })
  const others = doc.program.order.flatMap((id) => {
    const r = id === next ? undefined : currentRoutine(doc, id)
    return r ? [r] : []
  })

  return (
    <section className="others">
      <p>{done.length ? `Rotation so far: ${done.join(', ')}.` : 'New rotation starts here.'} Rather do something else?</p>
      <div className="chips">
        {others.map((r) => (
          <Link key={r.routineId} className={`chip c-${r.routineId}`} href={sessionHref(r.routineId)}>
            <i />
            {r.name}
          </Link>
        ))}
      </div>
    </section>
  )
}
