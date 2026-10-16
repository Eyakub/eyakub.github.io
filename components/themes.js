import ClassicHome from './ClassicHome'
import Bento from './bento/Bento'
import Terminal from './terminal/Terminal'

// Homepage templates (`bare` themes skip the site Container). data/site.json `home` picks which one `/` renders; /switch previews them all.
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
  {
    id: 'bento',
    name: 'Live bento',
    blurb: 'A bento grid in light or dark: the four words of the hook on the right, receipts, Rallo, the fit check, case study and experience.',
    Home: Bento,
    bare: true, // brings its own nav and layout, so it renders without components/Container
  },
]

export const themeById = (id) => THEMES.find((t) => t.id === id)
