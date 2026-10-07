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
  - Character names must be new. Already taken: Mina, Rafi, Lina, Sam, Sumi, Joy, Ruma, Sohel, Tania, Arif, Nila, Sami, Babul, Shila, Rakib, Rupa, Kamal, Mitu, Jamal, Nabil, Farhana, Imran, Tahmina.
  - Tasks 2–6 run in parallel, so each one names its characters only from its own reserved pool, given in its task section.
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

### Tasks 2–6 (parallel, after pilot sign-off on 2026-10-07)

The pilot shipped as c09192f6. Lessons it taught:
- **Remember box on phones:** at the last main stop the Remember box plus a long caption can push the diagram under the control bar (`mobile-fits`). Keep the last stop's `simple` and the `takeaway` short.
- **Route button labels:** these are Simply-visible, so they carry no code, status codes or acronyms (for example "The department is closed", not "The app is down").
- **Words card terms:** these may carry the real name in brackets, e.g. "Phone book (DNS)".

**Parallel rules:**
- Each worker touches only its topic file, its own `TOPIC_CASES` line, its own `TOPICS` entry and its own station in `network.ts`. The orchestrator resolves the append conflicts when merging.
- Only Task 4 (Docker) edits the `hub-map` smoke check, because Docker opening removes that check's Phase 3 target.

**Structural freedom:** each task section fixes stations, routes and alts. Station coordinates, corridors, edge ids and exact packet labels are the worker's call, within the layout rules. Where Step 0 shows the task section is factually wrong, follow the docs and say so in the report.

---

### Task 2: Nginx reverse proxy

**Slug and export:** `nginx` / `nginx`, `line: 'devops'`, level intermediate. **Research:** §12.

**Metaphor:** the mailroom from HTTP journey, seen from inside.
- Nginx is the mailroom.
- Static files are a brochure rack the mailroom hands out itself.
- The app servers are two department desks.
- TLS termination is the mailroom opening the sealed envelope, so the desks get plain letters.
- **Story:** Imran, who runs the mailroom in HTTP journey, keeps his role and name. Any other characters come only from the pool: Shirin, Mahir, Rokeya.

**Stations:**
- `client`: user;
- `nginx`: mail;
- `static`: folder;
- `app1`: worker;
- `app2`: worker.
- **Group `upstream`:** "Upstream pool", plain "Two department desks", containing `app1` and `app2`.

**Main** (about 9 steps):
1. HTTPS request arrives at `nginx` (port 443).
2. Work `nginx`: TLS terminated.
3. `nginx→static`: a static path.
4. `static→nginx→client`: the file, as one trip.
5. An API request arrives at `nginx`.
6. `nginx→app1`: `proxy_pass`. State on `nginx`: round-robin picked app1.
7. `app1→nginx→client`: the response.
8. The next API request goes `client→nginx→app2`, as one trip. Round-robin moves on.
9. `app2→nginx→client`: the response. This step lands the takeaway.

**Alts:**
- `all-down`, "Every desk is closed", branching after the step-5 request:
  1. work `[app1, app2]`, error;
  2. `nginx→client` error, "502 Bad Gateway".
  - **Use this alt in `TOPIC_CASES`.**
- `one-down`, "One desk is closed", same branch point:
  1. work `app1`, error;
  2. `nginx→app2`, with `proxy_next_upstream` trying the next server;
  3. `app2→nginx→client`, the response.
- `slow-desk`, "The desk takes too long", branching after step 6:
  1. work `app1`, queue;
  2. `nginx→client` error, "504 Gateway Timeout".

**Step 0 must verify at least:**
- round-robin is the default; `least_conn`, `ip_hash`, `max_fails` and `fail_timeout`;
- that open-source nginx has passive health checks only (active ones are NGINX Plus);
- the default `proxy_next_upstream` (`error timeout`);
- which headers nginx sends upstream by default and which need `proxy_set_header`;
- `nginx -t` and `nginx -s reload` behaviour;
- the WebSocket `Upgrade`/`Connection` headers.

---

### Task 3: Django request lifecycle

**Slug and export:** `django-lifecycle` / `djangoLifecycle`, `line: 'backend'`, level intermediate. **Research:** none exists, so Step 0 is a full research pass on docs.djangoproject.com. Cover:
- the request/response cycle and `WSGIHandler`, plus ASGI as a one-line note;
- middleware ordering and the onion, including `process_view` and `process_exception`;
- URL resolution;
- CSRF, and that its check runs in `process_view`, after URL resolution;
- `request.user` from `AuthenticationMiddleware`;
- views, lazy QuerySets and when they hit the DB;
- template rendering;
- responses passing back through middleware in reverse order;
- the 403, 404 and 500 handlers.

Record your Q&A, cheats and verified sources the same way the research doc does.

**Metaphor:** reuse `fastapi-lifecycle.ts`'s Simply metaphor wherever the roles match, so the two backend lifecycles read alike. Read that file's `plain` names first. **Story names** come only from this pool: Sadia, Tareq, Parvez.

**Stations** (adjust to the verified order; 7–8 in all):
- `client`: user;
- `wsgi`: server;
- a middleware group holding 2–3 stations (session/auth, CSRF; icons shield, lock);
- `urls`: route;
- `view`: code;
- `db`: store;
- `template`: folder.

**Main:** 10–12 steps, in the order Django really runs them:
1. the server builds an `HttpRequest`;
2. middleware request phase;
3. URL resolution;
4. `process_view`, where the CSRF check passes;
5. the view runs a query, and the lazy QuerySet hits the DB when evaluated;
6. template render;
7. the response goes back out through middleware in reverse;
8. the client receives it, which lands the takeaway.

Use a POST form submission so CSRF matters.

**Alts:**
- `csrf-fail`, "The form has no pass". The second step is the error: a 403 from `CsrfViewMiddleware`. **Use this alt in `TOPIC_CASES`.**
- `no-route`, "No such page": the resolver finds nothing, which gives a 404.
- `view-crash`, "The view breaks": an exception in the view, `process_exception`, then a 500.

---

### Task 4: Docker

**Slug and export:** `docker` / `docker`, `line: 'devops'`, level beginner. **Research:** §9.

**Metaphor:** a meal kit.
- The Dockerfile is the recipe card.
- The image is a sealed meal kit, made of stacked layers.
- The registry is the shop shelf.
- The container is the meal being cooked from the kit.
- The volume is a leftovers box kept outside the pot.
- **Story names** come only from this pool: Rumana, Hasan, Nusrat.

**Stations:**
- `dev`: user;
- `dockerfile`: code;
- `image`: box;
- `registry`: cloud;
- `container`: power;
- `volume`: archive.

**Main** (about 9 steps):
1. `dev→dockerfile`: write the recipe.
2. `dockerfile→image`: `docker build`. State: layers.
3. Rebuild after a code change. Work `image`, result. State: cached vs new layers.
4. `image→registry`: `docker push`.
5. `registry→image`: `docker pull`, on another machine.
6. `image→container`: `docker run`. State: the published port.
7. `container→volume`: data written.
8. The container is removed. Work `volume`, result. State: data still there.
9. Run again: `image→container` and `volume→container` as parallel moves. This step lands the takeaway: image = template, container = running copy, volume = what survives.

**Alts:**
- `no-volume`, "What if data lives inside the box?", branching after `run`:
  1. work `container`, queue: writes go to the writable layer;
  2. work `container`, error: removed, data gone.
  - **Use this alt in `TOPIC_CASES`.**
- `build-fails`, "A recipe step breaks", branching after step 1:
  1. `dockerfile→image`, the build;
  2. work `image`, error: a `RUN` step failed, with cached layers above it.

**Hub check:** this task also moves the `hub-map` smoke check (`learn-smoke.mjs`, around line 142) from `docker` to a Phase 4 station (`kubernetes`), asserting "Phase 4".

**Step 0 must verify at least:**
- the layer cache rules and the order to write instructions in for cache hits;
- the writable container layer and that it is deleted with the container;
- named volumes vs bind mounts;
- `CMD` vs `ENTRYPOINT`;
- that containers share the host kernel;
- `-p host:container`;
- name-based DNS on user-defined bridge networks only;
- multi-stage builds;
- every cheat command.

---

### Task 5: Docker Compose

**Slug and export:** `docker-compose` / `dockerCompose`, `line: 'devops'`, level intermediate. **Research:** §10.

**Metaphor:** a film set call sheet.
- `compose.yaml` is the call sheet.
- Each service is a crew member, and its service name is its walkie-talkie call sign.
- The healthcheck plus `depends_on` is "don't roll until lighting says ready".
- The named volume is the footage drive.
- **Story names** come only from this pool: Lubna, Fahim, Ayesha.

**Stations:**
- `dev`: user;
- `compose`: task;
- `db`: store;
- `redis`: queue;
- `api`: server;
- `worker`: worker;
- `volume`: archive.
- **Group `net`:** "Project network", plain "The set", containing `db`, `redis`, `api` and `worker`.

**Main** (about 10 steps):
1. `dev→compose`: `docker compose up`.
2. `compose→db` and `compose→redis`, as parallel moves.
3. Work `db`, result: healthy (`pg_isready`).
4. `compose→api`.
5. `compose→worker`. State: same image, different command.
6. `dev→api`: `localhost:8000`, the only published port.
7. `api→db`: `db:5432`, found by service name.
8. `api→redis`: a job.
9. `redis→worker`: the job is picked up.
10. `db→volume`: data persists. This step lands the takeaway: names are addresses, and the volume outlives `down` but not `down -v`.

**Alts:**
- `localhost-bug`, "What if the app looks for localhost?", branching after step 6:
  1. work `api`, queue: it tries `localhost:5432`;
  2. work `api`, error: connection refused, because localhost is the container itself.
  - **Use this alt in `TOPIC_CASES`.**
- `too-early`, "What if the app starts too early?", branching after step 2:
  1. `compose→api` with no health condition;
  2. work `api`, error: the db is not ready yet.

**Step 0 must verify at least:**
- the default project network and service-name DNS;
- that `depends_on` without a condition waits only for start;
- `condition: service_healthy`;
- `ports` vs `expose`;
- that `down` keeps named volumes and `down -v` removes them;
- `compose.override.yaml`;
- `--scale`;
- every cheat command.

---

### Task 6: CI/CD (GitHub Actions)

**Slug and export:** `ci-cd` / `ciCd`, `line: 'devops'`, level intermediate. **Research:** §11.

**Metaphor:** a factory assembly line.
- The push is placing an order.
- The runner is a fresh workstation.
- The tests are quality inspectors.
- The image is the boxed product.
- The environment gate is the shipping manager's sign-off.
- Deploy is shipping to the store.
- **Story names** come only from this pool: Nasrin, Zahid, Rubel.

**Stations:**
- `dev`: user;
- `repo`: folder;
- `runner`: worker;
- `registry`: box;
- `gate`: shield;
- `prod`: server.

**Main** (about 10 steps):
1. `dev→repo`: `git push`.
2. `repo→runner`: the workflow triggers on push, and a fresh runner is given out.
3. Work `runner`: checkout and install.
4. Work `runner`, result: tests pass.
5. `runner→registry`: the image, tagged with the commit SHA.
6. `runner→gate`, queue: the deploy job waits for review.
7. Work `gate`, result: approved.
8. `gate→prod`: deploy that SHA.
9. `registry→prod`: the image is pulled.
10. `prod→repo→dev`: the green tick, as one trip. This step lands the takeaway.

**Alts:**
- `tests-fail`, "What if a test fails?", branching after step 3:
  1. work `runner`, error: a test fails;
  2. `runner→repo→dev` error, the red cross, and nothing deploys.
  - **Use this alt in `TOPIC_CASES`.**
- `rollback`, "What if the new version breaks?", branching after step 9:
  1. work `prod`, error;
  2. `gate→prod`: redeploy the previous SHA.

**Step 0 must verify at least:**
- the workflow/job/step/runner terms;
- that jobs run in parallel unless `needs`;
- that GitHub-hosted runners are a fresh VM per job;
- environments with required reviewers;
- secrets;
- the current major versions of `actions/checkout`, `actions/cache` and `actions/upload-artifact` (from their repos);
- matrix;
- that `workflow_dispatch` and `schedule` are triggers;
- Continuous Delivery vs Continuous Deployment;
- every cheat command.
