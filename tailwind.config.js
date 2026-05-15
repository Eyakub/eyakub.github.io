/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/eyasir.tsx',
    './components/martyr/**/*.{ts,tsx}',
  ],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        bd: {
          green: '#006A4E',
          'green-deep': '#004D38',
          red: '#C8102E',
          'red-deep': '#7A0A1B',
        },
        ivory: '#F5F1E8',
        parchment: '#EDE6D3',
        ink: '#1A1612',
        'ink-soft': '#3D362E',
        'ink-muted': '#6B6258',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        bangla: ['"Hind Siliguri"', '"Noto Sans Bengali"', 'sans-serif'],
        'bangla-serif': ['"Noto Serif Bengali"', '"Hind Siliguri"', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'flag-grain':
          "radial-gradient(circle at 25% 30%, rgba(0,106,78,0.08), transparent 50%), radial-gradient(circle at 75% 70%, rgba(200,16,46,0.08), transparent 50%)",
      },
    },
  },
  plugins: [],
};
