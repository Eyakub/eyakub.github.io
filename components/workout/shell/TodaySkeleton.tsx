export function TodaySkeleton() {
  return (
    <div className="screen skeleton" aria-busy="true">
      <span className="sr-only" role="status">
        Loading
      </span>
      <div className="topline">
        <span className="sk sk-line" />
      </div>
      <div className="day-hero">
        <span className="sk sk-line sm" />
        <span className="sk sk-title" />
      </div>
      <ol className="week" aria-hidden="true">
        {Array.from({ length: 7 }, (_, i) => (
          <li key={i}>
            <span className="sk sk-pill" />
          </li>
        ))}
      </ol>
      <span className="sk sk-card" />
    </div>
  )
}
