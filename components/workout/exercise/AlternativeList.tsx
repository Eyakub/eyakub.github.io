import Link from 'next/link'
import { EXERCISE_BY_ID } from '../../../data/workout/exercises'
import type { Id } from '../../../lib/workout/types'

export function AlternativeList({ ids }: { ids: Id[] }) {
  const items = ids.map((id) => EXERCISE_BY_ID[id]).filter(Boolean)
  return (
    <ul className="alts">
      {items.map((ex) => (
        <li key={ex.id}>
          <Link className="alt" href={`/workout/library/${ex.id}`}>
            <span>{ex.name}</span>
            <small>{ex.primary.join(', ')}</small>
          </Link>
        </li>
      ))}
    </ul>
  )
}
