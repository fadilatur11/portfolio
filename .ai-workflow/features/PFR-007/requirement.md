---
artifact: prd-lite
feature: PFR-007
title: R6c: Full-motion pass (transisi+animasi semua section)
type: feature
mode: fast
state: COMPLETED
approval: draft
approved_by:
created: 2026-11-13
---
# PRD Lite — PFR-007: Full-motion pass (R6c)

## Summary
Menambah motion penuh di atas R6 COMPLETED (konsep/layout/data tetap): entrance choreography semua section, scroll-driven depth, dialog transition, micro-interactions, smoothing naik. Non-gating + budget terjaga.

## Problem Statement
User: "poles lagi supaya lebih halus, tambahkan motion, full motion, transition and animation, overall smooth motion."

## Goals
- Semua section punya entrance choreography; scroll memberi kedalaman (parallax); transisi dialog/hover halus; easing konsisten expo.

## Actors
Pengunjung/rekruter; owner.

## Requirements
| ID | Requirement | Status | Source | Critical |
|---|---|---|---|---|
| REQ-PFR-007-001 | Motion penuh: entrance semua section + scroll-driven + dialog transition + micro-interactions | Confirmed | user: "full motion, transition and animation" | yes |
| REQ-PFR-007-002 | Budget & non-gating: transform/opacity saja, max 2 loop, konten tak tersembunyi tanpa JS, reduced-motion fallback penuh, 9 test tanpa perubahan | Confirmed | Jev tighten | yes |
| REQ-PFR-007-003 | Build+test exit 0; overflow/console bersih | Confirmed | Jev tighten | yes |

## Business Rules
- Motion = enhancement; non-gating; reduced-motion penuh; no new runtime deps.

## Main Flow
1. Dispatch frontend-developer dgn spesifikasi motion per section.
2. QA orchestrator + close.

## Alternative & Failure Flows
- Bila motion membuat test gagal → perbaiki implementasi, BUKAN test.
- Bila scroll-driven hook jank → turunkan intensitas, transform/opacity only.

## Scope
- In: semua komponen + CSS motion, hooks baru bila perlu.
- Out: konsep, data, stack, deploy, copy (kecuali micro-copy animasi).

## Acceptance Criteria
| ID | Criterion | REQ | Verification |
|---|---|---|---|
| AC-PFR-007-001 | Entrance choreography hadir di work/profile/cv/contact + scroll-driven stage + dialog transition + micro-interactions | REQ-PFR-007-001 | QA browser |
| AC-PFR-007-002 | 9/9 test tanpa perubahan; build exit 0 | REQ-PFR-007-002 | npm test/build |
| AC-PFR-007-003 | Non-gating (konten terlihat tanpa JS) + reduced-motion penuh + budget ≤2 loop | REQ-PFR-007-002 | QA + emulation |
| AC-PFR-007-004 | errors=[] overflow=0 1440+390 | REQ-PFR-007-003 | QA |

## Dependencies & Constraints
- framer-motion/lenis tetap; tanpa deps baru.
## Open Questions
None.
