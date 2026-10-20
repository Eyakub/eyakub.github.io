import type { ReactNode } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { HomeIcon, LibraryIcon, ProgressIcon } from './icons'

interface Tab {
  href: string
  label: string
  icon: ReactNode
}

const TABS: Tab[] = [
  { href: '/workout', label: 'Today', icon: <HomeIcon /> },
  { href: '/workout/library', label: 'Exercises', icon: <LibraryIcon /> },
  { href: '/workout/progress', label: 'Progress', icon: <ProgressIcon /> },
]

export function TabBar() {
  // pathname is the route pattern, so /workout/library/[id] still counts as Exercises
  const { pathname } = useRouter()
  return (
    <nav className="tabs" aria-label="Sections">
      {TABS.map((t) => {
        const active = pathname === t.href || (t.href !== '/workout' && pathname.startsWith(`${t.href}/`))
        return (
          <Link key={t.href} className="tab" href={t.href} aria-current={active ? 'page' : undefined}>
            {t.icon}
            <span>{t.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
