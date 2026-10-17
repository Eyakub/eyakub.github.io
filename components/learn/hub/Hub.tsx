import Link from 'next/link'
import { useRouter } from 'next/router'
import { useLearnPrefs } from '../../../contexts/LearnPrefsContext'
import { FIRST_RIDE, STATIONS } from '../../../data/learn/network'
import type { UiKey } from '../../../data/learn/ui'
import { fmt } from '../../../lib/learn/l10n'
import { useToast } from '../shell/Toast'
import NetworkMap from './NetworkMap'
import RouteIndex from './RouteIndex'

export default function Hub({ openSlugs }: { openSlugs: string[] }) {
  const { ui, t, learned } = useLearnPrefs()
  const router = useRouter()
  const toast = useToast()

  const onStation = (slug: string) => {
    if (openSlugs.includes(slug)) {
      router.push('/learn/' + slug)
      return
    }
    const s = STATIONS[slug]
    toast(fmt(ui('toastLater'), { name: t(s.name), phase: ui(('p' + s.phase) as UiKey) }))
  }

  return (
    <main id="map-view">
      <section className="hub-hero">
        <div className="hub-intro">
          <h1 className="display">{ui('hubTitle')}</h1>
          <p className="lede">{ui('hubLede')}</p>
        </div>
        <nav className="first-ride" aria-labelledby="start-h">
          <h2 id="start-h">{ui('startHere')}</h2>
          <ol>
            {FIRST_RIDE.map((id, i) => (
              <li key={id}>
                <Link href={'/learn/' + id}>
                  <span className="num">{i + 1}</span>
                  <span className="nm">{t(STATIONS[id].name)}</span>
                </Link>
              </li>
            ))}
          </ol>
          <Link className="btn primary" href={'/learn/' + FIRST_RIDE[0]}>
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.4-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
            </svg>
            <span>{ui('hubCta')}</span>
          </Link>
        </nav>
      </section>

      <section className="map-sec" aria-labelledby="map-h">
        <h2 id="map-h" className="sr-only">
          {ui('mapHeading')}
        </h2>
        <NetworkMap openSlugs={openSlugs} learned={learned} onStation={onStation} />
      </section>

      <section className="route-index" aria-labelledby="index-h">
        <h2 id="index-h">{ui('allLines')}</h2>
        <RouteIndex openSlugs={openSlugs} learned={learned} onStation={onStation} />
      </section>
    </main>
  )
}
