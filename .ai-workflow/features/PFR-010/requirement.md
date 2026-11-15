---
artifact: prd-lite
feature: PFR-010
title: R6 continuous motion elevation — scroll-scrub kontinu + hover fisik 3D + kinetic type
type: feature
mode: standard
state: COMPLETED
approval: approved
approved_by: user (AskUserQuestion approval of 8-step plan + "lakukan rekomendasimu, aku percaya dengan skill impeccablemu")
created: 2026-11-15
---

# PRD Lite — PFR-010

## Summary
Elevasi motion portfolio R6 "Cinematic Code Review" dari *entrance sekali-jalan* menjadi *kehidupan kontinu*: scroll-scrub yang terus berjalan, hover fisik (tilt 3D + glow + parallax dalam kartu), kinetic typography (text-decode + caret), feedback velocity scroll, dan polish transisi preloader — tanpa mengubah konsep visual, grid layout, palet, dan kontrak test.

## Problem Statement
User menilai site "kurang full motion dan kurang modern" (pesan 2026-11-15) meski PFR-007 (full-motion pass) sudah jalan. Diagnosa: motion eksisting mayoritas entrance once-only (`whileInView once`); setelah section masuk, halaman statis sampai hover. Site modern award-level punya kehidupan kontinu.

## Goals
- Site terasa hidup kontinu saat scroll dan hover, se-modern mungkin pada batasan stack eksisting (framer-motion + Lenis), tanpa dependency baru.
- Selera user terkunci pada konsep R6; elevasi harus memperkuat konsep "code review sebagai panggung" — bukan efek generik.

## Actors
- Pengunjung portfolio (recruiter/hiring manager) — desktop fine-pointer (efek fisik penuh), mobile/touch (efek diskalakan turun), reduced-motion (rest state).

## Requirements
| ID | Requirement | Status | Source | Critical |
|---|---|---|---|---|
| REQ-PFR-010-001 | Elevasi R6, bukan konsep baru: konsep visual, grid layout, palet dark+amber, tipografi Archivo+IBM Plex Mono, dan kontrak test tidak diubah. | Confirmed | Jawaban user Q1 "Elevasi R6 (Recommended)" + "Motion + interaksi (Recommended)" (AskUserQuestion, 2026-11-15) | yes |
| REQ-PFR-010-002 | Motion kontinu berbasis scroll: scroll progress bar (amber, scaleX scrub), velocity-skew pada ticker archive, JSDoc profile jadi scrub scroll-driven (tanpa split text node). | Confirmed | Rencana L2/L4/L5 disetujui; pesan user "kurang full motion" | no |
| REQ-PFR-010-003 | Hover fisik: 3D tilt (clamp ±4°) + pointer glow + inner image parallax (lawan tilt) pada 6 case card; glow+scale hover CV card; email CTA fill-wipe hover; micro-interactions row/chip. | Confirmed | Rencana L4/L5 disetujui; pesan user "kurang full motion dan kurang modern" | no |
| REQ-PFR-010-004 | Kinetic typography sesuai tema code-review: decode/scramble one-shot pada mono kicker non-kontrak (hero kicker, work kicker); caret amber intro (berkedip 4× saat intro saja, bukan loop persisten ke-3). | Confirmed | Rencana L3; tema R6 "code review sebagai panggung" | no |
| REQ-PFR-010-005 | Kontrak test: 9 test existing hijau TANPA modifikasi file test lama; string verbatim (bio, H1 lines, email, availability, '+7', '6 featured / 7 more', nama proyek, 'Curriculum') tetap direct text node. | Confirmed | src/__tests__/app.test.jsx:34-45 (getByText hanya match direct text node) + memori PFR-008 | yes |
| REQ-PFR-010-007 | Preloader exit-wipe (AnimatePresence, one-shot, expo curve); reduced-motion = unmount instan (perilaku lama). | Confirmed | Rencana L2 disetujui | no |
| REQ-PFR-010-006 | Aksesibilitas & performa: reduced-motion = rest state (non-gating, konten tak pernah tersembunyi); ≤2 animasi loop persisten (status-pulse + ticker-scroll); tilt/glow gated fine-pointer; efek terbatas transform/opacity/clip-path/filter bounded; ambient loops berhenti offscreen (useAmbientPause). | Confirmed | src/lib/motion.js:1-8 + pola PFR-007/PFR-009 + animate.md (impeccable) | yes |

## Business Rules
Tidak ada business rule baru; kontrak konten = teks verbatim di REQ-005.

## Main Flow
1. Visitor scroll → progress bar mengikuti, ticker ber-skew sesuai velocity, JSDoc ter-scrub, section ter-choreograph.
2. visitor hover case card → tilt 3D + glow mengikuti pointer + image parallax lawan tilt.
3. Kicker masuk viewport → decode one-shot ke teks final.
4. Intro hero → caret berkedip 4× saat intro reading; thread unfold tetap.
5. Preloader selesai → panel exit-wipe ke atas, tanpa flash.

## Alternative & Failure Flows
- Reduced motion: semua efek baru no-op, konten di rest state terlihat penuh (non-gating).
- Coarse pointer (touch): tilt/glow/cursor-glow tidak aktif (matchMedia `(hover: hover) and (pointer: fine)`).
- Tanpa IntersectionObserver (jsdom/old browser): decode no-op, teks final langsung (pola `ticker` existing).
- Skew velocity di-clamp; tidak bertabrakan dengan Lenis (satu sumber scrollY framer).
- Kicker ber-kontrak (nav-status, contact rows) TIDAK diberi decode.

## Scope
- In scope: komponen + hooks + CSS listed di plan; test baru di `src/__tests__/motion.test.jsx`.
- Out of scope: ganti palet/tipografi/konsep/grid; sticky-stack cards; word-split bio (merusak REQ-005); hapus `ReelStack.jsx` dead code (rekomendasi saja); commit/push; deploy.

## Acceptance Criteria
| ID | Criterion | REQ | Verification |
|---|---|---|---|
| AC-PFR-010-001 | `npm test` hijau 100% — 9 test lama tidak diubah + test baru untuk efek baru. | REQ-PFR-010-005, REQ-PFR-010-006 | vitest output asli |
| AC-PFR-010-002 | `npm run build` exit 0. | REQ-PFR-010-001, REQ-PFR-010-002, REQ-PFR-010-003, REQ-PFR-010-004, REQ-PFR-010-006, REQ-PFR-010-007 | build output |
| AC-PFR-010-003 | ScrollProgress dirender aria-hidden; tilt/glow/decode no-op pada reduced-motion & coarse-pointer; decode berakhir di teks final identik. | REQ-PFR-010-004, REQ-PFR-010-006 | `src/__tests__/motion.test.jsx` + QA computed-style |
| AC-PFR-010-004 | Loop persisten CSS = 2 (status-pulse, ticker-scroll); caret intro one-shot (4 blink lalu berhenti). | REQ-PFR-010-006 | QA audit computed-style di build served |
| AC-PFR-010-005 | QA headless: 9 teks verbatim ada di DOM hidup; screenshot desktop+mobile; computed-style tilt/glow transform-only; reduced-motion state bersih. | REQ-PFR-010-005, REQ-PFR-010-006 | QA subagent report |
| AC-PFR-010-006 | `impeccable detect --json` dijalankan sekali pada file berubah; temuan critical=0 (atau semua diperbaiki). | REQ-PFR-010-001, REQ-PFR-010-002, REQ-PFR-010-003, REQ-PFR-010-004, REQ-PFR-010-006, REQ-PFR-010-007 | detector output |

## Dependencies & Constraints
- Stack terkunci (framer-motion 14 + Lenis), tanpa dependency baru; curve expo `[0.16,1,0.3,1]`; margin IO vertikal-saja (pelajaran PFR-007 trap).
- Build besar di-dispatch ke subagent (frontend-developer via project-manager) dengan spec presisi; QA independen (pola PFR-007..009).

## Open Questions
None.
