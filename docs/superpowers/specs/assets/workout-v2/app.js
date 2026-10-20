/* Workout mock v2: shared state and screens for two visual directions.
   "plates" draws the week as plates loaded on a barbell; "blueprint" draws it as a technical sheet. */
(() => {
  'use strict'
  const D = window.WORKOUT_DATA, F = window.WorkoutFigure
  const EX = Object.fromEntries(D.exercises.map((e) => [e.id, e]))
  const R = Object.fromEntries(D.seed.routines.map((r) => [r.routineId, r]))
  const ORDER = ['push', 'pull', 'legs', 'full']
  const NAME = { push: 'Push', pull: 'Pull', legs: 'Legs + Core', full: 'Full body' }
  const SHORT = { push: 'Push', pull: 'Pull', legs: 'Legs', full: 'Full' }
  const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const DAY = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const DAY_LONG = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const TODAY = new Date(2026, 9, 20)
  const WEEK_START = new Date(2026, 9, 19)

  // ---------- sample history ----------
  // Nine weeks from Mon 24 Aug. Sessions land on whatever days fit; the rotation never resets.
  const COUNTS = [4, 3, 4, 4, 3, 4, 4, 3, 1]
  const DAYSETS = { 4: [0, 2, 4, 5], 3: [1, 3, 5], 1: [0] }
  function buildHistory() {
    const dates = []
    COUNTS.forEach((n, w) => DAYSETS[n].forEach((d) => dates.push(new Date(2026, 7, 24 + w * 7 + d))))
    const offset = (3 - (dates.length - 1) % 4 + 4) % 4
    return dates.map((date, i) => ({ date, routine: ORDER[(i + offset) % 4] }))
  }
  const WEIGHT = [['25 Aug', 80.6], ['28 Aug', 80.4], ['31 Aug', 80.5], ['3 Sep', 80.1], ['6 Sep', 80.0], ['9 Sep', 79.9], ['12 Sep', 80.0], ['15 Sep', 79.6], ['18 Sep', 79.5], ['21 Sep', 79.4], ['24 Sep', 79.6], ['27 Sep', 79.2], ['30 Sep', 79.1], ['3 Oct', 79.0], ['6 Oct', 78.9], ['9 Oct', 79.0], ['12 Oct', 78.7], ['15 Oct', 78.6], ['18 Oct', 78.7], ['20 Oct', 78.5]]
  const LAST = { 'decline-push-up': [14, 12, 11], 'push-up': [15, 15, 15], 'diamond-push-up': [11, 10, 9], 'db-shoulder-press': [12, 11, 10], 'db-lateral-raise': [15, 14], 'db-overhead-triceps-extension': [15, 15],
    'pull-up': [8, 7, 6], 'db-bent-over-row': [12, 12, 12], 'db-single-arm-row': [12, 12, 11], 'db-biceps-curl': [12, 11, 10], 'db-hammer-curl': [12, 12], 'dead-hang': [38, 32],
    'db-goblet-squat': [15, 15, 15], 'db-bulgarian-split-squat': [10, 10, 9], 'db-romanian-deadlift': [12, 12, 11], 'standing-calf-raise': [20, 20, 18], 'reverse-crunch': [15, 14, 13], plank: [45, 45, 40],
    'chin-up': [8, 7, 6], 'wide-push-up': [15, 13, 12], 'reverse-lunge': [12, 12, 11], 'dead-bug': [10, 10, 10] }
  const PROG = {
    'push-up': { label: 'Push-ups', s: [['31 Aug', [13, 12, 10]], ['7 Sep', [14, 12, 11]], ['14 Sep', [14, 13, 12]], ['21 Sep', [15, 13, 12]], ['28 Sep', [15, 14, 13]], ['5 Oct', [15, 15, 13]], ['13 Oct', [15, 15, 15]]] },
    'pull-up': { label: 'Pull-ups', s: [['1 Sep', [6, 5, 5]], ['8 Sep', [7, 6, 5]], ['17 Sep', [7, 6, 6]], ['24 Sep', [7, 7, 6]], ['1 Oct', [8, 7, 6]], ['8 Oct', [8, 7, 7]], ['15 Oct', [8, 7, 6]]] },
    'db-goblet-squat': { label: 'Goblet squat', s: [['3 Sep', [15, 13, 12]], ['10 Sep', [15, 14, 12]], ['19 Sep', [15, 15, 13]], ['26 Sep', [15, 15, 14]], ['3 Oct', [15, 15, 15]], ['10 Oct', [15, 15, 15]], ['17 Oct', [15, 15, 15]]] },
  }

  // ---------- state ----------
  const S = {
    dir: 'plates', screen: 'home', history: buildHistory(), session: null, rest: null, sound: true,
    detail: 'decline-push-up', back: 'library', libQ: '', libF: 'all', progEx: 'push-up', open: new Set(['how']),
    weight: 78.5, waist: 35.0, loaded: false, summary: null, annotate: true,
  }

  // ---------- helpers ----------
  const $ = (s, el = document) => el.querySelector(s)
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]))
  const sum = (a) => a.reduce((x, y) => x + y, 0)
  const mmss = (s) => { s = Math.max(0, Math.round(s)); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}` }
  const fmtDay = (d) => `${DAY[d.getDay()]} ${d.getDate()} ${MON[d.getMonth()]}`
  const sameDay = (a, b) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
  const measure = (id) => (EX[id] ? EX[id].measure : 'reps')
  const range = (it, id) => {
    const t = it.target, unit = measure(id) === 'seconds' ? ' s' : ''
    const r = t.min === t.max ? `${t.min}` : `${t.min}–${t.max}`
    return r + unit + (t.per ? ` each ${t.per}` : '')
  }
  const load = (l) => (l.kind === 'bodyweight' ? 'Bodyweight' : l.count === 2 ? `2 × ${l.kg} kg` : `${l.kg} kg`)
  const estMin = (r) => Math.round((6 + sum(r.items.map((it) => it.target.sets * (45 + it.restSec))) / 60) / 5) * 5
  const totalSets = (r) => sum(r.items.map((it) => it.target.sets))

  function thisWeek() { return S.history.filter((h) => h.date >= WEEK_START) }
  // Sessions group into cycles from the start of the history: a cycle closes once all four workouts are in it.
  // What's left open is the current cycle, so a skipped workout stays next until it's done.
  function cycle() {
    let cur = []
    for (const h of S.history) {
      if (!cur.includes(h.routine)) cur.push(h.routine)
      if (cur.length === 4) cur = []
    }
    return cur
  }
  function nextUp() {
    const done = cycle()
    return ORDER.find((r) => !done.includes(r))
  }
  function weeks() {
    const out = []
    for (let w = 0; w < COUNTS.length; w++) {
      const start = new Date(2026, 7, 24 + w * 7), end = new Date(2026, 7, 31 + w * 7)
      out.push({ start, list: S.history.filter((h) => h.date >= start && h.date < end) })
    }
    return out
  }

  // ---------- figures ----------
  let mounted = []
  function mountFigures(root) {
    for (const f of mounted) f.destroy()
    mounted = []
    root.querySelectorAll('[data-fig]').forEach((el) => {
      const id = el.dataset.fig
      if (!F.has(id)) return
      const phaseEl = el.dataset.phase ? $(el.dataset.phase, root) : null
      const f = F.mount(el, id, {
        style: S.dir === 'blueprint' ? 'outline' : 'solid',
        annotate: el.dataset.annotate === '1',
        autoplay: el.dataset.play !== '0',
        aspect: el.dataset.aspect === 'auto' ? 'auto' : el.dataset.aspect ? +el.dataset.aspect : 4 / 3,
        label: `${EX[id] ? EX[id].name : id}, animated demonstration`,
        onPhase: phaseEl ? (p) => { phaseEl.textContent = p } : null,
      })
      if (el.dataset.play === '0') {
        el.addEventListener('mouseenter', () => f.play())
        el.addEventListener('mouseleave', () => f.pause())
      }
      mounted.push(f)
    })
  }
  const pending = (id) => `<div class="fig-pending"><span>Animation for ${esc(EX[id] ? EX[id].name : id)} is next on the list</span></div>`
  const fig = (id, attrs = '') => (F.has(id) ? `<div class="fig" data-fig="${id}" ${attrs}></div>` : `<div class="fig">${pending(id)}</div>`)

  // ---------- icons ----------
  const I = {
    home: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 11.5 12 5l8 6.5V20h-5.5v-5h-5v5H4z"/></svg>',
    lib: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h4v16H5zM10.5 4h4v16h-4zM16 5.2l3.6-.9 2.4 15.4-3.6.9z"/></svg>',
    prog: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20h16M7 16v-4M12 16V8M17 16v-7"/></svg>',
    gear: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1"/></svg>',
    back: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>',
    pause: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6v12M15 6v12"/></svg>',
    play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l10-6.5z"/></svg>',
    check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
    down: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>',
    search: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.2-4.2"/></svg>',
  }

  // ---------- shared pieces ----------
  function tabs() {
    const t = { home: 'home', library: 'library', detail: 'library', progress: 'progress' }[S.screen]
    const b = (v, icon, label) => `<button type="button" class="tab" data-a="tab" data-v="${v}" ${t === v ? 'aria-current="page"' : ''}>${icon}<span>${label}</span></button>`
    return `<nav class="tabs" aria-label="Sections">${b('home', I.home, 'Today')}${b('library', I.lib, 'Exercises')}${b('progress', I.prog, 'Progress')}</nav>`
  }

  function setRows(e, i) {
    const last = LAST[e.id] || []
    return e.sets.map((set, k) => {
      const ph = last[k] != null ? last[k] : e.target.max
      const unit = measure(e.id) === 'seconds' ? 'seconds' : 'reps'
      return `<li class="set ${set.done ? 'is-done' : ''}">
        <span class="set-n">Set ${k + 1}</span>
        <span class="stepper">
          <button type="button" data-a="dec" data-v="${k}" aria-label="Fewer ${unit}, set ${k + 1}">−</button>
          <input id="r-${i}-${k}" inputmode="numeric" data-k="${k}" value="${set.v ?? ''}" placeholder="${ph}" aria-label="${unit}, set ${k + 1}">
          <button type="button" data-a="inc" data-v="${k}" aria-label="More ${unit}, set ${k + 1}">+</button>
        </span>
        <button type="button" class="tick" data-a="check" data-v="${k}" aria-pressed="${set.done}" aria-label="Set ${k + 1} done">${I.check}</button>
      </li>`
    }).join('')
  }

  function folds(e) {
    const x = EX[e.id]
    const f = (key, title, body) => `<details class="fold" data-key="${key}" ${S.open.has(key) ? 'open' : ''}><summary>${title}</summary><div class="fold-body">${body}</div></details>`
    const alts = x.alternatives.filter((a) => EX[a]).map((a) => `<li><button type="button" class="alt" data-a="swap" data-v="${a}"><span>${EX[a].name}</span><small>${EX[a].primary.join(', ')}</small></button></li>`).join('')
    return `<div class="folds">
      ${f('how', 'How to do it', `<ol class="steps">${x.steps.map((s) => `<li>${esc(s)}</li>`).join('')}</ol>`)}
      ${f('err', 'Common mistakes', `<ul class="mistakes">${x.mistakes.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>`)}
      ${alts ? f('alt', 'Swap for another exercise', `<ul class="alts">${alts}</ul>`) : ''}
    </div>`
  }

  function library() {
    const FL = [['all', 'All'], ['push', 'Push'], ['pull', 'Pull'], ['legs', 'Legs'], ['core', 'Core']]
    return `<div class="screen lib-screen">
      <header class="page-head"><h1 class="page-title">Exercises</h1><p class="page-sub">${D.exercises.length} moves you can do at home</p></header>
      <label class="search">${I.search}<input id="lib-q" type="search" placeholder="Search by name or muscle" value="${esc(S.libQ)}" aria-label="Search exercises"></label>
      <div class="filters" role="group" aria-label="Filter by pattern">${FL.map(([v, l]) => `<button type="button" data-a="libf" data-v="${v}" aria-pressed="${S.libF === v}">${l}</button>`).join('')}</div>
      <ul class="lib-grid" id="lib-list">${libItems()}</ul>
    </div>`
  }
  function libItems() {
    const q = S.libQ.trim().toLowerCase()
    const list = D.exercises.filter((e) => (S.libF === 'all' || e.pattern === S.libF) && (!q || (e.name + ' ' + e.primary.join(' ') + ' ' + e.secondary.join(' ')).toLowerCase().includes(q)))
    if (!list.length) return `<li class="empty">Nothing matches “${esc(S.libQ)}”. Try a muscle, like lats.</li>`
    return list.map((e) => `<li><button type="button" class="lib-item" data-a="detail" data-v="${e.id}">
      ${fig(e.id, 'data-play="0"')}
      <span class="lib-name">${e.name}</span><span class="lib-mus">${e.primary.join(', ')}</span></button></li>`).join('')
  }

  function detail() {
    const e = EX[S.detail]
    const days = ORDER.filter((r) => R[r].items.some((it) => it.exerciseId === e.id)).map((r) => NAME[r])
    return `<div class="screen detail-screen">
      <button type="button" class="back" data-a="back">${I.back}<span>${S.back === 'workout' ? 'Back to workout' : 'Exercises'}</span></button>
      <div class="stage">${fig(e.id, `data-phase="#d-phase" data-annotate="${S.dir === 'blueprint' && S.annotate ? 1 : 0}"`)}<p class="phase" id="d-phase" aria-live="off"></p></div>
      <h1 class="ex-title">${e.name}</h1>
      <p class="ex-mus"><b>${e.primary.join(', ')}</b>${e.secondary.length ? `, ${e.secondary.join(', ')}` : ''}</p>
      <dl class="facts"><div><dt>Needs</dt><dd>${e.equipment.map((q) => ({ dumbbells: 'Dumbbells', 'pull-up-bar': 'Pull-up bar', chair: 'Chair', step: 'Step', bodyweight: 'Nothing' }[q])).join(', ')}</dd></div>
        <div><dt>Level</dt><dd>${['Beginner', 'Intermediate', 'Advanced'][e.difficulty - 1]}</dd></div>
        <div><dt>In</dt><dd>${days.length ? days.join(', ') : 'Not in your routine'}</dd></div></dl>
      <section class="sec"><h2>How to do it</h2><ol class="steps">${e.steps.map((s) => `<li>${esc(s)}</li>`).join('')}</ol></section>
      <section class="sec"><h2>Common mistakes</h2><ul class="mistakes">${e.mistakes.map((s) => `<li>${esc(s)}</li>`).join('')}</ul></section>
      ${e.progression ? `<section class="sec"><h2>When it gets easy</h2><p class="prose">${esc(e.progression)}</p></section>` : ''}
      ${e.alternatives.length ? `<section class="sec"><h2>Alternatives</h2><ul class="alts">${e.alternatives.filter((a) => EX[a]).map((a) => `<li><button type="button" class="alt" data-a="detail" data-v="${a}"><span>${EX[a].name}</span><small>${EX[a].primary.join(', ')}</small></button></li>`).join('')}</ul></section>` : ''}
    </div>`
  }

  // ---------- charts ----------
  function weeksChart() {
    const W = weeks(), w = 340, h = 150, L = 24, B = 22, T = 10, slot = (w - L) / W.length, bw = Math.min(24, slot * 0.6), unit = (h - T - B) / 5
    let g = ''
    for (let n = 0; n <= 5; n++) if (n % 2 === 0 || n === 4) g += `<text class="ax" x="${L - 6}" y="${h - B - n * unit + 3.5}" text-anchor="end">${n}</text>`
    g += `<line class="goal" x1="${L}" x2="${w}" y1="${h - B - 4 * unit}" y2="${h - B - 4 * unit}"/><text class="ax goal-t" x="${w}" y="${h - B - 4 * unit - 5}" text-anchor="end">Goal 4</text>`
    W.forEach((wk, i) => {
      const x = L + slot * i + (slot - bw) / 2
      wk.list.forEach((s, k) => { g += `<rect class="blk blk-${s.routine}" x="${x}" y="${h - B - (k + 1) * unit + 1.2}" width="${bw}" height="${unit - 2.4}" rx="${S.dir === 'plates' ? 3 : 0}"><title>${fmtDay(s.date)}: ${NAME[s.routine]}</title></rect>` })
      if (i % 2 === 0 || i === W.length - 1) g += `<text class="ax" x="${x + bw / 2}" y="${h - 6}" text-anchor="middle">${wk.start.getDate()} ${MON[wk.start.getMonth()]}</text>`
    })
    g += `<line class="base" x1="${L}" x2="${w}" y1="${h - B}" y2="${h - B}"/>`
    return `<svg class="chart" viewBox="0 0 ${w} ${h}" role="img" aria-label="Sessions per week for the last nine weeks, against a goal of four">${g}</svg>`
  }
  function lineChart(pts, { min, max, ticks, goal, unit }) {
    const w = 340, h = 150, L = 30, Rr = 52, T = 12, B = 22, iw = w - L - Rr, ih = h - T - B
    const X = (i) => L + i * iw / (pts.length - 1), Y = (v) => T + (max - v) * ih / (max - min)
    let g = ''
    ticks.forEach((t) => { g += `<line class="grid" x1="${L}" x2="${w - Rr}" y1="${Y(t)}" y2="${Y(t)}"/><text class="ax" x="${L - 6}" y="${Y(t) + 3.5}" text-anchor="end">${t}</text>` })
    ;[0, Math.floor((pts.length - 1) / 2), pts.length - 1].forEach((i, k) => { g += `<text class="ax" x="${X(i)}" y="${h - 5}" text-anchor="${['start', 'middle', 'end'][k]}">${pts[i][0]}</text>` })
    if (goal != null) g += `<line class="goal" x1="${L}" x2="${w - Rr}" y1="${Y(goal)}" y2="${Y(goal)}"/><text class="ax goal-t" x="${w - Rr + 6}" y="${Y(goal) + 3.5}">Goal ${goal}</text>`
    const d = pts.map((p, i) => `${i ? 'L' : 'M'}${X(i).toFixed(1)} ${Y(p[1]).toFixed(1)}`).join(' ')
    const lp = pts[pts.length - 1]
    g += `<path class="line" d="${d}"/><circle class="end" cx="${X(pts.length - 1)}" cy="${Y(lp[1])}" r="4"/><text class="end-t" x="${w - Rr + 6}" y="${Y(lp[1]) + 4}">${lp[1].toFixed(1)}</text>`
    return `<svg class="chart" viewBox="0 0 ${w} ${h}" role="img" aria-label="Weight trend from ${pts[0][1]} to ${lp[1]} ${unit}">${g}</svg>`
  }
  function barChart(P) {
    const tot = P.s.map((s) => sum(s[1])), mx = Math.max(...tot), top = Math.ceil(mx * 1.15 / 10) * 10
    const w = 340, h = 140, L = 24, B = 22, T = 14, slot = (w - L) / P.s.length, bw = Math.min(24, slot * 0.55)
    const Y = (v) => T + (top - v) * (h - T - B) / top
    let g = ''
    for (let t = 0; t <= top; t += top > 30 ? 20 : 10) g += `<line class="grid" x1="${L}" x2="${w}" y1="${Y(t)}" y2="${Y(t)}"/><text class="ax" x="${L - 6}" y="${Y(t) + 3.5}" text-anchor="end">${t}</text>`
    P.s.forEach((s, i) => {
      const x = L + slot * i + (slot - bw) / 2, last = i === P.s.length - 1
      g += `<rect class="bar ${last ? 'last' : ''}" x="${x}" y="${Y(tot[i])}" width="${bw}" height="${Y(0) - Y(tot[i])}" rx="${S.dir === 'plates' ? 3 : 0}"><title>${s[0]}: ${s[1].join(', ')}</title></rect>`
      if (last) g += `<text class="end-t" x="${x + bw / 2}" y="${Y(tot[i]) - 5}" text-anchor="middle">${tot[i]}</text>`
      if (i % 2 === 0 || last) g += `<text class="ax" x="${x + bw / 2}" y="${h - 6}" text-anchor="middle">${s[0]}</text>`
    })
    return `<svg class="chart" viewBox="0 0 ${w} ${h}" role="img" aria-label="Total reps per session">${g}</svg>`
  }

  function progress() {
    const W = weeks(), total = sum(W.slice(0, -1).map((w) => w.list.length)), full = W.slice(0, -1).filter((w) => w.list.length >= 4).length
    const P = PROG[S.progEx]
    return `<div class="screen prog-screen">
      <header class="page-head"><h1 class="page-title">Progress</h1><p class="page-sub">Sample history from 24 Aug</p></header>
      <section class="sec">
        <h2>Sessions per week</h2>
        <p class="prose">${total} sessions in 8 weeks. You hit 4 in ${full} of them. Colours show which workout, so a missing one stands out.</p>
        ${weeksChart()}
        <ul class="legend">${ORDER.map((r) => `<li><i class="sw sw-${r}"></i>${NAME[r]}</li>`).join('')}</ul>
      </section>
      <section class="sec">
        <div class="sec-row"><h2>Weight</h2><p class="big-num">${S.weight.toFixed(1)}<small> kg</small></p></div>
        <p class="prose">Down 2.1 kg since 25 Aug. 2.5 kg to your goal.</p>
        ${lineChart(WEIGHT, { min: 75.5, max: 81, ticks: [76, 78, 80], goal: 76, unit: 'kg' })}
      </section>
      <section class="sec">
        <div class="sec-row"><h2>By exercise</h2>
          <select id="prog-ex" class="select" aria-label="Exercise">${Object.entries(PROG).map(([k, v]) => `<option value="${k}" ${k === S.progEx ? 'selected' : ''}>${v.label}</option>`).join('')}</select></div>
        <p class="prose">Total reps each session.${S.progEx === 'push-up' ? ' Three sets of 15 last time: time to move to decline push-ups.' : S.progEx === 'db-goblet-squat' ? ' 3 × 15 for three sessions: slow the lowering to 3 seconds.' : ''}</p>
        ${barChart(P)}
      </section>
    </div>`
  }

  // ---------- workout (shared body) ----------
  function newSession(rid) {
    const r = R[rid]
    return { rid, step: -1, warm: r.warmup.map(() => false), elapsed: 0, running: true,
      ex: r.items.map((it) => ({ id: it.exerciseId, target: it.target, rest: it.restSec, load: it.load, from: null, skipped: false, sets: Array.from({ length: it.target.sets }, () => ({ v: null, done: false })) })) }
  }
  function warmup() {
    const s = S.session, r = R[s.rid]
    return `<div class="screen warm-screen">
      <h1 class="ex-title">Warm up first</h1>
      <p class="prose">About 6 minutes. Tick them off as you go.</p>
      <ul class="warm">${r.warmup.map((w, i) => `<li><span>${w.name}</span><span class="dose">${w.dose}</span><button type="button" class="tick" data-a="warm" data-v="${i}" aria-pressed="${s.warm[i]}" aria-label="${w.name} done">${I.check}</button></li>`).join('')}</ul>
      <button type="button" class="btn btn-go" data-a="step" data-v="0">Start with ${EX[s.ex[0].id].name.toLowerCase()}</button>
    </div>`
  }
  function exerciseBody(i) {
    const s = S.session, e = s.ex[i], x = EX[e.id], last = e.from ? null : LAST[e.id]
    const ready = last && last.length === e.sets.length && last.every((v) => v >= e.target.max) && x.progression
    const nx = s.ex[i + 1]
    return `
      <h1 class="ex-title">${x.name}</h1>
      ${e.from ? `<p class="swapped">Swapped in for ${EX[e.from].name} today</p>` : ''}
      <p class="ex-mus"><b>${x.primary.join(', ')}</b>${x.secondary.length ? `, ${x.secondary.join(', ')}` : ''}</p>
      <dl class="facts"><div><dt>Target</dt><dd>${e.sets.length} × ${range(e, e.id)}</dd></div><div><dt>Rest</dt><dd>${mmss(e.rest)}</dd></div><div><dt>Load</dt><dd>${load(e.load)}</dd></div></dl>
      ${last ? `<p class="last">Last time <b>${last.join(', ')}</b></p>` : ''}
      ${ready ? `<p class="ready"><b>You hit the top of the range last time.</b> ${esc(x.progression)}</p>` : ''}
      <ol class="sets" id="sets">${setRows(e, i)}</ol>
      <div class="set-tools"><button type="button" class="btn btn-quiet" data-a="addset">Add a set</button>${e.sets.length > 1 ? '<button type="button" class="btn btn-quiet" data-a="rmset">Remove a set</button>' : ''}</div>
      ${folds(e)}
      <div class="stepnav">
        <button type="button" class="iconbtn" data-a="step" data-v="${i - 1}" aria-label="Previous exercise">${I.back}</button>
        <button type="button" class="btn btn-quiet" data-a="skip">Skip</button>
        ${nx ? `<button type="button" class="btn btn-go" data-a="step" data-v="${i + 1}">Next: ${EX[nx.id].name.replace('Dumbbell ', '')}</button>` : '<button type="button" class="btn btn-go" data-a="end">Finish workout</button>'}
      </div>`
  }

  // ---------- direction: plates ----------
  const plates = {
    home() {
      const nx = nextUp(), r = R[nx], wk = thisWeek(), done = cycle()
      const others = ORDER.filter((x) => x !== nx)
      return `<div class="screen home">
        <header class="top"><p class="date">${DAY_LONG[TODAY.getDay()]} ${TODAY.getDate()} ${MON[TODAY.getMonth()]}</p></header>
        <section class="week" aria-label="This week">
          <div class="week-row"><h2>This week</h2><p class="count"><b>${wk.length}</b> of 4</p></div>
          ${plates.barbell(wk)}
          <p class="week-note">${wk.length >= 4 ? 'Four done. Anything else this week is a bonus.' : `${4 - wk.length} more by Sunday, on any days that work.`}</p>
        </section>
        <section class="next c-${nx}" aria-label="Next workout">
          <div class="next-copy">
            <p class="next-label">Next up</p>
            <h1 class="next-name">${NAME[nx]}</h1>
            <p class="next-meta">${r.items.length} exercises<br>about ${estMin(r)} min</p>
          </div>
          ${fig(r.items[0].exerciseId, 'data-aspect="auto"')}
          <button type="button" class="btn-start" data-a="start" data-v="${nx}">Start ${NAME[nx]}</button>
        </section>
        <section class="others">
          <p>${done.length ? `Rotation so far: ${done.map((d) => SHORT[d]).join(', ')}.` : 'New rotation starts here.'} Rather do something else?</p>
          <div class="chips">${others.map((o) => `<button type="button" class="chip c-${o}" data-a="start" data-v="${o}"><i></i>${NAME[o]}</button>`).join('')}</div>
        </section>
        <section class="body-stats" aria-label="Body">
          <div><p class="lbl">Weight</p><p class="big-num">${S.weight.toFixed(1)}<small> kg</small></p><p class="sub">2.5 to your goal</p></div>
          <div><p class="lbl">Waist</p><p class="big-num">${S.waist.toFixed(1)}<small> in</small></p><p class="sub">Down 1.0 since Aug</p></div>
        </section>
      </div>`
    },
    barbell(wk) {
      const slots = Math.max(4, wk.length)
      let g = '<rect class="bb-shaft" x="0" y="54" width="70" height="8" rx="2"/><rect class="bb-collar" x="62" y="40" width="12" height="36" rx="3"/><rect class="bb-sleeve" x="74" y="51" width="262" height="14" rx="3"/>'
      for (let i = 0; i < slots; i++) {
        const x = 80 + i * 46, s = wk[i]
        if (s) g += `<g class="bb-plate ${S.loaded && i === wk.length - 1 ? 'is-new' : ''}"><rect class="pl pl-${s.routine}" x="${x}" y="4" width="38" height="108" rx="7"/><rect class="pl-ring" x="${x + 5}" y="10" width="28" height="96" rx="5"/><text x="${x + 19}" y="128" text-anchor="middle">${DAY[s.date.getDay()]}</text></g>`
        else g += `<rect class="pl-empty" x="${x}" y="4" width="38" height="108" rx="7"/>`
      }
      return `<svg class="barbell" viewBox="0 0 340 134" role="img" aria-label="${wk.length} of 4 sessions this week: ${wk.map((s) => `${NAME[s.routine]} on ${DAY_LONG[s.date.getDay()]}`).join(', ')}">${g}</svg>`
    },
    workout() {
      const s = S.session, r = R[s.rid]
      const dots = [`<i class="${s.step >= 0 ? 'on' : 'cur'}"></i>`].concat(s.ex.map((e, i) => `<i class="${i === s.step ? 'cur' : e.skipped ? 'skip' : e.sets.every((x) => x.done) ? 'on' : ''}"></i>`)).join('')
      const head = `<header class="wbar c-${s.rid}">
        <button type="button" class="iconbtn" data-a="pause" aria-label="Pause and go back">${I.pause}</button>
        <div class="wbar-mid"><b>${NAME[s.rid]}</b><span class="num" id="elapsed">${mmss(s.elapsed)}</span></div>
        <button type="button" class="btn btn-quiet" data-a="end">End</button>
        <div class="wdots" aria-label="${s.step < 0 ? 'Warm-up' : `Exercise ${s.step + 1} of ${s.ex.length}`}">${dots}</div>
      </header>`
      if (s.step < 0) return head + warmup()
      const e = s.ex[s.step]
      return head + `<div class="screen ex-screen c-${s.rid}">
        <div class="stage">${fig(e.id, 'data-phase="#w-phase"')}<p class="phase" id="w-phase" aria-live="off"></p><p class="stage-n">${s.step + 1}<small>/${s.ex.length}</small></p></div>
        ${exerciseBody(s.step)}
      </div>`
    },
    rest() {
      const r = S.rest, C = 2 * Math.PI * 100
      return `<div class="rest-plate c-${S.session ? S.session.rid : 'push'}" id="dial">
        <svg viewBox="0 0 240 240" aria-hidden="true">
          <circle class="rp-rim" cx="120" cy="120" r="116"/>
          <circle class="rp-track" cx="120" cy="120" r="100"/>
          <circle class="rp-arc" id="arc" cx="120" cy="120" r="100" transform="rotate(-90 120 120)" stroke-dasharray="${C}" stroke-dashoffset="0"/>
          <circle class="rp-insert" cx="120" cy="120" r="74"/>
        </svg>
        <div class="rp-read"><span class="rp-time" id="rest-time" role="timer">${mmss(r.left)}</span><span class="rp-of" id="rest-of">of ${mmss(r.total)}</span></div>
      </div>`
    },
  }

  // ---------- direction: blueprint ----------
  const blueprint = {
    home() {
      const nx = nextUp(), r = R[nx], wk = thisWeek(), done = cycle()
      const others = ORDER.filter((x) => x !== nx)
      return `<div class="screen home">
        <header class="top"><p class="date">${DAY_LONG[TODAY.getDay()]} ${TODAY.getDate()} ${MON[TODAY.getMonth()]}</p><p class="date-r">Week 43</p></header>
        <section class="sheet" aria-label="Next workout">
          <div class="sheet-fig">${fig(r.items[0].exerciseId, 'data-annotate="1" data-aspect="auto" data-phase="#h-phase"')}<p class="phase" id="h-phase"></p></div>
          <dl class="title-block">
            <div class="tb-wide"><dt>Next up</dt><dd class="tb-name">${NAME[nx]}</dd></div>
            <div><dt>Exercises</dt><dd>${r.items.length}</dd></div>
            <div><dt>Time</dt><dd>about ${estMin(r)} min</dd></div>
            <div><dt>Sets</dt><dd>${totalSets(r)}</dd></div>
            <div><dt>First move</dt><dd>${EX[r.items[0].exerciseId].name}</dd></div>
          </dl>
        </section>
        <button type="button" class="btn btn-go btn-wide" data-a="start" data-v="${nx}">Start ${NAME[nx]}</button>
        <div class="alt-row"><span>Or do</span>${others.map((o) => `<button type="button" class="btn btn-quiet" data-a="start" data-v="${o}">${NAME[o]}</button>`).join('')}</div>
        <section class="sec">
          <h2>Rotation</h2>
          ${blueprint.cycle(done, nx)}
          <p class="prose">Workouts come in this order and the order carries across weeks. If you pick a different one, the skipped one stays next.</p>
        </section>
        <section class="sec">
          <div class="sec-row"><h2>This week</h2><p class="count"><b>${wk.length}</b> of 4</p></div>
          <ol class="tally">${[0, 1, 2, 3].map((i) => wk[i] ? `<li class="t-on b-${wk[i].routine}"><span>${SHORT[wk[i].routine]}</span><small>${DAY[wk[i].date.getDay()]}</small></li>` : '<li><span>Open</span><small>any day</small></li>').join('')}</ol>
        </section>
        <section class="body-stats" aria-label="Body">
          <div><p class="lbl">Weight</p><p class="big-num">${S.weight.toFixed(1)}<small> kg</small></p><p class="sub">2.5 to your goal</p></div>
          <div><p class="lbl">Waist</p><p class="big-num">${S.waist.toFixed(1)}<small> in</small></p><p class="sub">Down 1.0 since Aug</p></div>
        </section>
      </div>`
    },
    cycle(done, nx) {
      const pos = [[60, 34], [280, 34], [280, 116], [60, 116]]
      let g = '<path class="cy-path" d="M100 34H240M280 54V96M240 116H100M60 96V54"/>'
      g += '<path class="cy-arrow" d="M234 29l8 5-8 5M275 90l5 8 5-8M106 111l-8 5 8 5M55 60l5-8 5 8"/>'
      ORDER.forEach((r, i) => {
        const [x, y] = pos[i], st = done.includes(r) ? 'done' : r === nx ? 'next' : ''
        g += `<g class="cy-node ${st} b-${r}"><rect x="${x - 40}" y="${y - 17}" width="80" height="34"/><text x="${x}" y="${y + 5}" text-anchor="middle">${SHORT[r]}${st === 'done' ? ' ✓' : ''}</text></g>`
      })
      return `<svg class="cycle" viewBox="0 0 340 150" role="img" aria-label="Rotation: Push, Pull, Legs, Full body. Next is ${NAME[nx]}.">${g}</svg>`
    },
    workout() {
      const s = S.session
      const head = `<header class="wbar">
        <button type="button" class="iconbtn" data-a="pause" aria-label="Pause and go back">${I.pause}</button>
        <div class="wbar-mid"><b>${NAME[s.rid]}</b><span class="num" id="elapsed">${mmss(s.elapsed)}</span></div>
        <button type="button" class="btn btn-quiet" data-a="end">End</button>
        <ol class="wsteps" aria-label="${s.step < 0 ? 'Warm-up' : `Exercise ${s.step + 1} of ${s.ex.length}`}"><li class="${s.step >= 0 ? 'on' : 'cur'}">W</li>${s.ex.map((e, i) => `<li class="${i === s.step ? 'cur' : e.skipped ? 'skip' : e.sets.every((x) => x.done) ? 'on' : ''}">${i + 1}</li>`).join('')}</ol>
      </header>`
      if (s.step < 0) return head + warmup()
      const e = s.ex[s.step]
      return head + `<div class="screen ex-screen">
        <div class="stage sheet-fig">${fig(e.id, `data-phase="#w-phase" data-annotate="${S.annotate ? 1 : 0}"`)}<p class="phase" id="w-phase"></p>
          <button type="button" class="annot-toggle" data-a="annot" aria-pressed="${S.annotate}">Angles</button></div>
        ${exerciseBody(s.step)}
      </div>`
    },
    rest() {
      const r = S.rest
      let ticks = ''
      for (let i = 0; i <= 36; i++) {
        const a = Math.PI * (1 - i / 36), long = i % 6 === 0
        const r1 = long ? 92 : 98, r2 = 106
        ticks += `<line class="${long ? 'tk tk-l' : 'tk'}" x1="${120 + r1 * Math.cos(a)}" y1="${124 - r1 * Math.sin(a)}" x2="${120 + r2 * Math.cos(a)}" y2="${124 - r2 * Math.sin(a)}"/>`
      }
      return `<div class="protractor" id="dial">
        <svg viewBox="0 0 240 132" aria-hidden="true">${ticks}<path class="pr-base" d="M8 124H232"/><path class="pr-arc" id="arc" d="M14 124A106 106 0 0 1 226 124"/><line class="pr-hand" id="hand" x1="120" y1="124" x2="120" y2="30"/><circle class="pr-pin" cx="120" cy="124" r="4"/></svg>
        <div class="pr-read"><span class="rp-time" id="rest-time" role="timer">${mmss(r.left)}</span><span class="rp-of" id="rest-of">of ${mmss(r.total)}</span></div>
      </div>`
    },
  }

  const V = { plates, blueprint }

  function done() {
    const m = S.summary, nx = nextUp()
    return `<div class="screen done-screen">
      <p class="lbl">Saved for ${fmtDay(TODAY)}</p>
      <h1 class="page-title">${NAME[m.rid]} done</h1>
      <dl class="facts facts-big"><div><dt>Time</dt><dd>${mmss(m.time)}</dd></div><div><dt>Sets</dt><dd>${m.sets} of ${m.planned}</dd></div><div><dt>Reps</dt><dd>${m.reps}</dd></div></dl>
      <p class="prose">This week: ${thisWeek().length} of 4. Next in the rotation: <b>${NAME[nx]}</b>.</p>
      <button type="button" class="btn btn-go btn-wide" data-a="tab" data-v="home">Back to today</button>
    </div>`
  }

  // ---------- render ----------
  const root = $('#app'), overlay = $('#overlay')
  let lastKey = ''
  function render() {
    root.className = 'app dir-' + S.dir
    document.body.className = 'body-' + S.dir
    document.querySelectorAll('[data-a="dir"]').forEach((b) => b.setAttribute('aria-pressed', b.dataset.v === S.dir))
    const v = V[S.dir]
    const html = { home: () => v.home(), workout: () => v.workout(), library, detail, progress, done }[S.screen]()
    const key = S.dir + S.screen + (S.session ? S.session.step : '') + S.detail
    const vp = $('#vp')
    const keep = key === lastKey ? vp.scrollTop : 0
    vp.innerHTML = html
    if (key === lastKey) { const sc = vp.querySelector('.screen'); if (sc) sc.style.animation = 'none' }
    vp.scrollTop = keep
    lastKey = key
    $('#tabs-slot').innerHTML = S.screen === 'workout' || S.screen === 'done' ? '' : tabs()
    mountFigures(vp)
    if (S.loaded && S.screen === 'home') setTimeout(() => { S.loaded = false }, 900)
  }

  // ---------- rest timer ----------
  function openSheet(html, label, onScrim = 'close') {
    overlay.innerHTML = `<div class="sheet-wrap"><div class="scrim" data-a="${onScrim}"></div><section class="sheet" role="dialog" aria-modal="true" aria-label="${label}">${html}</section></div>`
    setTimeout(() => { const f = overlay.querySelector('input') || overlay.querySelector('.btn-go') || overlay.querySelector('button'); if (f) f.focus({ preventScroll: true }) }, 30)
  }
  const closeSheet = () => { overlay.innerHTML = '' }
  function restHTML() {
    const r = S.rest
    return `<div class="sheet-head"><h2>Rest</h2><button type="button" class="iconbtn" data-a="rest-min" aria-label="Hide the timer">${I.down}</button></div>
      ${V[S.dir].rest()}
      <p class="rest-next">${esc(r.label)}<br><b>${esc(r.next)}</b></p>
      <div class="rest-ctl"><button type="button" class="btn btn-quiet" data-a="rest-add" data-v="-15">−15 s</button><button type="button" class="btn btn-go" data-a="rest-pause" id="rest-pp">Pause</button><button type="button" class="btn btn-quiet" data-a="rest-add" data-v="15">+15 s</button></div>
      <div class="rest-foot"><label class="lbl-switch"><button type="button" class="switch" role="switch" data-a="sound" aria-checked="${S.sound}" aria-label="Sound when rest ends"></button>Sound</label><button type="button" class="link" data-a="rest-skip">Skip rest</button></div>`
  }
  function startRest(sec, label, next) {
    S.rest = { total: sec, left: sec, ends: Date.now() + sec * 1000, paused: false, label, next, min: false, up: false }
    openSheet(restHTML(), 'Rest timer', 'rest-min')
    tickRest()
  }
  function tickRest() {
    const r = S.rest
    if (!r) return
    if (!r.paused) r.left = Math.max(0, (r.ends - Date.now()) / 1000)
    const frac = r.left / r.total
    const t = $('#rest-time'), arc = $('#arc'), hand = $('#hand'), pill = $('#rest-pill-t')
    if (t) t.textContent = r.up ? 'Go' : mmss(Math.ceil(r.left))
    if (arc && S.dir === 'plates') arc.setAttribute('stroke-dashoffset', (2 * Math.PI * 100 * (1 - frac)).toFixed(1))
    if (arc && S.dir === 'blueprint') { const L = Math.PI * 106; arc.setAttribute('stroke-dasharray', `${(L * frac).toFixed(1)} ${L}`) }
    if (hand) { const a = Math.PI * frac; hand.setAttribute('x2', (120 - 94 * Math.cos(a)).toFixed(1)); hand.setAttribute('y2', (124 - 94 * Math.sin(a)).toFixed(1)) }
    if (pill) pill.textContent = mmss(Math.ceil(r.left))
    if (r.left <= 0 && !r.up) {
      r.up = true
      if (S.sound) chime()
      if (navigator.vibrate) navigator.vibrate([120, 80, 120])
      if (r.min) { r.min = false; $('#rest-pill') && $('#rest-pill').remove(); openSheet(restHTML(), 'Rest timer', 'rest-min') }
      const d = $('#dial'); if (d) d.classList.add('is-up')
      const tt = $('#rest-time'); if (tt) tt.textContent = 'Go'
      const pp = $('#rest-pp'); if (pp) { pp.textContent = 'Start next set'; pp.dataset.a = 'rest-skip' }
    }
  }
  setInterval(tickRest, 200)
  let actx
  function chime() {
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)()
      ;[0, 0.18, 0.36].forEach((d, i) => {
        const o = actx.createOscillator(), g = actx.createGain(), t = actx.currentTime + d
        o.frequency.value = i === 2 ? 1175 : 880; o.connect(g); g.connect(actx.destination)
        g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.2, t + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.14)
        o.start(t); o.stop(t + 0.16)
      })
    } catch (e) { /* audio blocked until a tap; the visual cue still shows */ }
  }
  function endRest() { S.rest = null; closeSheet(); const p = $('#rest-pill'); if (p) p.remove() }
  function minimiseRest() {
    S.rest.min = true; closeSheet()
    const b = document.createElement('button')
    b.type = 'button'; b.className = 'rest-pill'; b.id = 'rest-pill'; b.dataset.a = 'rest-open'
    b.innerHTML = `Rest <span class="num" id="rest-pill-t">${mmss(Math.ceil(S.rest.left))}</span>`
    $('#app').appendChild(b)
  }

  setInterval(() => {
    const s = S.session
    if (s && s.running && S.screen === 'workout') { s.elapsed++; const el = $('#elapsed'); if (el) el.textContent = mmss(s.elapsed) }
  }, 1000)

  // ---------- actions ----------
  const cur = () => S.session.ex[S.session.step]
  function finish() {
    const s = S.session, r = R[s.rid]
    let sets = 0, reps = 0
    s.ex.forEach((e) => e.sets.forEach((x) => { if (x.done) { sets++; if (measure(e.id) === 'reps') reps += x.v || 0 } }))
    S.summary = { rid: s.rid, time: s.elapsed, sets, planned: totalSets(r), reps }
    S.history.push({ date: TODAY, routine: s.rid })
    S.session = null; S.loaded = true; endRest(); S.screen = 'done'; render()
  }
  function endSheet() {
    const s = S.session, r = R[s.rid], logged = sum(s.ex.map((e) => e.sets.filter((x) => x.done).length))
    openSheet(`<div class="sheet-head"><h2>${logged === totalSets(r) ? `Finish ${NAME[s.rid]}?` : `End ${NAME[s.rid]} now?`}</h2></div>
      <p class="prose">${logged === totalSets(r) ? 'Every set is logged.' : `You logged ${logged} of ${totalSets(r)} sets. What you did is saved, and it counts toward your week.`}</p>
      <div class="sheet-actions"><button type="button" class="btn btn-go" data-a="save">Save and finish</button><button type="button" class="btn btn-quiet" data-a="close">Keep going</button><button type="button" class="btn btn-danger" data-a="discard">Discard this session</button></div>`, 'End workout')
  }
  function bump(k, d) {
    const e = cur(), set = e.sets[k], inp = $(`#r-${S.session.step}-${k}`)
    set.v = Math.max(0, (set.v ?? +inp.placeholder) + d * (measure(e.id) === 'seconds' ? 5 : 1)); inp.value = set.v
  }
  const A = {
    dir: (b) => { S.dir = b.dataset.v; endRest(); render() },
    tab: (b) => { S.screen = b.dataset.v; render() },
    start: (b) => { S.session = newSession(b.dataset.v); S.screen = 'workout'; render() },
    pause: () => { S.session = null; endRest(); S.screen = 'home'; render() },
    end: () => endSheet(),
    save: () => { closeSheet(); finish() },
    discard: () => { closeSheet(); endRest(); S.session = null; S.screen = 'home'; render() },
    close: () => closeSheet(),
    warm: (b) => { const i = +b.dataset.v; S.session.warm[i] = !S.session.warm[i]; b.setAttribute('aria-pressed', S.session.warm[i]) },
    step: (b) => { const v = +b.dataset.v; if (v < -1 || v >= S.session.ex.length) return; S.session.step = v; render() },
    skip: () => { const s = S.session; cur().skipped = true; if (s.step < s.ex.length - 1) { s.step++; render() } else endSheet() },
    dec: (b) => bump(+b.dataset.v, -1),
    inc: (b) => bump(+b.dataset.v, 1),
    check: (b) => {
      const k = +b.dataset.v, e = cur(), set = e.sets[k], inp = $(`#r-${S.session.step}-${k}`)
      set.done = !set.done
      if (set.done && set.v == null) set.v = +inp.placeholder
      $('#sets').innerHTML = setRows(e, S.session.step)
      if (set.done) {
        const nk = e.sets.findIndex((x) => !x.done), nx = S.session.ex[S.session.step + 1]
        startRest(e.rest, `After set ${k + 1} of ${EX[e.id].name.toLowerCase()}`, nk >= 0 ? `Next: set ${nk + 1}, ${range(e, e.id)}` : nx ? `Next: ${EX[nx.id].name}` : 'That was the last set. Finish when ready.')
      }
    },
    addset: () => { cur().sets.push({ v: null, done: false }); $('#sets').innerHTML = setRows(cur(), S.session.step); render() },
    rmset: () => { cur().sets.pop(); render() },
    swap: (b) => { const e = cur(); e.from = e.from || e.id; e.id = b.dataset.v; if (e.id === e.from) e.from = null; render() },
    detail: (b) => { S.back = S.screen === 'workout' ? 'workout' : 'library'; S.detail = b.dataset.v; S.screen = 'detail'; render() },
    back: () => { S.screen = S.back === 'workout' && S.session ? 'workout' : 'library'; render() },
    libf: (b) => { S.libF = b.dataset.v; document.querySelectorAll('[data-a="libf"]').forEach((x) => x.setAttribute('aria-pressed', x === b)); $('#lib-list').innerHTML = libItems(); mountFigures($('#vp')) },
    annot: () => { S.annotate = !S.annotate; render() },
    sound: (b) => { S.sound = !S.sound; b.setAttribute('aria-checked', S.sound) },
    'rest-pause': (b) => { const r = S.rest; if (r.paused) { r.paused = false; r.ends = Date.now() + r.left * 1000; b.textContent = 'Pause' } else { r.paused = true; b.textContent = 'Resume' } },
    'rest-add': (b) => { const r = S.rest; r.left = Math.max(1, r.left + +b.dataset.v); r.total = Math.max(r.total, r.left); r.ends = Date.now() + r.left * 1000; $('#rest-of').textContent = `of ${mmss(r.total)}`; tickRest() },
    'rest-skip': () => endRest(),
    'rest-min': () => minimiseRest(),
    'rest-open': () => { S.rest.min = false; const p = $('#rest-pill'); if (p) p.remove(); openSheet(restHTML(), 'Rest timer', 'rest-min'); if (S.rest.paused) $('#rest-pp').textContent = 'Resume'; tickRest() },
    jump: (b) => jump(b.dataset.v),
  }
  function jump(v) {
    endRest(); closeSheet()
    const ensure = () => { if (!S.session) S.session = newSession(nextUp()) }
    if (v === 'warmup') { ensure(); S.session.step = -1; S.screen = 'workout' }
    else if (v === 'workout') { ensure(); if (S.session.step < 0) S.session.step = 0; S.screen = 'workout' }
    else if (v === 'rest') {
      ensure(); S.session.step = Math.max(0, S.session.step); S.screen = 'workout'; render()
      const e = cur(); e.sets[0].done = true; e.sets[0].v = e.sets[0].v ?? (LAST[e.id] ? LAST[e.id][0] : e.target.max)
      $('#sets').innerHTML = setRows(e, S.session.step)
      startRest(e.rest, `After set 1 of ${EX[e.id].name.toLowerCase()}`, `Next: set 2, ${range(e, e.id)}`); return
    } else if (v === 'detail') { S.detail = 'db-goblet-squat'; S.back = 'library'; S.screen = 'detail' }
    else S.screen = v
    render()
    if (innerWidth < 960 && !document.documentElement.classList.contains('embed')) $('#app').scrollIntoView({ behavior: F.reducedMotion ? 'auto' : 'smooth' })
  }

  document.addEventListener('click', (ev) => {
    const b = ev.target.closest('[data-a]')
    if (!b) return
    const f = A[b.dataset.a]
    if (f) { ev.preventDefault(); f(b) }
  })
  document.addEventListener('input', (ev) => {
    if (ev.target.id === 'lib-q') { S.libQ = ev.target.value; $('#lib-list').innerHTML = libItems(); mountFigures($('#vp')) }
    else if (ev.target.dataset.k != null && S.session) { const v = parseInt(ev.target.value, 10); cur().sets[+ev.target.dataset.k].v = isNaN(v) ? null : v }
  })
  document.addEventListener('change', (ev) => { if (ev.target.id === 'prog-ex') { S.progEx = ev.target.value; render() } })
  document.addEventListener('toggle', (ev) => { const d = ev.target; if (d.matches && d.matches('details[data-key]')) d.open ? S.open.add(d.dataset.key) : S.open.delete(d.dataset.key) }, true)
  document.addEventListener('keydown', (ev) => { if (ev.key === 'Escape' && overlay.innerHTML) { S.rest && !S.rest.up ? minimiseRest() : S.rest ? endRest() : closeSheet() } })

  const q = new URLSearchParams(location.search)
  if (q.get('dir') === 'blueprint') S.dir = 'blueprint'
  if (q.get('embed')) document.documentElement.classList.add('embed')
  render()
  if (q.get('screen')) jump(q.get('screen'))
})()
