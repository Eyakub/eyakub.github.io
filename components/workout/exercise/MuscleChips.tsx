export function MuscleChips({ primary, secondary }: { primary: string[]; secondary: string[] }) {
  return (
    <ul className="chips">
      {primary.map((m) => (
        <li key={m} className="chip pri">
          {m}
        </li>
      ))}
      {secondary.map((m) => (
        <li key={m} className="chip">
          {m}
        </li>
      ))}
    </ul>
  )
}
