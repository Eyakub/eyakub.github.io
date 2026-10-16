// Refreshes data/contributions.json from GitHub. Run `npm run contributions` (needs `gh auth login`).
// The data is committed so builds, including CI, never depend on the network or a personal token.
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'

const LEVEL = { NONE: 0, FIRST_QUARTILE: 1, SECOND_QUARTILE: 2, THIRD_QUARTILE: 3, FOURTH_QUARTILE: 4 }
const query = `query {
  user(login: "Eyakub") {
    contributionsCollection {
      restrictedContributionsCount
      contributionCalendar { totalContributions weeks { contributionDays { date contributionCount contributionLevel } } }
    }
  }
}`

const res = JSON.parse(execFileSync('gh', ['api', 'graphql', '-f', `query=${query}`], { encoding: 'utf8' }))
const c = res.data.user.contributionsCollection
const days = c.contributionCalendar.weeks.flatMap((w) => w.contributionDays)
const total = c.contributionCalendar.totalContributions

if (new Date(`${days[0].date}T00:00:00Z`).getUTCDay() !== 0) throw new Error('calendar must start on a Sunday')
if (days.reduce((s, d) => s + d.contributionCount, 0) !== total) throw new Error('day counts do not add up to the total')

const out = {
  from: days[0].date,
  to: days.at(-1).date,
  total,
  private: c.restrictedContributionsCount,
  days: days.map((d) => [d.contributionCount, LEVEL[d.contributionLevel]]),
}
fs.writeFileSync(new URL('../data/contributions.json', import.meta.url), JSON.stringify(out) + '\n')
console.log(`${total} contributions, ${out.from} to ${out.to}`)
