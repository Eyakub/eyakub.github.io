import type { ReactNode } from 'react'

function Svg({ children, strokeWidth }: { children: ReactNode; strokeWidth?: number }) {
  return (
    <svg className="ico" viewBox="0 0 24 24" aria-hidden="true" strokeWidth={strokeWidth}>
      {children}
    </svg>
  )
}

export const CalendarIcon = () => (
  <Svg>
    <rect x="3.5" y="5" width="17" height="15" rx="3" />
    <path d="M3.5 10h17M8 3v4M16 3v4" />
  </Svg>
)
export const BookIcon = () => (
  <Svg>
    <path d="M5 5.5A2.5 2.5 0 0 1 7.5 3H19v14H7.5A2.5 2.5 0 0 0 5 19.5zM5 19.5A2.5 2.5 0 0 0 7.5 22H19v-5" />
  </Svg>
)
export const SlidersIcon = () => (
  <Svg>
    <path d="M4 7h9M18 7h2M4 17h3M11 17h9" />
    <circle cx="15.5" cy="7" r="2.5" />
    <circle cx="8.5" cy="17" r="2.5" />
  </Svg>
)
export const SearchIcon = () => (
  <Svg>
    <circle cx="11" cy="11" r="6.5" />
    <path d="M20 20l-4.2-4.2" />
  </Svg>
)
export const BackIcon = () => (
  <Svg>
    <path d="M15 5l-7 7 7 7" />
  </Svg>
)
export const CheckIcon = ({ strokeWidth = 2.6 }: { strokeWidth?: number }) => (
  <Svg strokeWidth={strokeWidth}>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </Svg>
)
export const CrossIcon = () => (
  <Svg>
    <path d="M7 7l10 10M17 7L7 17" />
  </Svg>
)
export const PlayIcon = () => (
  <Svg>
    <path d="M8 5.5v13l10-6.5z" />
  </Svg>
)
export const PauseIcon = () => (
  <Svg>
    <path d="M9 6v12M15 6v12" />
  </Svg>
)
export const DumbbellIcon = () => (
  <Svg>
    <path d="M6.5 7v10M17.5 7v10M3.5 9.5v5M20.5 9.5v5M6.5 12h11" />
  </Svg>
)
export const BarIcon = () => (
  <Svg>
    <path d="M2.5 5h19M8 5v5.5M16 5v5.5M8 10.5a4 4 0 0 0 8 0" />
  </Svg>
)
export const BodyIcon = () => (
  <Svg>
    <circle cx="12" cy="4.5" r="2" />
    <path d="M12 7v7M7.5 10h9M12 14l-3 6.5M12 14l3 6.5" />
  </Svg>
)
