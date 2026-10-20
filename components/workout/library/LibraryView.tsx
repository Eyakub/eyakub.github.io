import { useState } from 'react'
import { EXERCISES } from '../../../data/workout/exercises'
import { SearchIcon } from '../shell/icons'
import { ExerciseCard } from './ExerciseCard'
import { FILTERS, matchesQuery, type FilterId } from './filters'

export function LibraryView() {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<FilterId>('all')

  const q = query.trim().toLowerCase()
  const test = FILTERS.find((f) => f.id === filter)!.test
  const rows = EXERCISES.filter((e) => test(e) && (!q || matchesQuery(e, q)))

  return (
    <div className="screen">
      <header className="page-head">
        <h1 className="page-title">Exercises</h1>
        <p className="page-sub">{EXERCISES.length} moves you can do at home</p>
      </header>
      <label className="search">
        <SearchIcon />
        <input
          type="search"
          placeholder="Search by name or muscle"
          aria-label="Search exercises"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </label>
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
      <ul className="lib-grid">
        {rows.length === 0 && <li className="empty">Nothing matches “{query.trim()}”. Try a muscle, like lats.</li>}
        {rows.map((e) => (
          <ExerciseCard key={e.id} exercise={e} />
        ))}
      </ul>
    </div>
  )
}
