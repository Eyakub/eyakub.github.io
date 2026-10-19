import type { ReactNode } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { BookIcon, CalendarIcon, SlidersIcon } from './icons'

interface Tab {
  href: string
  label: string
  icon: ReactNode
}

// Progress joins this list in a later phase
const TABS: Tab[] = [
  { href: '/workout', label: 'Today', icon: <CalendarIcon /> },
  { href: '/workout/library', label: 'Library', icon: <BookIcon /> },
  { href: '/workout/settings', label: 'Settings', icon: <SlidersIcon /> },
]

export function TabBar() {
  // pathname is the route pattern, so /workout/library/[id] still counts as Library
  const { pathname } = useRouter()
  return (
    <nav className="tabs" aria-label="Sections">
      {TABS.map((t) => {
        const active = pathname === t.href || (t.href !== '/workout' && pathname.startsWith(`${t.href}/`))
        return (
          <Link key={t.href} href={t.href} aria-current={active ? 'page' : undefined}>
            {t.icon}
            {t.label}
          </Link>
        )
      })}
    </nav>
  )
}
