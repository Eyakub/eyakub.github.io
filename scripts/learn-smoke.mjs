// Browser smoke checks over the static export in out/. Run `npm run build` first.
import http from 'node:http'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { chromium } from 'playwright-core'

const ROOT = path.resolve('out')
const SHOTS = path.resolve('.smoke')
fs.mkdirSync(SHOTS, { recursive: true })

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.ico': 'image/x-icon',
  '.woff2': 'font/woff2', '.woff': 'font/woff', '.txt': 'text/plain', '.xml': 'application/xml',
}

function resolveFile(urlPath) {
  const p = decodeURIComponent(urlPath.split('?')[0]).replace(/\/+$/, '') || '/index'
  const rel = path.normalize(p).replace(/^(\.\.[/\\])+/, '')
  const candidates = [path.join(ROOT, rel), path.join(ROOT, rel + '.html'), path.join(ROOT, rel, 'index.html')]
  for (const c of candidates) {
    if (c.startsWith(ROOT) && fs.existsSync(c) && fs.statSync(c).isFile()) return { file: c, status: 200 }
  }
  return { file: path.join(ROOT, '404.html'), status: 404 }
}

const server = http.createServer((req, res) => {
  const { file, status } = resolveFile(req.url ?? '/')
  const body = fs.existsSync(file) ? fs.readFileSync(file) : Buffer.from('not found')
  res.writeHead(status, { 'content-type': MIME[path.extname(file)] ?? 'application/octet-stream' })
  res.end(body)
})
await new Promise((r) => server.listen(0, '127.0.0.1', r))
const ORIGIN = `http://127.0.0.1:${server.address().port}`

function findChromium() {
  if (process.env.LEARN_CHROMIUM) return process.env.LEARN_CHROMIUM
  const base = path.join(os.homedir(), 'Library/Caches/ms-playwright')
  const dirs = fs.existsSync(base) ? fs.readdirSync(base).filter((d) => d.startsWith('chromium_headless_shell-')).sort() : []
  for (const d of dirs.reverse()) {
    const exe = path.join(base, d, 'chrome-headless-shell-mac-arm64', 'chrome-headless-shell')
    if (fs.existsSync(exe)) return exe
  }
  throw new Error('No Chromium found. Set LEARN_CHROMIUM to an executable path.')
}

const browser = await chromium.launch({ executablePath: findChromium() })

// Fresh context per check; collects page errors and same-origin request failures.
async function open(url, { width = 1280, height = 860, allow404 = false } = {}) {
  const context = await browser.newContext({ viewport: { width, height } })
  const page = await context.newPage()
  const problems = []
  page.on('pageerror', (e) => problems.push(`pageerror: ${e.message}`))
  page.on('requestfailed', (r) => {
    if (r.url().startsWith(ORIGIN)) problems.push(`requestfailed: ${r.url()} ${r.failure()?.errorText ?? ''}`)
  })
  page.on('response', (r) => {
    if (r.url().startsWith(ORIGIN) && r.status() >= 400 && !(allow404 && r.status() === 404)) {
      problems.push(`HTTP ${r.status()}: ${r.url()}`)
    }
  })
  const response = await page.goto(ORIGIN + url, { waitUntil: 'networkidle' })
  return { page, context, problems, response }
}
const shot = (page, name) => page.screenshot({ path: path.join(SHOTS, `${name}.png`), fullPage: true })
const assert = (cond, msg) => { if (!cond) throw new Error(msg) }
const noProblems = (problems) => assert(problems.length === 0, problems.join('; '))

const checks = [
  ['hub-loads', async () => {
    const { page, context, problems } = await open('/learn')
    await page.waitForSelector('h1')
    await shot(page, 'hub-desktop')
    await context.close()
    noProblems(problems)
  }],
  ['nested-route-assets', async () => {
    const { page, context, problems } = await open('/learn/celery-redis')
    await page.waitForSelector('h1')
    const title = await page.textContent('h1')
    await shot(page, 'topic-desktop')
    await context.close()
    assert(title?.includes('Celery + Redis'), `unexpected title: ${title}`)
    noProblems(problems)
  }],
  ['unknown-slug-404', async () => {
    const { context, response } = await open('/learn/nope', { allow404: true })
    const status = response?.status()
    await context.close()
    assert(status === 404, `expected 404, got ${status}`)
  }],
  ['lang-persists', async () => {
    const { page, context, problems } = await open('/learn')
    await page.getByRole('button', { name: 'বাংলা' }).click()
    await page.reload({ waitUntil: 'networkidle' })
    await page.waitForFunction(() => document.documentElement.lang === 'bn')
    const h1 = await page.textContent('h1')
    await shot(page, 'hub-bn')
    await context.close()
    assert(/[ঀ-৿]/.test(h1 ?? ''), `h1 not Bengali: ${h1}`)
    noProblems(problems)
  }],
  ['no-overflow', async () => {
    for (const url of ['/learn', '/learn/celery-redis']) {
      const { page, context } = await open(url, { width: 390, height: 844 })
      const w = await page.evaluate(() => document.documentElement.scrollWidth)
      await shot(page, `mobile${url.replace(/\//g, '-')}`)
      await context.close()
      assert(w <= 390, `${url} scrollWidth ${w} > 390`)
    }
  }],
  ['hub-map', async () => {
    const { page, context, problems } = await open('/learn')
    await page.waitForSelector('.network-svg .st')
    const count = await page.locator('.network-svg .st').count()
    await shot(page, 'hub-map')
    await page.locator('.network-svg .st[data-id="python-gil"]').click()
    await page.waitForSelector('.toast')
    const toast = await page.textContent('.toast')
    await page.locator('.network-svg .st[data-id="celery-redis"]').click()
    await page.waitForURL('**/learn/celery-redis')
    await page.waitForLoadState('networkidle')
    await context.close()
    assert(count === 20, `expected 20 stations, got ${count}`)
    assert(toast?.includes('Phase 2'), `toast missing Phase 2: ${toast}`)
    noProblems(problems)
  }],
  ['hub-strips-mobile', async () => {
    const { page, context } = await open('/learn', { width: 390, height: 844 })
    const mapVisible = await page.locator('.network-svg').isVisible().catch(() => false)
    const strips = await page.locator('.strip').count()
    await shot(page, 'hub-strips-mobile')
    await context.close()
    assert(!mapVisible, 'network map visible on mobile')
    assert(strips === 5, `expected 5 strips, got ${strips}`)
  }],
  ['navbar-learn', async () => {
    const { page, context } = await open('/')
    const hrefs = await page.locator('a', { hasText: /^Learn$/ }).evaluateAll((els) => els.map((e) => e.getAttribute('href')))
    await context.close()
    assert(hrefs.includes('/learn'), `no Learn link to /learn, got ${JSON.stringify(hrefs)}`)
  }],
  ['lang-client-nav', async () => {
    const { page, context } = await open('/learn')
    await page.getByRole('button', { name: 'বাংলা' }).click()
    await page.locator('a.btn.primary').click()
    await page.waitForURL('**/learn/celery-redis')
    const state = await page.evaluate(() => ({
      lang: document.documentElement.lang,
      lede: document.querySelector('p.lede')?.textContent ?? '',
    }))
    await context.close()
    assert(state.lang === 'bn', `lang flashed back to ${state.lang}`)
    assert(/[ঀ-৿]/.test(state.lede), `lede not Bengali: ${state.lede}`)
  }],
  ['lang-reset-on-leave', async () => {
    const { page, context } = await open('/learn/celery-redis')
    await page.getByRole('button', { name: 'বাংলা' }).click()
    await page.locator('footer.foot a').click()
    await page.waitForURL((u) => u.pathname === '/')
    // URL flips on pushState, a tick before the route commits and the provider unmounts
    await page.waitForSelector('.learn-root', { state: 'detached' })
    const lang = await page.evaluate(() => document.documentElement.lang)
    await context.close()
    assert(lang === 'en', `lang on / is ${lang}`)
  }],
  ['existing-pages', async () => {
    for (const url of ['/', '/projects', '/eyasir']) {
      const { context, problems } = await open(url)
      await context.close()
      assert(problems.length === 0, `${url}: ${problems.join('; ')}`)
    }
  }],
]

let failed = 0
for (const [name, fn] of checks) {
  try {
    await fn()
    console.log(`PASS ${name}`)
  } catch (e) {
    failed++
    console.log(`FAIL ${name}: ${e.message}`)
  }
}
await browser.close()
server.close()
process.exit(failed ? 1 : 0)
