# Stop by Stop Phase 3 Implementation Plan

**Goal:** Open six more stations on `/learn`:
- **Backend line:** HTTP request journey and Django lifecycle.
- **DevOps line:** Docker, Docker Compose, CI/CD (GitHub Actions) and Nginx reverse proxy.

Every topic ships with the full teaching scaffold and Story mode, in EN and BN.

**User decisions (2026-10-07):**
- All six topics, including Django (the map already shows it as a Phase 3 stop).
- Pilot first. HTTP journey is built and reviewed by the user, then the other five run in parallel.
- Story mode ships on day one for every topic.

**Architecture:**
- Data only: one `data/learn/topics/<slug>.ts` per topic, registered in `data/learn/index.ts`. The hub opens a station as soon as its slug is in `TOPICS`.
- No engine changes are planned. If a topic seems to need one, stop and report instead of changing the engine.

**References:**
- **Spec:** `docs/superpowers/specs/2026-10-04-learn-stop-by-stop-design.md` (§10 content rules, §12 Phase 3 list) and `docs/superpowers/specs/2026-10-05-learn-teachability-design.md` (§3 fields, §5 Simply writing rules).
- **Research:** `docs/superpowers/research/2026-10-04-learn-topic-research.md`. Its Phase 3 sections are OUTLINES, and most sources are marked "(knowledge)". Each topic task begins with a verification pass (Step 0).
- **Format references:**
  - `fastapi-lifecycle.ts` for groups, error return paths and several alts;
  - `git-basics.ts` for `state`/`plainState` and Story mode;
  - `concurrency-vs-parallelism.ts` for a complete, recently reviewed topic.

## Global Constraints

All constraints from `2026-10-05-learn-phase-2.md` → "Global Constraints" and "Shared procedure → Authoring rules" still apply: counts, copy limits, layout rules, edge kinds, corridors, Bangla rules and commit rules. Additions:

- **Teaching scaffold is required** (types make it so), and the integrity test plus the jargon lint enforce it:
  - `hook`, `takeaway`, `words` (3–6), `whatIf` on every alt;
  - `plain` names and subs on every node;
  - `plain` labels on every move;
  - `plainState` wherever `state` is set;
  - `Group.plain` on every group;
  - a `legend` override only where the default wording misleads.
- **Story mode:**
  - `story.cast` is one sentence;
  - every step of main and every alt has `story.title` (≤ 40 chars) and `story.text` (≤ 45 words);
  - one continuous plot with the same characters, and alts continue it.
  - Character names must be new. Already taken: Mina, Rafi, Lina, Sam, Sumi, Joy, Ruma, Sohel, Tania, Arif, Nila, Sami, Babul, Shila, Rakib, Rupa, Kamal, Mitu, Jamal.
- **Station data:** give the topic's station in `data/learn/network.ts` a `blurb` (EN + BN, one plain line) and a `level`.
- **Simply rule 4 is strict:** no status codes, versions, acronyms or code in Simply-visible text. "502" belongs in Technically only, and Simply says "the mailroom can't reach the department".
- **Facts:**
  - Every protocol, version or default claim in `tech`, Q&A or cheats must be checked against a primary source in Step 0.
  - Only URLs that Step 0 actually opened go into `sources`.
- **Smoke hub check:** `hub-map` clicks `docker` to assert the "Phase 3" toast. The task that opens Docker must switch that check to a station that is still closed, with the matching phase text.

## Shared procedure (one topic per task)

Same as Phase 2 Steps 1–6, with Step 0 added in front and Story mode written as part of Step 1.

- [ ] **Step 0: Verify the research.**
  - Fetch the primary docs for the topic: MDN, RFCs, nginx.org, docs.docker.com, docs.github.com, docs.djangoproject.com, uvicorn.org.
  - Confirm or correct every fact you will use.
  - Record the verified facts and URLs in your report.
- [ ] **Step 1: Author the data file:** structure from the task section, content from the research and Step 0, plus the scaffold and Story mode.
- [ ] **Step 2: Register, add the station blurb and level, and add the smoke case** (`TOPIC_CASES` with `taught: true`).
- [ ] **Step 3: Unit gate:** `npm test && npm run typecheck:learn`.
- [ ] **Step 4: Visual gate:**
  - Run `npm run build`.
  - Run `SMOKE_ONLY=step-shots LEARN_SHOTS=<slug> LEARN_SHOTS_MODES=simple,tech,story node scripts/learn-smoke.mjs`.
  - Inspect the first stop, every multi-hop stop and the first stop of each alt, in wide and narrow.
- [ ] **Step 5: Smoke gate:** `npm run smoke:learn`, all PASS.
- [ ] **Step 6: Commit:** `feat(learn): add <title> topic`.

---

### Task 1 (pilot): HTTP request journey

**Slug and export:** `http-journey` / `httpJourney`, `line: 'backend'`. **Research:** §4. The title and BN title come from the `network.ts` station name. Level: beginner.

**Metaphor (Simply and Story):** sending a letter to a company, from research §4. Later topics reuse this mapping:

| Real | Simply name (EN) | BN |
|---|---|---|
| Browser | You | আপনি |
| DNS resolver | Phone book | ফোন বুক |
| Load balancer | Front desk | রিসেপশন |
| Nginx | Mailroom | মেইলরুম |
| App server | Department | বিভাগ |
| Database | Filing cabinet | ফাইল কেবিনেট |
| TCP + TLS handshake | Phoning ahead and agreeing a secret code | আগে ফোন করে গোপন কোড ঠিক করা |
| Request / response | Your letter / the reply | চিঠি / উত্তর |

**Stations** (id: icon): `browser`: user; `dns`: bookmark; `lb`: route; `nginx`: mail; `app`: worker; `db`: store.

**Group:** `site`, label "Inside the company's servers", plain "Inside the company". It contains `lb`, `nginx`, `app` and `db`, but not `browser` or `dns`.

**Layout sketch:**
- **Wide:** `browser` at the left middle, with `dns` above it. The company group runs left to right: `lb` → `nginx` → `app` → `db`.
- **Narrow:** spine down the left half, labels on the right, in the order `browser`, `dns`, `lb`, `nginx`, `app`, `db` (`dns` may sit as a side bracket).

**Edges:**
- request + result pairs on `browser↔dns`, `browser↔lb`, `lb↔nginx`, `nginx↔app` and `app↔db`;
- error return edges `nginx→lb` and `lb→browser` for the gateway failures. Follow how `fastapi-lifecycle.ts` names error edges beside result edges on the same pair.

**Main** (11 steps, ids in order):
1. `dns-ask`: `browser→dns`, "example.com?"
2. `dns-answer`: `dns→browser`, "203.0.113.10" (a documentation range, RFC 5737)
3. `tcp-hello`: `browser→lb`, "TCP SYN"
4. `tls`: `lb→browser`, "certificate". State on `browser`: the secret code is agreed.
5. `request`: `browser→lb`, "GET /api/items"
6. `to-nginx`: `lb→nginx`, the request forwarded. State on `lb`: which server it picked.
7. `to-app`: `nginx→app`, "proxy_pass"
8. `query`: `app→db`, "SELECT items"
9. `rows`: `db→app`, "rows"
10. `response`: `app→nginx`, `nginx→lb`, `lb→browser`, three result moves that chain into one trip, "200 + JSON"
11. `render`: work `browser`, result. This step lands the takeaway.

**Alts:**
- `bad-gateway`, label "The app is down", `branchAfter: 'to-nginx'`:
  1. `app-down`: work `app`, error;
  2. `gateway-502`: `nginx→lb→browser` error, "502 Bad Gateway".
  - **Use this alt in `TOPIC_CASES`:** `altStop: 'Stop 7 of 8'`.
- `too-slow`, label "The data takes too long", `branchAfter: 'query'`:
  1. `slow-db`: work `db`, queue;
  2. `gateway-504`: `nginx→lb→browser` error, "504 Gateway Timeout".
- `redirect`, label "You typed http://", `branchAfter: 'dns-answer'`:
  1. `plain-http`: `browser→lb`, "GET http://";
  2. `moved`: `lb→browser` result, "301 → https".

**Step 0 must verify at least:**
- the DNS resolution chain and TTL;
- that TLS 1.3 has a 1-RTT handshake and that HTTP/3 runs over QUIC;
- the RFC 9110 meanings of 301, 502 and 504;
- `X-Forwarded-For` and Uvicorn's `--proxy-headers` / `--forwarded-allow-ips`;
- nginx `proxy_pass` and the `proxy_read_timeout` default;
- every cheat-sheet command's flags.

**Review stop:** after the commit, the orchestrator reviews the screenshots and sends them to the user. Tasks 2–6 are written only after the user signs off on the pilot.

---

### Tasks 2–6

These are written after the pilot review. Planned order:
- HTTP journey's neighbours on the map first: Nginx (it reuses the mailroom), then Django (it needs its own research pass, since the research doc has no Django section).
- Then the DevOps line: Docker → Docker Compose → CI/CD.
