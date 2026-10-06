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
async function open(url, { width = 1280, height = 860, allow404 = false, waitUntil = 'networkidle', reducedMotion } = {}) {
  const context = await browser.newContext({ viewport: { width, height }, ...(reducedMotion ? { reducedMotion } : {}) })
  const page = await context.newPage()
  const problems = []
  page.on('pageerror', (e) => problems.push(`pageerror: ${e.message}`))
  page.on('requestfailed', (r) => {
    // Next.js aborts in-flight _next/data prefetches on navigation; that is not a real failure.
    if (r.failure()?.errorText?.includes('net::ERR_ABORTED')) return
    if (r.url().startsWith(ORIGIN)) problems.push(`requestfailed: ${r.url()} ${r.failure()?.errorText ?? ''}`)
  })
  page.on('response', (r) => {
    if (r.url().startsWith(ORIGIN) && r.status() >= 400 && !(allow404 && r.status() === 404)) {
      problems.push(`HTTP ${r.status()}: ${r.url()}`)
    }
  })
  const response = await page.goto(ORIGIN + url, { waitUntil })
  return { page, context, problems, response }
}
const shot = (page, name) => page.screenshot({ path: path.join(SHOTS, `${name}.png`), fullPage: true })
const assert = (cond, msg) => { if (!cond) throw new Error(msg) }
const noProblems = (problems) => assert(problems.length === 0, problems.join('; '))

const TOPIC_CASES = [
  { slug: 'celery-redis', total: 10, altStop: 'Stop 5 of 8', taught: true },
  { slug: 'fastapi-lifecycle', total: 12, altStop: 'Stop 7 of 10', taught: true },
  { slug: 'git-basics', total: 9, altStop: 'Stop 9 of 12', altBtn: 3, taught: true, step3Packets: 0 },
  { slug: 'concurrency-vs-parallelism', total: 9, altStop: 'Stop 7 of 10', taught: true, altFail: false },
  { slug: 'processes-vs-threads', total: 10, altStop: 'Stop 4 of 5', altBtn: 2, taught: true },
  { slug: 'python-gil', total: 11, altStop: 'Stop 7 of 11', taught: true, altFail: false },
  { slug: 'multiprocessing-pools', total: 8, altStop: 'Stop 2 of 3', altBtn: 2, taught: true },
  { slug: 'asyncio-event-loop', total: 10, altStop: 'Stop 3 of 5', taught: true },
  { slug: 'race-conditions-locks', total: 10, altStop: 'Stop 7 of 9', altBtn: 2, step3Packets: 0, taught: true },
]
// SMOKE_TOPICS=a,b limits the per-topic loops to those slugs, for quick runs while authoring one topic.
const onlyTopics = process.env.SMOKE_TOPICS?.split(',').map((t) => t.trim()).filter(Boolean)
if (onlyTopics?.length) {
  const kept = TOPIC_CASES.filter((t) => onlyTopics.includes(t.slug))
  if (!kept.length) throw new Error(`SMOKE_TOPICS matched no topic: ${onlyTopics.join(', ')}`)
  TOPIC_CASES.splice(0, TOPIC_CASES.length, ...kept)
}

const STEP_MS = 1400 // long enough for the packet animation and its arrival callback to finish

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
    for (const url of ['/learn', ...TOPIC_CASES.map((t) => `/learn/${t.slug}`)]) {
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
    await page.locator('.network-svg .st[data-id="docker"]').click()
    await page.waitForSelector('.toast')
    const toast = await page.textContent('.toast')
    await page.locator('.network-svg .st[data-id="celery-redis"]').click()
    await page.waitForURL('**/learn/celery-redis')
    await page.waitForLoadState('networkidle')
    await context.close()
    assert(count === 20, `expected 20 stations, got ${count}`)
    assert(toast?.includes('Phase 3'), `toast missing Phase 3: ${toast}`)
    noProblems(problems)
  }],
  ['hub-concurrency-open', async () => {
    const slugs = ['concurrency-vs-parallelism', 'processes-vs-threads', 'python-gil', 'multiprocessing-pools', 'asyncio-event-loop', 'race-conditions-locks']
    const { page, context, problems } = await open('/learn')
    await page.waitForSelector('.network-svg .st')
    const closed = []
    for (const slug of slugs) if ((await page.locator(`.network-svg .st.open[data-id="${slug}"]`).count()) !== 1) closed.push(slug)
    await page.locator('.network-svg .st[data-id="asyncio-event-loop"]').click()
    await page.waitForURL('**/learn/asyncio-event-loop')
    // Client-side navigation updates the URL before the new page renders.
    const rendered = await page.waitForFunction(() => document.querySelector('h1')?.textContent?.includes('asyncio'), null, { timeout: 10000 }).then(() => true, () => false)
    const h1 = await page.textContent('h1')
    await context.close()
    assert(closed.length === 0, `stations not open: ${closed.join(', ')}`)
    assert(rendered, `topic page never rendered; h1: ${h1}`)
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
  ['hub-start-here', async () => {
    const { page, context } = await open('/learn', { width: 390, height: 844 })
    await page.waitForSelector('.start-here a')
    const hrefs = await page.locator('.start-here a').evaluateAll((els) => els.map((e) => e.getAttribute('href')))
    const cta = await page.locator('.hero a.btn.primary').getAttribute('href')
    const w = await page.evaluate(() => document.documentElement.scrollWidth)
    await shot(page, 'hub-start-here-mobile')
    await context.close()
    const want = ['concurrency-vs-parallelism', 'processes-vs-threads', 'git-basics', 'celery-redis'].map((s) => '/learn/' + s)
    assert(hrefs.length === 4 && hrefs.every((h, i) => h?.replace(/\/$/, '').endsWith(want[i])), `start-here links: ${JSON.stringify(hrefs)}`)
    assert(cta?.replace(/\/$/, '').endsWith('/learn/concurrency-vs-parallelism'), `hero href: ${cta}`)
    assert(w <= 390, `scrollWidth ${w} > 390`)
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
    // step3Packets: how many packets stop 3 shows (2+ for a parallel step, 0 for a work step).
    for (const { slug, total, step3Packets = 1 } of TOPIC_CASES) {
      const { page, context, problems } = await open(`/learn/${slug}`)
      await page.waitForSelector('#next')
      await page.click('#next'); await page.click('#next')
      await page.waitForTimeout(1500)
      const stop = await page.textContent('#stopno')
      const vis = page.locator('.packet:not([hidden])')
      const count = await vis.count()
      const box = count ? await vis.first().boundingBox() : null
      await shot(page, slug === 'celery-redis' ? 'player-desktop' : `player-${slug.split('-')[0]}-desktop`)
      await context.close()
      assert(stop === `Stop 3 of ${total}`, `${slug} stopno: ${stop}`)
      assert(count === step3Packets, `${slug} visible packets: ${count}, expected ${step3Packets}`)
      if (step3Packets) assert(box && box.width > 40, `${slug} packet width ${box?.width}`)
      noProblems(problems)
    }
  }],
  ['git-state', async () => {
    const { page, context, problems } = await open('/learn/git-basics')
    await page.waitForSelector('#next')
    await page.click('#next'); await page.click('#next')
    await page.waitForTimeout(1500)
    const stop = await page.textContent('#stopno')
    const sb = await page.locator('.flow-svg .node[data-id="repo"] .sb').textContent()
    await context.close()
    assert(stop === 'Stop 3 of 9', `stopno: ${stop}`)
    assert(sb?.includes('a1b2c3'), `repo sub: ${sb}`)
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
    const fa = await context.newPage()
    await fa.setViewportSize({ width: 390, height: 844 })
    await fa.goto(ORIGIN + '/learn/fastapi-lifecycle', { waitUntil: 'networkidle' })
    await fa.waitForSelector('#next')
    await fa.click('#next'); await fa.click('#next')
    await fa.waitForTimeout(1500)
    await shot(fa, 'player-fastapi-mobile')
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
  ['player-alt-route', async () => {
    for (const { slug, altStop, altBtn = 1, altFail } of TOPIC_CASES) {
      const { page, context } = await open(`/learn/${slug}`)
      await page.getByRole('group', { name: 'Route' }).getByRole('button').nth(altBtn).click()
      const stop = await page.textContent('#stopno')
      await page.click('#next')
      await page.waitForTimeout(300)
      const errs = await page.locator('.edge.k-error').evaluateAll((els) => els.filter((e) => getComputedStyle(e).opacity !== '0' && e.classList.contains('active')).length)
      const errWork = await page.locator('.node.working').evaluateAll((els) => els.filter((e) => (e.getAttribute('style') ?? '').includes('--k-error')).length)
      const lit = await page.locator('.edge.active, .node.working').evaluateAll((els) => els.filter((e) => getComputedStyle(e).opacity !== '0').length)
      await context.close()
      assert(stop === altStop, `${slug} stopno: ${stop}`)
      if (altFail === false) assert(lit >= 1, `${slug} no visible active edge or working node`)
      else assert(errs >= 1 || errWork >= 1, `${slug} no visible error edge or error-working node`)
    }
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
  ['keyboard-ends', async () => {
    for (const { slug } of TOPIC_CASES) {
      const { page, context } = await open(`/learn/${slug}`)
      await page.waitForSelector('#next')
      await page.focus('#next')
      const total = Number((await page.textContent('#stopno')).match(/of (\d+)/)[1])
      for (let i = 1; i < total; i++) await page.keyboard.press('ArrowRight')
      const inside = await page.evaluate(() => !!document.activeElement?.closest('#player'))
      const atLast = await page.textContent('#stopno')
      await page.keyboard.press('ArrowLeft')
      const back = await page.textContent('#stopno')
      await context.close()
      assert(atLast === `Stop ${total} of ${total}`, `${slug} did not reach last stop: ${atLast}`)
      assert(inside, `${slug} focus left the player at the last stop`)
      assert(back === `Stop ${total - 1} of ${total}`, `${slug} ArrowLeft after end: ${back}`)
    }
  }],
  ['mobile-fits', async () => {
    for (const { slug } of TOPIC_CASES) {
      for (const lang of ['en', 'bn']) {
        const { page, context } = await open(`/learn/${slug}`, { width: 390, height: 844 })
        if (lang === 'bn') {
          await page.getByRole('button', { name: 'বাংলা' }).click()
          await page.waitForFunction(() => document.documentElement.lang === 'bn')
        }
        await page.waitForSelector('#next')
        const total = Number((await page.textContent('#stopno')).match(/(\d+)\D*$/)?.[1] ?? 0) || (await page.locator('.pips i').count())
        const bad = []
        const fits = async (label) => {
          await page.evaluate(() => document.querySelector('.now').scrollIntoView({ block: 'start', behavior: 'instant' }))
          await page.waitForTimeout(450)
          const m = await page.evaluate(() => ({
            nowTop: document.querySelector('.now').getBoundingClientRect().top,
            stageBottom: document.querySelector('.stage .flow-svg').getBoundingClientRect().bottom,
            ctrlTop: document.querySelector('.controls').getBoundingClientRect().top,
          }))
          if (m.stageBottom > m.ctrlTop + 0.5 || m.nowTop < -0.5) bad.push(`${label}: ${JSON.stringify(m)}`)
        }
        for (let i = 0; i < total; i++) {
          await fits(`stop ${i + 1}`)
          if (i < total - 1) await page.click('#next')
        }
        // The What-if banner makes the first alt stop the tallest Now panel on a route; check only that stop per alt route.
        const routeBtns = page.locator('.switches .switch').nth(1).locator('button')
        const routes = await routeBtns.count()
        for (let r = 1; r < routes; r++) {
          await routeBtns.nth(r).click()
          await page.waitForTimeout(100)
          const first = Number((await page.textContent('#stopno')).match(/(\d+)\D+\d+\D*$/)?.[1] ?? 0)
          await fits(`alt ${r} first stop (${first})`)
        }
        await context.close()
        assert(bad.length === 0, `${slug} ${lang}: ${bad.slice(0, 3).join(' | ')} (${bad.length} bad)`)
      }
    }
  }],
  ['wide-frame', async () => {
    const geom = (page, sel) => page.evaluate((s) => {
      const r = document.querySelector(s).getBoundingClientRect()
      return { left: r.left, right: r.right, cw: document.documentElement.clientWidth, w: r.width }
    }, sel)
    const inside = (g, label) => {
      assert(g.left >= 0 && g.right <= g.cw, `${label}: frame ${g.left}..${g.right} outside ${g.cw}`)
      assert(Math.abs(g.left - (g.cw - g.right)) <= 2, `${label}: frame not centred (${g.left} vs ${g.cw - g.right})`)
    }
    for (const [w, h, minSvg] of [[1920, 1080, 690], [1280, 860, 690], [2560, 1440, 0]]) {
      const { page, context } = await open('/learn/fastapi-lifecycle', { width: w, height: h })
      await page.waitForSelector('.flow-svg')
      await page.evaluate(() => document.fonts.ready)
      const g = await geom(page, '.player')
      const head = await geom(page, '.topic-head')
      const top = await geom(page, '.topic-top')
      const svg = await page.evaluate(() => { const el = document.querySelector('.flow-svg'); return { w: el.getBoundingClientRect().width, vb: el.viewBox.baseVal.width } })
      if (w !== 2560) await shot(page, `wide-${w}`)
      await context.close()
      inside(g, `${w} player`)
      assert(Math.abs(g.left - head.left) <= 1, `${w}: player left ${g.left} != topic-head left ${head.left}`)
      assert(Math.abs(g.right - top.right) <= 1, `${w}: player right ${g.right} != topic-top right ${top.right}`)
      assert(g.w <= 1296.5, `${w}: player ${g.w}px > 1296`)
      assert(svg.w <= svg.vb + 0.5, `${w}: flow-svg ${svg.w}px > viewBox ${svg.vb}`)
      assert(svg.w >= minSvg, `${w}: flow-svg ${svg.w}px < ${minSvg}`)
    }
    const { page, context } = await open('/learn', { width: 1920, height: 1080 })
    await page.waitForSelector('.map-sec')
    await page.evaluate(() => document.fonts.ready)
    const g = await geom(page, '.map-sec')
    const mapH = await page.evaluate(() => ({ h: document.querySelector('.network-svg').getBoundingClientRect().height, ih: innerHeight }))
    await shot(page, 'wide-hub-1920')
    await context.close()
    inside(g, 'hub map-sec')
    assert(mapH.h <= mapH.ih, `hub map height ${mapH.h} > viewport ${mapH.ih}`)
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
  ['packet-colour', async () => {
    const { page, context, problems } = await open('/learn/celery-redis', { reducedMotion: 'reduce' })
    await page.waitForSelector('.packet:not([hidden]) rect')
    const { fill, want } = await page.evaluate(() => {
      const norm = (c) => { const el = document.createElement('i'); el.style.color = c; document.body.appendChild(el); const v = getComputedStyle(el).color; el.remove(); return v }
      const fill = getComputedStyle(document.querySelector('.packet rect')).fill
      const want = getComputedStyle(document.querySelector('.learn-root')).getPropertyValue('--k-request').trim()
      return { fill: norm(fill), want: norm(want) }
    })
    await context.close()
    noProblems(problems)
    assert(fill === want, `packet fill ${fill} != --k-request ${want}`)
    // Mixed-kind parallel step: each packet must take the colour of its own edge kind.
    const gil = await open('/learn/python-gil', { reducedMotion: 'reduce' })
    await gil.page.waitForSelector('.packet:not([hidden]) rect')
    for (let i = 0; i < 6; i++) { await gil.page.click('#next'); await gil.page.waitForTimeout(150) }
    const fills = await gil.page.evaluate(() => {
      const norm = (c) => { const el = document.createElement('i'); el.style.color = c; document.body.appendChild(el); const v = getComputedStyle(el).color; el.remove(); return v }
      const root = getComputedStyle(document.querySelector('.learn-root'))
      return {
        got: [...document.querySelectorAll('.packet:not([hidden])')].map((p) => norm(getComputedStyle(p.querySelector('rect')).fill)),
        transforms: [...document.querySelectorAll('.packet:not([hidden])')].map((p) => p.getAttribute('transform')),
        queue: norm(root.getPropertyValue('--k-queue').trim()),
        result: norm(root.getPropertyValue('--k-result').trim())
      }
    })
    await gil.context.close()
    noProblems(gil.problems)
    assert(fills.transforms.length === 2 && fills.transforms[0] && fills.transforms[1] && fills.transforms[0] !== fills.transforms[1], `python-gil stop 7 packets not placed apart: ${JSON.stringify(fills.transforms)}`)
    assert(fills.queue !== fills.result, `--k-queue and --k-result must differ: ${fills.queue}`)
    assert(fills.got.length === 2, `python-gil stop 7 packets: ${fills.got.length}`)
    assert(fills.got[0] === fills.queue && fills.got[1] === fills.result, `packet fills ${JSON.stringify(fills.got)} != [${fills.queue}, ${fills.result}]`)
  }],
  ['sections', async () => {
    const { page, context, problems } = await open('/learn/celery-redis')
    await page.waitForSelector('.twins li', { timeout: 2000 })
    const twins = await page.locator('.twins li').count()
    const retry = await page.locator('.twins li.retry').count()
    const qa = await page.locator('.qa details').count()
    const firstOpen = await page.locator('.qa details').first().evaluate((d) => d.open)
    const cheats = await page.locator('.cheat').count()
    const hrefs = await page.locator('.sources a').evaluateAll((els) => els.map((e) => e.getAttribute('href')))
    await page.locator('.done-row').scrollIntoViewIfNeeded()
    await shot(page, 'topic-sections')
    await context.close()
    assert(twins === 6, `twins ${twins}`)
    assert(retry === 1, `retry twins ${retry}`)
    assert(qa === 5 && firstOpen, `qa ${qa}, first open ${firstOpen}`)
    assert(cheats === 6, `cheats ${cheats}`)
    assert(hrefs.length >= 1 && hrefs.every((h) => h?.startsWith('https://')), `sources ${JSON.stringify(hrefs)}`)
    noProblems(problems)
  }],
  ['copy-button', async () => {
    const { page, context } = await open('/learn/celery-redis')
    await page.waitForSelector('.copy', { timeout: 2000 })
    await page.locator('.copy').first().click()
    await page.waitForFunction(() => /^(Copied|Selected, press Ctrl\+C)$/.test(document.querySelector('.copy span')?.textContent ?? ''), null, { timeout: 500 })
    await context.close()
  }],
  ['learned-flow', async () => {
    const { page, context } = await open('/learn/celery-redis')
    await page.waitForSelector('.done-btn', { timeout: 2000 })
    await page.click('.done-btn')
    const pressed = await page.getAttribute('.done-btn', 'aria-pressed')
    await page.locator('.crumb a').click()
    await page.waitForURL((u) => u.pathname === '/learn' || u.pathname === '/learn/')
    await page.waitForSelector('.network-svg .st[data-id="celery-redis"]')
    const station = await page.getAttribute('.network-svg .st[data-id="celery-redis"]', 'class')
    const chip = await page.locator('.strip .chip.learned').first().textContent()
    await context.close()
    assert(pressed === 'true', `aria-pressed ${pressed}`)
    assert(chip?.trim() === 'Learned', `chip ${chip}`)
    assert(/\bdone\b/.test(station ?? ''), `station class ${station}`)
  }],
  ['all-steps-no-errors', async () => {
    // The packet-arrival code runs in rAF callbacks, so a throw there only surfaces if every step is actually played out.
    for (const { slug } of TOPIC_CASES) {
      const { page, context, problems } = await open(`/learn/${slug}`)
      const routeBtns = page.locator('.switch .seg').nth(1).locator('button')
      const n = await routeBtns.count()
      for (let r = 0; r < n; r++) {
        await routeBtns.nth(r).click()
        await page.waitForTimeout(STEP_MS)
        while ((await page.getAttribute('#next', 'aria-disabled')) !== 'true') {
          await page.click('#next')
          await page.waitForTimeout(STEP_MS)
        }
      }
      await context.close()
      noProblems(problems)
    }
  }],
  ['story-mode', async () => {
    const git = await open('/learn/git-basics')
    await git.page.waitForSelector('#next')
    const storyBtn = git.page.getByRole('button', { name: 'Story', exact: true })
    assert((await storyBtn.count()) === 1, 'git-basics: Story button missing')
    await storyBtn.click()
    await git.page.locator('.now h2', { hasText: 'Mina edits a photo' }).waitFor({ timeout: 5000 })
    const now = await git.page.textContent('.now')
    assert(now.includes('Mina is fixing the trip album at home'), `story text missing: ${now}`)
    const lede = await git.page.textContent('.lede')
    assert(lede.includes('Mina and Rafi are making one trip photo album'), `lede is not the cast line: ${lede}`)
    const names = await git.page.locator('.node .nm').allTextContents()
    assert(names.includes('Messy desk'), `station labels are not plain: ${names.join(', ')}`)
    await git.page.click('#next')
    await git.page.locator('.now h2', { hasText: 'Mina glues a page' }).waitFor({ timeout: 5000 })
    await git.context.close()
    noProblems(git.problems)

    const celery = await open('/learn/celery-redis')
    await celery.page.waitForSelector('#next')
    assert((await celery.page.getByRole('button', { name: 'Story', exact: true }).count()) === 0, 'celery-redis: Story button should not exist')
    await celery.context.close()
    noProblems(celery.problems)
  }],
  ['teach-scaffold', async () => {
    // Runs only for topics migrated to the Simply layer (taught: true).
    for (const { slug, altBtn = 1 } of TOPIC_CASES.filter((c) => c.taught)) {
      const { page, context, problems } = await open(`/learn/${slug}`)
      await page.waitForSelector('#next')
      const route = (i) => page.getByRole('group', { name: 'Route' }).getByRole('button').nth(i)
      assert(await page.locator('.words').isVisible(), `${slug}: .words not visible`)
      const setMode = async (mode) => {
        const before = await page.textContent('.lede')
        await page.getByRole('button', { name: mode === 'simple' ? 'Simply' : 'Technically', exact: true }).click()
        await page.waitForFunction((b) => document.querySelector('.lede')?.textContent !== b, before, { timeout: 5000 }).catch(() => {})
        return {
          lede: await page.textContent('.lede'),
          names: await page.locator('.node .nm').allTextContents(),
          packets: await page.locator('.packet text').allTextContents(),
        }
      }
      await setMode('technical')
      const simple = await setMode('simple')
      const tech = await setMode('technical')
      await page.getByRole('button', { name: 'Simply', exact: true }).click()
      assert(simple.lede !== tech.lede, `${slug}: lede identical across modes`)
      assert(simple.names.some((n, i) => n !== tech.names[i]), `${slug}: no node name differs between modes`)
      assert(simple.packets.length > 0 && simple.packets.some((x, i) => x !== tech.packets[i]), `${slug}: stop 1 packet text identical across modes`)
      assert((await page.locator('.whatif').count()) === 0, `${slug}: .whatif on main stop 1`)
      await route(altBtn).click()
      await page.locator('.whatif').waitFor({ state: 'visible', timeout: 5000 })
      const wi = await page.locator('.whatif').textContent()
      assert(wi?.startsWith('What if'), `${slug}: whatif "${wi}"`)
      await page.click('#next')
      await page.waitForFunction(() => document.querySelectorAll('.whatif').length === 0, null, { timeout: 5000 })
      await route(0).click()
      const total = Number((await page.textContent('#stopno')).match(/\d+ of (\d+)/)?.[1])
      for (let i = 1; i < total - 1; i++) await page.click('#next')
      assert((await page.locator('.remember').count()) === 0, `${slug}: .remember before the last stop`)
      await page.click('#next')
      await page.locator('.remember').waitFor({ state: 'visible', timeout: 5000 })
      await context.close()
      noProblems(problems)
    }
  }],
  ['existing-pages', async () => {
    for (const url of ['/', '/projects', '/eyasir']) {
      // These pages pull external assets, so networkidle never settles offline; same-origin failures are still collected.
      const { context, problems } = await open(url, { waitUntil: 'load' })
      await context.close()
      assert(problems.length === 0, `${url}: ${problems.join('; ')}`)
    }
  }],
]

if (process.env.LEARN_SHOTS) {
  checks.push(['step-shots', async () => {
    const env = process.env.LEARN_SHOTS
    const slugs = env === 'all' ? TOPIC_CASES.map((c) => c.slug) : env.split(',').map((s) => s.trim()).filter(Boolean)
    const viewports = [{ name: 'wide', width: 1280, height: 860 }, { name: 'narrow', width: 390, height: 844 }]
    const modes = (process.env.LEARN_SHOTS_MODES ?? 'simple').split(',').map((m) => m.trim()).filter(Boolean)
    const langs = (process.env.LEARN_SHOTS_LANGS ?? 'en').split(',').map((m) => m.trim()).filter(Boolean)
    for (const slug of slugs) {
      for (const mode of modes) for (const lang of langs) {
        const dir = path.join(SHOTS, 'shots', slug, `${mode}-${lang}`)
        fs.mkdirSync(dir, { recursive: true })
        for (const vp of viewports) {
          const { page, context, problems } = await open(`/learn/${slug}`, { width: vp.width, height: vp.height, reducedMotion: 'reduce' })
          await page.waitForSelector('#next')
          if (lang === 'bn') {
            await page.getByRole('button', { name: 'বাংলা' }).click()
            await page.waitForSelector('html[lang="bn"]')
          }
          await page.locator('.switch .seg').nth(0).locator('button').nth(mode === 'simple' ? 0 : 1).click()
          // The sticky control bar covers the lower diagram on phones, so hide it for the capture only.
          await page.addStyleTag({ content: '.controls { opacity: 0 !important }' })
          const n = await page.locator('.switch .seg').nth(1).locator('button').count()
          for (let r = 0; r < n; r++) {
            await page.locator('.switch .seg').nth(1).locator('button').nth(r).click()
            await page.waitForTimeout(120)
            for (let i = 0; ; i++) {
              await page.locator('.flow-svg').screenshot({ path: path.join(dir, `${vp.name}-${r}-${String(i + 1).padStart(2, '0')}.png`) })
              if ((await page.getAttribute('#next', 'aria-disabled')) === 'true') break
              await page.click('#next')
              await page.waitForTimeout(120)
            }
          }
          await context.close()
          noProblems(problems)
        }
      }
    }
  }])
}

let failed = 0
const only = process.env.SMOKE_ONLY?.split(',')
for (const [name, fn] of checks) {
  if (only && !only.includes(name)) continue
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
