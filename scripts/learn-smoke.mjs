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
    // Record every lang value and the topic lede at the moment #topic-view first mounts (before paint).
    await page.evaluate(() => {
      const w = window
      w.__langs = [document.documentElement.lang]
      w.__firstLede = null
      new MutationObserver(() => w.__langs.push(document.documentElement.lang)).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] })
      new MutationObserver(() => {
        const lede = document.querySelector('#topic-view p.lede')
        if (lede && w.__firstLede === null) w.__firstLede = lede.textContent ?? ''
      }).observe(document.body, { childList: true, subtree: true })
    })
    await page.locator('a.btn.primary').click()
    await page.waitForSelector('#topic-view')
    const state = await page.evaluate(() => ({ langs: window.__langs, firstLede: window.__firstLede }))
    await context.close()
    assert(!state.langs.includes('en'), `lang flashed to en during navigation: ${state.langs.join(',')}`)
    assert(/[ঀ-৿]/.test(state.firstLede ?? ''), `topic lede not Bengali on first mount: ${state.firstLede}`)
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
  ['player-step', async () => {
    const { page, context, problems } = await open('/learn/celery-redis')
    await page.waitForSelector('#next')
    await page.click('#next'); await page.click('#next')
    await page.waitForTimeout(1500)
    const stop = await page.textContent('#stopno')
    const vis = page.locator('.packet:not([hidden])')
    const count = await vis.count()
    const box = await vis.first().boundingBox()
    await shot(page, 'player-desktop')
    await context.close()
    assert(stop === 'Stop 3 of 10', `stopno: ${stop}`)
    assert(count === 1, `visible packets: ${count}`)
    assert(box && box.width > 40, `packet width ${box?.width}`)
    noProblems(problems)
  }],
  ['player-rapid', async () => {
    const { page, context } = await open('/learn/celery-redis')
    await page.waitForSelector('#next')
    for (let i = 0; i < 5; i++) await page.click('#next', { delay: 0 })
    await page.waitForTimeout(1500)
    const stop = await page.textContent('#stopno')
    const packets = await page.locator('.packet:not([hidden])').count()
    const comets = await page.locator('.comet:not([hidden])').count()
    await context.close()
    assert(stop === 'Stop 6 of 10', `stopno: ${stop}`)
    assert(packets === 1, `visible packets: ${packets}`)
    assert(comets === 0, `visible comets: ${comets}`)
  }],
  ['player-resize', async () => {
    const { page, context } = await open('/learn/celery-redis')
    await page.waitForSelector('#next')
    await page.click('#next'); await page.click('#next')
    await page.waitForTimeout(1500)
    const before = await page.textContent('#stopno')
    await page.setViewportSize({ width: 390, height: 844 })
    await page.waitForTimeout(300)
    const after = await page.textContent('#stopno')
    const vb = await page.getAttribute('svg.flow-svg', 'viewBox')
    const packets = await page.locator('.packet:not([hidden])').count()
    await shot(page, 'player-mobile')
    await context.close()
    assert(before === after, `counter changed ${before} -> ${after}`)
    assert(vb?.startsWith('0 0 400'), `viewBox: ${vb}`)
    assert(packets === 1, `visible packets: ${packets}`)
  }],
  ['player-lang-during-play', async () => {
    const { page, context } = await open('/learn/celery-redis')
    await page.waitForSelector('#play')
    await page.click('#play')
    await page.getByRole('button', { name: 'বাংলা' }).click()
    await page.waitForTimeout(4500)
    const stop = await page.textContent('#stopno')
    const label = await page.textContent('#play')
    await context.close()
    assert(/^স্টপ [০-৯]+ \/ ১০$/.test(stop ?? ''), `stopno: ${stop}`)
    assert(label?.trim() === 'থামান', `play label: ${label}`)
  }],
  ['player-failure-route', async () => {
    const { page, context } = await open('/learn/celery-redis')
    await page.getByRole('button', { name: 'A job fails' }).click()
    const stop = await page.textContent('#stopno')
    await page.click('#next')
    await page.waitForTimeout(300)
    const errs = await page.locator('.edge.k-error').evaluateAll((els) => els.filter((e) => getComputedStyle(e).opacity !== '0' && e.classList.contains('active')).length)
    await context.close()
    assert(stop === 'Stop 5 of 8', `stopno: ${stop}`)
    assert(errs >= 1, `no visible k-error edge: ${errs}`)
  }],
  ['player-keyboard', async () => {
    const { page, context } = await open('/learn/celery-redis')
    await page.waitForSelector('#next')
    await page.focus('#next')
    await page.keyboard.press('ArrowRight')
    const stop = await page.textContent('#stopno')
    await context.close()
    assert(stop === 'Stop 2 of 10', `stopno: ${stop}`)
  }],
  ['player-mobile-order', async () => {
    const { page, context } = await open('/learn/celery-redis', { width: 390, height: 844 })
    await page.waitForSelector('.now')
    const top = (sel) => page.evaluate((s) => document.querySelector(s).getBoundingClientRect().top + scrollY, sel)
    const [n, s, c] = [await top('.now'), await top('.stage'), await top('.controls')]
    await context.close()
    assert(n < s && s < c, `order now=${n} stage=${s} controls=${c}`)
  }],
  ['reduced-motion', async () => {
    const context = await browser.newContext({ viewport: { width: 1280, height: 860 }, reducedMotion: 'reduce' })
    const page = await context.newPage()
    await page.goto(ORIGIN + '/learn/celery-redis', { waitUntil: 'networkidle' })
    await page.click('#next')
    const vis = await page.locator('.packet:not([hidden])').count()
    const a = await page.getAttribute('.packet:not([hidden])', 'transform')
    await page.waitForTimeout(200)
    const b = await page.getAttribute('.packet:not([hidden])', 'transform')
    await context.close()
    assert(vis === 1, `visible packets: ${vis}`)
    assert(a && a === b, `packet moved: ${a} -> ${b}`)
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
