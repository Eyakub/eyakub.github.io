# Workout (`/workout`) — Design Spec

- **Date:** 2026-10-20
- **Status:** Approved (mock and phase plan), Phase 2 in progress
- **Approved mock:** `docs/superpowers/specs/assets/2026-10-20-workout-mock.html`

---

## 1. Intent

A private home-workout dashboard for Eyakub: follow the weekly routine, learn each exercise's technique, log sets and reps, see progressive overload, record weight and waist, and stay consistent.

- **Equipment:** two 7.5 kg dumbbells, a pull-up bar, bodyweight, plus a chair and a step at home. No bands, no gym.
- **Week:** Mon Push · Tue Pull · Wed active recovery · Thu Legs + Core · Fri active recovery · Sat Full body · Sun rest.
- **The routine is starting data, not code.** It is editable, and edits never change logged history.

## 2. Decisions

| Topic | Decision | Why |
|---|---|---|
| Route | `pages/workout/*`, own layout, no portfolio navbar | Same pattern as `/learn` |
| Privacy | Unlisted, `noindex`, excluded from the sitemap, not linked anywhere | Static site: anyone with the URL gets an empty app; data stays in the browser |
| Personal numbers | Entered on first launch, never committed | The repo is public |
| Storage | One `WorkoutDoc` JSON in `localStorage` (`workout:doc`) | Small data (≈2 KB per session). Backup file and gist sync use the same JSON |
| Sync (later phase) | Secret GitHub gist via a gist-only token pasted per device | Works from GitHub Pages with no backend and no new dependency |
| Versioning | `RoutineVersion` is append-only; editing makes version + 1 | History keeps the version it was logged with |
| History | `SessionRecord` is a full snapshot: names, targets, loads, reps, swaps, skips | Never re-read from the live routine or catalog |
| Merge rule | Records have ids and `updatedAt`; sessions and routines append-only; measurements one row per date, last write wins | Lets two devices merge |
| Charts | Hand-drawn SVG, no chart library | Four small charts; fast |
| Look | Dark-first, brass accent, Archivo condensed display, Instrument Sans body, Geist Mono data; stopwatch-dial rest timer | Approved mock |

## 3. Exercise media

A media entry is added only after checking it shows that exact exercise. Otherwise the card shows "No demo linked yet". Never use another exercise's demo.

| Source | Use | Licence |
|---|---|---|
| Everkinetic (github.com/everkinetic/data) | Two-frame start/end art, hosted here, looped | CC BY-SA 4.0, credit required |
| wger image API | Gaps, checked one image at a time; skip AI-flagged and authorless images | CC BY-SA 3.0 / 4.0 per image |
| Wikimedia Commons (Wensceslao set) | Push-ups, squats, jumping jacks | CC BY-SA 4.0 |
| YouTube, privacy-enhanced embed | Exercises with no licensed media; iframe loads only on tap | Embed only |
| free-exercise-db | Text cross-check only | Unlicense text; images have unknown origin, not used |
| ExerciseDB, MuscleWiki | Not used | Terms forbid redistribution or re-hosting |

Every hosted asset is credited under the media and on `/workout/credits`.

## 4. Phases

1. Repo review, proposal, mock. **Done.**
2. Layout, types, catalog, starting program, storage, first-launch setup, Today, Library, exercise detail, settings (targets, equipment, backup, reset).
3. Workout mode: session flow, resume, swaps, add/remove sets, rest timer, licensed media and credits.
4. History and progress: charts, personal records, progression hints, week plan and routine editor.
5. Gist sync, accessibility pass, reduced motion, performance, add-to-home-screen, smoke test.

## 5. Open items

- Waist target not set yet.
- Missed-day policy (shift the plan or skip it) is undecided. Phase 2 marks a missed day and moves on.
- Hold timer for plank and dead hang (Phase 3).
