import Link from 'next/link'
import type { Exercise } from '../../../lib/workout/types'
import { ExerciseFigure } from '../figure/ExerciseFigure'

export function ExerciseCard({ exercise: e }: { exercise: Exercise }) {
  return (
    <li>
      <Link className="lib-item" href={`/workout/library/${e.id}`}>
        {/* The name below already names the link; the figure is only a preview. */}
        <div aria-hidden="true">
          <ExerciseFigure id={e.id} playOnHover autoplay={false} label={e.name} />
        </div>
        <span className="lib-name">{e.name}</span>
        <span className="lib-mus">{e.primary.join(', ')}</span>
      </Link>
    </li>
  )
}
