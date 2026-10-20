export function TodaySkeleton() {
  return (
    <div className="screen skeleton" aria-busy="true">
      <span className="sr-only" role="status">
        Loading
      </span>
      <span className="sk sk-line" />
      <span className="sk sk-head" />
      <span className="sk sk-bar" />
      <span className="sk sk-card" />
    </div>
  )
}
