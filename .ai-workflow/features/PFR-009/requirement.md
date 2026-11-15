---
artifact: prd-lite
feature: PFR-009
title: R6e: Craft elevation pass (standar eksekusi = referensi Sieve)
type: feature
mode: standard
state: COMPLETED
approval: draft
approved_by:
created: 2026-11-13
---
# PRD Lite — PFR-009: Craft elevation pass

## Summary
Konsep R6 tetap; EKSEKUSI dinaikkan ke standar craft referensi Sieve (nilai dibedah dari CSS sumbernya). Gap konkrit: tidak ada lamp falloff, tidak ada stage fade mask, tidak ada per-line right-edge fade, tidak ada scan beam, comment/btn tanpa inner hairline+deep shadow, screenshot work mentah 2017 (taskbar Windows/tab Chrome terlihat).

## Problem Statement
User: "secara keseluruhan masih kaku dan jelek. masih tidak menggambarkan seorang UI/UX handal." — masalah = craft eksekusi, bukan konsep.

## Goals
- Atmosphere sinematik (cahaya/mask/fade) seperti referensi; screenshot karya di-frame seperti art direction desainer; detail premium di semua permukaan.

## Actors
Pengunjung/rekruter; owner.

## Requirements
| ID | Requirement | Status | Source | Critical |
|---|---|---|---|---|
| REQ-PFR-009-001 | Atmosphere: lamp falloff layer + stage vertical mask + per-line right-edge fade + scan beam (nilai persis dari referensi) | Confirmed | audit craft vs /tmp/ref-cinematic/hero.html | yes |
| REQ-PFR-009-002 | Art direction screenshot work: crop chrome browser + frame premium (border, inner hairline, scrim, label mono) | Confirmed | audit visual: screenshot mentah = penyumbang utama "jelek" | yes |
| REQ-PFR-009-003 | Detail premium: comment/dialog inner hairline + deep shadow, btn inset shadow, grain overlay-blend, ::selection + scrollbar refinement, spacing rhythm | Confirmed | audit | yes |
| REQ-PFR-009-004 | 9 test parity tanpa perubahan asersi; non-gating + reduced-motion rest-state; build+test exit 0 | Confirmed | kontrak parity + Jev | yes |

## Business Rules
- Nilai/gradasi craft diadaptasi dari referensi (mekanisme); konten milik owner; transform/opacity/mask/gradient saja; budget loop tetap 2; reduced-motion rest-state.

## Main Flow
1. Dispatch frontend-developer dgn spesifikasi craft + nilai persis dari referensi.
2. QA orchestrator + close.

## Alternative & Failure Flows
- Bila crop chrome menghilangkan konten penting screenshot → sesuaikan offset (chrome atas ±60-90px).
- Bila stage mask menutupi thread → thread di luar mask (fade hanya di lines).

## Scope
- In: CSS craft (atmosphere, kartu, detail), markup frame kartu, Work.jsx crop treatment.
- Out: konsep, copy utama, data, stack, deploy.

## Acceptance Criteria
| ID | Criterion | REQ | Verification |
|---|---|---|---|
| AC-PFR-009-001 | Lamp falloff + stage fade + line fade + scan beam hadir | REQ-PFR-009-001 | QA screenshot + computed style |
| AC-PFR-009-002 | Screenshot work tanpa chrome mentah; di-frame premium | REQ-PFR-009-002 | QA screenshot |
| AC-PFR-009-003 | Detail premium terpasang (hairline/shadow/selection/scrollbar) | REQ-PFR-009-003 | QA + computed |
| AC-PFR-009-004 | 9/9 test; build exit 0; errors=[] overflow=0 1440+390; reduced-motion rest-state | REQ-PFR-009-004 | npm + QA |

## Dependencies & Constraints
- Tanpa deps baru; test parity tak berubah.

## Open Questions
None.
