import { changeSince, changeText, goalGap, goalText } from '../../../lib/workout/progress'
import type { IsoDate } from '../../../lib/workout/types'
import { LineChart } from './LineChart'

interface Props {
  title: string
  unit: string
  series: { date: IsoDate; value: number }[]
  target: number | null
  format: (n: number) => string
}

export function MeasureSection({ title, unit, series, target, format }: Props) {
  const what = title.toLowerCase()
  const latest = series.length ? series[series.length - 1] : null
  const change = changeSince(series, format)
  const gap = latest ? goalGap(latest.value, target, format) : null

  const sentences: string[] = []
  if (!latest) sentences.push(`Log your ${what} from Today to start a chart.`)
  else if (!change) sentences.push(`Log your ${what} a few times to see a trend.`)
  if (change) sentences.push(`${changeText(change, unit)}.`)
  if (gap) sentences.push(`${goalText(gap, unit)}.`)

  return (
    <section className="sec">
      <div className="sec-row">
        <h2>{title}</h2>
        {latest ? (
          <p className="big-num">
            {format(latest.value)}
            <small> {unit}</small>
          </p>
        ) : (
          <p className="lbl">Not logged yet</p>
        )}
      </div>
      <p className="prose">{sentences.join(' ')}</p>
      <LineChart points={series} goal={target} label={`${title} trend`} unit={unit} format={format} />
    </section>
  )
}
