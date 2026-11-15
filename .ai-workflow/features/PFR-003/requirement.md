---
artifact: prd-lite
feature: PFR-003
title: Rework total R4: Reels stacked-case structure + Framer Motion
type: feature
mode: standard
state: CANCELLED
approval: draft
approved_by:
created: 2026-11-13
---
# PRD Lite — PFR-003: Rework total R4 — Reels stacked-case + Framer Motion

## Summary
Struktur halaman dirombak TOTAL (bukan kulit): 6 proyek menjadi full-screen stacked case scenes (sticky stacking cards), preloader counter handoff ke hero, custom cursor, footer parallax reveal. Engine animasi GSAP → **Framer Motion** (permintaan eksplisit user); Lenis tetap.

## Problem Statement
User menolak 3 iterasi karena skeleton layout sama (hero kiri→rows→bio→band→contact). Riset 2026-11-13: pola dominan 2025-26 = sticky stacking cards + preloader handoff; fade-rise overused; slide-jack menggate konten (dihindari).

## Goals
- Portfolio dengan struktur sinematik yang benar-benar baru (stacked case film), ditenagai Framer Motion.
- Semua gate kualitas round sebelumnya tetap hijau (parity, a11y, build).

## Actors
Pengunjung/rekruter; owner sebagai maintainer.

## Requirements
| ID | Requirement | Status | Source | Critical |
|---|---|---|---|---|
| REQ-PFR-003-001 | Struktur baru: stacked full-screen case scenes (Reels) | Confirmed | user pilih territory A 2026-11-13 | no |
| REQ-PFR-003-002 | Engine animasi = Framer Motion; Lenis tetap; GSAP dilepas | Confirmed | user: "framer motion" | yes |
| REQ-PFR-003-003 | Konten parity verbatim + 9 test tetap lulus | Confirmed | Jev tighten (load-bearing) | yes |
| REQ-PFR-003-004 | Preloader tidak menggate konten (skimmer aman); reduced-motion fallback fungsional | Confirmed | riset a1.gallery caution + Jev tighten | yes |
| REQ-PFR-003-005 | A11y/performa standar: kontras AA, keyboard, target ≥44, budget motion | Confirmed | Jev tighten | yes |

## Acceptance Criteria
| ID | Criterion | REQ | Verification |
|---|---|---|---|
| AC-PFR-003-001 | Struktur DOM/visual berbeda total dari 3 iterasi sebelumnya (stacked scenes, bukan rows); signature terlihat di viewport pertama | REQ-PFR-003-001 | audit F4 + QA browser |
| AC-PFR-003-002 | Framer Motion aktif (bundle tanpa GSAP; framer di deps); animasi scroll-driven jalan | REQ-PFR-003-002 | package.json + build + QA |
| AC-PFR-003-003 | `npm run test` 9/9 lulus tanpa perubahan asersi; build exit 0 | REQ-PFR-003-003 | npm run test + build |
| AC-PFR-003-004 | Preloader: reduced-motion → tidak muncul; jsdom path (reduced) konten langsung reachable; konten tidak pernah hilang | REQ-PFR-003-004 | test + QA |
| AC-PFR-003-005 | Kontras AA pasangan baru (overlay teks di atas gambar), keyboard reachable, target ≥44px | REQ-PFR-003-005 | contrast tool + QA |

## Business Rules
- Non-copy referensi; animasi tidak menggate konten (prinsip a1.gallery); reduced-motion fungsional penuh.

## Main Flow
1. Swap deps (framer-motion in, gsap out).
2. Komponen baru: Preloader, CustomCursor, ReelStack; rework section lain.
3. main.css rewrite; dead code dihapus.
4. QA + F4 + close.

## Scope
- In: komponen baru (Preloader, ReelStack, CustomCursor), App rewrite, main.css rewrite, deps (framer-motion in, gsap out), dead code removal (lib/motion.js, CursorPreview, StatusStrip).
- Out: konten, data files, deploy, brand.

## Open Questions
None — struktur dipilih user.
## Alternative & Failure Flows
- Bila framer-motion tak kompatibel React 19 / sync Lenis gagal → fallback: GSAP tetap untuk scroll wiring, framer untuk micro-interaction; dicatat di verification.
- Bila stacking cards berat di mobile → degradasi: mobile = kartu statis berurutan (tanpa sticky stack), desktop penuh.

## Dependencies & Constraints
- framer-motion ^12 (React 19 OK), Lenis 1.3.27 tetap, gsap dihapus.
- Baseline test 9/9 harus tetap hijau tanpa perubahan asersi.
