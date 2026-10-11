# Auto scaling — plan only

**Status:** unlinked English film at `/learn/auto-scaling`. Not on the map, not in `TOPICS`, no player change. Station stays off until this page has been looked at. Dated 2026-10-11.

**Source:** [Phạm Tùng reel 1602540408325059](https://www.facebook.com/reel/1602540408325059/). Caption: “CPU chạm 99%, chính sách kích hoạt, hai instance mới được tạo.” Playback sits behind a login wall. The lesson below is taken from the two frames supplied with that link.

**Home when it ships:** DevOps line, after `kubernetes`. Reserved slug `auto-scaling`. Phase 4. Do not add the station until the wireframe experiment below has been looked at on the site.

## What the two frames teach

One policy: CPU above 70% adds two instances. The fleet is going from 2 to 4.

**Frame 1, while it is late.** Requests drop into a load balancer. `web-1` and `web-2` are red at CPU 99%. `web-3` and `web-4` are empty dashes. The counter shows 503s still arriving and a few oks. An autoscaler bar says it launches two instances, then waits for health checks. Four chips sit on that bar: metric 66s, alarm 66s, boot 75s, health 45s, and the total lag reads 4:00. The sentence under the diagram: crossing the threshold starts a four-minute build, not a server. The line under the tiles: the policy fires, two more instances, and 4:00 before they can serve.

**Frame 2, after the wait.** All four cards are green at CPU 52%. 503s are 0. The sentence: four servers at 52%, the fleet grew itself, four minutes late. A small note counts the 503s that landed while it was building. The footer names four ideas and does not teach them: target tracking, step scaling, predictive, warm pools.

The ride on screen is step scaling (a threshold, then add two). The second frame landing near 50% is the after state. It is not a target-tracking lesson. The 66/66/75/45 chips and the round 4:00 are the reel’s numbers (they sum to 4:12). They are not AWS defaults. Re-check them against the EC2 Auto Scaling docs before any real topic page. The “8 × 503” count is a story prop, not a formula.

The frame-1 fleet tile already says “4 running” while two cards are still empty. Copy that in the experiment, because the point of the experiment is the same board. On a real topic page, split desired and serving so the tile does not claim the new two are up.

## Wireframe experiment

Shipped as one unlinked page, `pages/learn/auto-scaling.tsx`, in the site chrome. English only. The picture is a 24s HyperFrames film (`public/learn/auto-scaling.mp4`, source in `docs/superpowers/specs/assets/autoscaling-hyperframes/`). It walks calm, spike, wanted-but-not-serving, the four chips, boot, then four serving. The fleet tile says 2 serving, then 4 wanted, then 4 serving. Same board, top to bottom:

1. Title “Auto Scaling” and the line “two servers, one threshold, two more servers”.
2. Policy strip: CPU above 70% adds two instances.
3. Fleet badge `2 → 4`, plus a 503 count and an ok count.
4. A request stem into one load-balancer node, then four branches.
5. Four server cards. Red and 99% for the two that are up in frame 1. Dashes for the two still booting. All four green at 52% in frame 2.
6. Autoscaler bar, then the four time chips and the 4:00 lag.
7. Three tiles: fleet, threshold, scale-out lag.
8. One sentence for the state on screen.
9. Footer words only: target tracking, step scaling, predictive, warm pools.

Dark board, the same stacking and the same two colors for hot and healthy. This is a look test beside Stop by Stop. It does not replace the transit map, and it does not become the topic player. Judge it, then decide whether a later `auto-scaling` page keeps this board or goes back to stations and a packet.

## Not in this experiment

No Bangla, no Story mode, no Q&A, no station on `/learn`, no change to `components/learn/player`. Kubernetes stays the last open DevOps stop.
