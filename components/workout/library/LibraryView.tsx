import { useMemo, useState } from 'react'
import Link from 'next/link'
import { useWorkout } from '../../../contexts/WorkoutContext'
import { EXERCISES } from '../../../data/workout/exercises'
import { EQUIPMENT_LABEL } from '../../../lib/workout/labels'
import { routinesWith } from '../../../lib/workout/rotation'
import type { Exercise } from '../../../lib/workout/types'
import { ExerciseGlyph } from '../exercise/ExerciseGlyph'
import { SearchIcon } from '../shell/icons'

type FilterId = 'all' | 'push' | 'pull' | 'legs' | 'core' | 'dumbbells' | 'bar' | 'bodyweight'

const FILTERS: { id: FilterId; label: string; test: (e: Exercise) => boolean }[] = [
  { id: 'all', label: 'All', test: () => true },
  { id: 'push', label: 'Push', test: (e) => e.pattern === 'push' },
  { id: 'pull', label: 'Pull', test: (e) => e.pattern === 'pull' },
  { id: 'legs', label: 'Legs', test: (e) => e.pattern === 'legs' },
  { id: 'core', label: 'Core', test: (e) => e.pattern === 'core' },
  { id: 'dumbbells', label: 'Dumbbells', test: (e) => e.equipment.includes('dumbbells') },
  { id: 'bar', label: 'Bar', test: (e) => e.equipment.includes('pull-up-bar') },
  { id: 'bodyweight', label: 'Bodyweight', test: (e) => !e.equipment.includes('dumbbells') && !e.equipment.includes('pull-up-bar') },
]

// "Legs + Core" -> "Legs" so the tag stays on one line
const shortName = (name: string) => name.split(/[\s+]/)[0]

const matchesQuery = (e: Exercise, q: string) => [e.name, ...e.primary, ...e.secondary].join(' ').toLowerCase().includes(q)

export function LibraryView() {
  const { doc } = useWorkout()
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<FilterId>('all')

  const tags = useMemo(
    () => new Map(EXERCISES.map((e) => [e.id, doc ? routinesWith(doc, e.id).map((r) => shortName(r.name)) : []])),
    [doc],
  )

  const q = query.trim().toLowerCase()
  const test = FILTERS.find((f) => f.id === filter)!.test
  const rows = EXERCISES.filter((e) => test(e) && (!q || matchesQuery(e, q)))

  return (
    <div className="screen">
      <div className="topline">
        <span className="eyebrow">{EXERCISES.length} exercises</span>
      </div>
      <div className="page-head">
        <h1 className="display page-title">Library</h1>
      </div>
      <div className="search">
        <SearchIcon />
        <input
          type="search"
          placeholder="Search exercises or muscles"
          aria-label="Search exercises or muscles"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div className="filters" role="group" aria-label="Filter">
        {FILTERS.map((f) => (
          <button key={f.id} type="button" aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>
            {f.label}
          </button>
        ))}
      </div>
      <p className="sr-only" role="status">
        {rows.length} {rows.length === 1 ? 'exercise' : 'exercises'}
      </p>
      <ul className="lib">
        {rows.length === 0 && <li className="empty">Nothing matches “{query.trim()}”. Try a muscle, like “lats”.</li>}
        {rows.map((e) => {
          const tag = tags.get(e.id) ?? []
          return (
            <li key={e.id}>
              <Link className="lib-row" href={`/workout/library/${e.id}`}>
                <span className="thumb">
                  <ExerciseGlyph equipment={e.equipment} />
                </span>
                <span>
                  <span className="lib-n">{e.name}</span>
                  <span className="lib-m">
                    {e.primary.join(', ')} · {EQUIPMENT_LABEL[e.equipment[0]]}
                  </span>
                </span>
                <span className="lib-r">
                  <span className="lvl" role="img" aria-label={`Difficulty ${e.difficulty} of 3`}>
                    {[1, 2, 3].map((n) => (
                      <i key={n} className={n <= e.difficulty ? 'on' : ''} />
                    ))}
                  </span>
                  {tag.length > 0 && <span className="day-tag">{tag.join(' ')}</span>}
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
