export function StepList({ steps }: { steps: string[] }) {
  return (
    <ol className="steps">
      {steps.map((s) => (
        <li key={s}>{s}</li>
      ))}
    </ol>
  )
}
