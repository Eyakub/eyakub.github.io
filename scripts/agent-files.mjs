// Generates public/llms.txt and public/resume.json from the site data (static hosting, so both are committed).
import fs from 'node:fs'

const rd = (f) => JSON.parse(fs.readFileSync(new URL(`../data/${f}`, import.meta.url), 'utf8'))
const work = rd('workexperience.json')
const projects = rd('projects.json').map((p) => p.fields)
const home = rd('homepage.json')

const SITE = 'https://eyakub.github.io'
const GITHUB = 'https://github.com/Eyakub'
const LINKEDIN = 'https://linkedin.com/in/eyakub-sorkar'
const RESUME = 'https://drive.google.com/file/d/1KPUkyNtMhGjGncjVA_U99YA6QZMr7WlN/view?usp=sharing'
const SUMMARY =
  'Full-stack engineer in Dhaka shipping AI features. Python, FastAPI, Django, PostgreSQL, Next.js, and a team of coding agents.'
const dates = (j) => `${j.startDate} – ${j.endDate}`
const link = (p) => p.liveUrl || `${SITE}/projects`

const llms = `# Eyakub Sorkar

${SUMMARY}

## Links

- Site: ${SITE}/
- Learn: ${SITE}/learn
- GitHub: ${GITHUB}
- LinkedIn: ${LINKEDIN}
- Résumé: ${RESUME}

## Experience

${work.map((j) => `- ${j.company}, ${j.title} (${dates(j)}): ${j.summary}`).join('\n')}

## Projects

${projects.map((p) => `- [${p.title}](${link(p)}): ${p.summary}`).join('\n')}

Updated ${home.asOf}.
`

const resume = {
  basics: {
    name: 'Eyakub Sorkar',
    label: 'Full-stack + AI engineer',
    email: 'eyakubsorkar@gmail.com',
    url: `${SITE}/`,
    summary: SUMMARY,
    location: { city: 'Dhaka', countryCode: 'BD' },
    profiles: [
      { network: 'GitHub', username: 'Eyakub', url: GITHUB },
      { network: 'LinkedIn', username: 'eyakub-sorkar', url: LINKEDIN },
    ],
  },
  work: work.map((j) => ({
    name: j.company,
    position: j.title,
    startDate: j.startDate,
    endDate: j.endDate,
    summary: j.summary,
    highlights: j.responsibilities,
  })),
  projects: projects.map((p) => ({
    name: p.title,
    description: p.summary,
    url: link(p),
    keywords: p.chips,
  })),
}

fs.writeFileSync(new URL('../public/llms.txt', import.meta.url), llms)
fs.writeFileSync(new URL('../public/resume.json', import.meta.url), JSON.stringify(resume, null, 2) + '\n')
