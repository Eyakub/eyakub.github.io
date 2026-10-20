# Workout (`/workout`) — Design Spec

- **Date:** 2026-10-20 (round two the same day)
- **Status:** Approved. Plates direction, rotation schedule, animated figure.
- **Approved mock:** `docs/superpowers/specs/assets/workout-v2/index.html` (Plates). The QA sheet for every animation is `movements.html` beside it.
- **Superseded:** the round-one mock (`2026-10-20-workout-mock.html`): dark and brass, with fixed weekdays.

---

## 1. Intent

A private home-workout dashboard for Eyakub. It should help him:
- train four times a week on whatever days work;
- learn each exercise's technique from an animated demo;
- log sets and reps, and see progressive overload;
- record weight and waist;
- stay consistent.

**Equipment:** two 7.5 kg dumbbells, a pull-up bar, and bodyweight. He also has a chair and a step at home. No bands, no gym.

**Schedule:** the four workouts (Push → Pull → Legs + Core → Full body) come in a fixed order, and that order carries across weeks.
- The weekly goal is four sessions, on any days.
- If he picks a different workout, or misses a day, the skipped workout stays next.
- No day is ever "missed"; the week simply shows how many of the four are done.

**Routines are starting data, not code.** They can be edited, and edits never change logged history.

## 2. Decisions

| Topic | Decision | Why |
|---|---|---|
| Route | `pages/workout/*` with its own layout and no portfolio navbar | Same pattern as `/learn` |
| Privacy | Unlisted, `noindex`, excluded from the sitemap, not linked from anywhere | It's a static site, so anyone with the URL just gets an empty app; the data stays in the browser |
| Personal numbers | Entered on first launch, never committed | The repo is public |
| Storage | One `WorkoutDoc` JSON in `localStorage` (`workout:doc`) | The data is small (about 2 KB per session). The backup file and gist sync use the same JSON |
| Sync (later phase) | A secret GitHub gist, using a gist-only token pasted on each device | Works from GitHub Pages with no backend and no new dependency |
| Versioning | `RoutineVersion` is append-only; an edit creates version + 1 | History keeps the version each session was logged with |
| History | Each `SessionRecord` is a full snapshot: names, targets, loads, reps, swaps, skips | It is never re-read from the live routine or catalog |
| Merge rule | Records have ids and `updatedAt`. Sessions and routines are append-only. Measurements are one row per date, last write wins | Lets two devices merge |
| Schedule | `program.order` (the rotation) plus `program.weeklyGoal` (4). Next up = the first workout in the order not yet done in the open cycle | A cycle closes once all four workouts are done, so a skipped one stays next |
| Demos | An animated figure drawn in code (SVG), one rig for every exercise | Accurate to each move, no licensing, works offline, loads instantly |
| Charts | Hand-drawn SVG, no chart library | Four small charts; fast |
| Look | **Plates**: rubber-floor dark. Each workout has a bumper-plate colour (Push red, Pull blue, Legs yellow, Full green), and the week loads plates onto a barbell. Sofia Sans Extra Condensed italic for display, Sofia Sans for body | The user picked it over Blueprint |

## 3. Exercise demos

Each exercise has its own animation, built from one figure rig (pose keyframes, two-bone IK, working muscles in the workout's colour, a caption that follows the rep).
- An exercise without an animation shows a "No demo yet" state. Never show another exercise's animation in its place.
- The figure respects `prefers-reduced-motion`: it shows a still pose that the user can play.

A 3D version was prototyped and dropped in favour of the faster 2D figure. The licensed-media research (Everkinetic, wger, Wikimedia Commons, YouTube embeds) is kept in the project memory in case photos or video are wanted later.

## 4. Phases

1. Repo review, proposal, mock. **Done.**
2. Layout, types, catalog, starting program, storage, first-launch setup, Today, Library, exercise detail, settings (targets, equipment, backup, reset). **Built in the round-one look, being reworked to Plates and the rotation.**
3. Workout mode:
   - session flow: warm-up, then each exercise with its figure, sets, technique and swaps;
   - resume after a reload, pause, skip, add or remove sets;
   - rest timer with a sheet and a minimised pill, plus sound;
   - end, save or discard, and a done screen.
4. History and progress:
   - sessions per week, coloured by workout;
   - weight trend;
   - reps per exercise;
   - personal records, progression hints, routine editor.
5. Gist sync, accessibility pass, reduced motion, performance, add-to-home-screen, smoke test.

## 5. Open items

- Waist target not set yet.
- Hold timer for plank and dead hang (Phase 3).
- Side plank has no animation yet.
