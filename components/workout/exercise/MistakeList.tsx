export function MistakeList({ mistakes }: { mistakes: string[] }) {
  return (
    <ul className="mistakes">
      {mistakes.map((m) => (
        <li key={m}>{m}</li>
      ))}
    </ul>
  )
}
