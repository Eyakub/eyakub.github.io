export function MuscleLine({ primary, secondary }: { primary: string[]; secondary: string[] }) {
  return (
    <p className="ex-mus">
      <b>{primary.join(', ')}</b>
      {secondary.length > 0 && `, ${secondary.join(', ')}`}
    </p>
  )
}
