import type { ReactNode } from 'react'

function Svg({ children, strokeWidth }: { children: ReactNode; strokeWidth?: number }) {
  return (
    <svg className="ico" viewBox="0 0 24 24" aria-hidden="true" strokeWidth={strokeWidth}>
      {children}
    </svg>
  )
}

export const HomeIcon = () => (
  <Svg>
    <path d="M4 11.5 12 5l8 6.5V20h-5.5v-5h-5v5H4z" />
  </Svg>
)
export const LibraryIcon = () => (
  <Svg>
    <path d="M5 4h4v16H5zM10.5 4h4v16h-4zM16 5.2l3.6-.9 2.4 15.4-3.6.9z" />
  </Svg>
)
export const ProgressIcon = () => (
  <Svg>
    <path d="M4 20h16M7 16v-4M12 16V8M17 16v-7" />
  </Svg>
)
export const GearIcon = () => (
  <Svg>
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1" />
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
