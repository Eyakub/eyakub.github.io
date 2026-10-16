import ClassicHome from './ClassicHome'
import Terminal from './terminal/Terminal'

// Homepage templates. data/site.json `home` picks which one `/` renders; /switch previews them all.
export const THEMES = [
  {
    id: 'classic',
    name: 'Classic',
    blurb: 'Hero, proof strip, How I build with the contribution graph, selected work, experience and contact.',
    Home: ClassicHome,
  },
  {
    id: 'terminal',
    name: 'Terminal',
    blurb: 'A rail with your name and links next to a terminal you can type in or tap through.',
    Home: Terminal,
  },
]

export const themeById = (id) => THEMES.find((t) => t.id === id)
