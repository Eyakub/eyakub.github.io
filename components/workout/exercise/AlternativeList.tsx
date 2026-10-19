import Link from 'next/link'
import { EXERCISE_BY_ID } from '../../../data/workout/exercises'
import type { Id } from '../../../lib/workout/types'
import { ExerciseGlyph } from './ExerciseGlyph'

export function AlternativeList({ ids }: { ids: Id[] }) {
  const items = ids.map((id) => EXERCISE_BY_ID[id]).filter(Boolean)
  return (
    <ul className="alts">
      {items.map((ex) => (
        <li key={ex.id}>
          <Link className="alt" href={`/workout/library/${ex.id}`}>
            <span className="thumb sm">
              <ExerciseGlyph equipment={ex.equipment} />
            </span>
            <span>
              {ex.name}
              <small>{ex.primary.join(', ')}</small>
            </span>
            <span className="go">Open</span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
