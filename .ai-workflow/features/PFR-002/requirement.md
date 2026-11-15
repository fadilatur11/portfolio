---
artifact: prd-lite
feature: PFR-002
title: Redesign R3: full-motion cinematic concept (T1 rejected by user)
type: feature
mode: standard
state: COMPLETED
approval: draft
approved_by:
created: 2026-11-12
---
# PRD Lite — PFR-002: Redesign R3 — full-motion cinematic concept (T1 ditolak)

## Summary
Rombak total konsep visual portfolio React+Vite yang baru selesai (PFR-001): arah T1 "Living Index" ditolak user ("jelek banget"). Target baru: **full motion, UI modern, smooth, penuh transisi**. Stack, konten, dan deploy tetap.

## Problem Statement
Konsep editorial-paper yang tenang tidak sesuai selera user; user ingin pengalaman motion-first yang sinematik dan halus.

## Goals
- Pengalaman scroll sinematik: transisi antar-scene halus, smooth scrolling, hover micro-interaction di semua elemen.
- Tampilan modern level agensi 2026, tetap profesional dan accessible.

## Actors
Pengunjung/rekruter; owner sebagai maintainer.

## Requirements
| ID | Requirement | Status | Source | Critical |
|---|---|---|---|---|
| REQ-PFR-002-001 | Rombak total konsep visual (bukan restyle T1) | Confirmed | user: "rombak total konsepnya" | yes |
| REQ-PFR-002-002 | Full motion + smooth + penuh transisi (scroll, hover, section) | Confirmed | user: "full of motion, UI modern, smooth, full of transition" | yes |
| REQ-PFR-002-003 | Konten parity dipertahankan (data files tetap) | Derived | konsekuensi: konten sudah Confirmed parity di PFR-001 (REQ-005) | no |
| REQ-PFR-002-004 | Standar a11y/performa PFR-001 tetap berlaku (kontras AA, reduced-motion, keyboard, budget) | Derived | AGENTS.md + non-negotiables ui-craft | no |
| REQ-PFR-002-005 | Scaffold/stack/data/deploy tidak berubah (React+Vite+GSAP, netlify.toml) | Derived | stack disetujui PFR-001; user hanya menolak konsep visual | no |

## Business Rules
- Non-copy 1:1 referensi; distance test; reduced-motion fallback fungsional (ui-craft non-negotiables).

## Main Flow
1. F0 re-run divergence → 3 territory baru → user pilih.
2. F1 token baru → F2/F3 rebuild komponen & motion → QA → F4 → F5.

## Alternative & Failure Flows
- Max 2 round divergence; bila user menolak semua → eskalasi dengan contoh konkret.

## Scope
- In: lapisan visual+motion (komponen, CSS, motion layer, token), smooth scroll (Lenis), transisi antar-section.
- Out: konten, stack, deploy, backend.

## Acceptance Criteria
| ID | Criterion | REQ | Verification |
|---|---|---|---|
| AC-PFR-002-001 | Konsep baru struktural berbeda dari T1 (bukan restyle) & dari referensi; signature move terlihat di viewport pertama + echo | REQ-PFR-002-001 | audit F4 (.ui-craft/review-gate.md baru) |
| AC-PFR-002-002 | Smooth scrolling aktif (inertia), transisi antar-section terlihat, hover micro-interaction pada semua elemen interaktif | REQ-PFR-002-002 | QA browser + checklist F4 |
| AC-PFR-002-003 | 9 test parity tetap lulus (konten tidak berubah); build exit 0 | REQ-PFR-002-003, REQ-PFR-002-005 | npm run test + build exit code |
| AC-PFR-002-004 | Kontras AA terverifikasi utk palet baru; reduced-motion fallback fungsional; keyboard reachable; budget motion dijaga | REQ-PFR-002-004 | contrast tool + unit reduced path + QA |
| AC-PFR-002-005 | Console bersih + overflow 0 di 1440 & 390 | REQ-PFR-002-004 | QA browser |

## Dependencies & Constraints
- Lenis (smooth scroll) ditambah sebagai dependency baru — satu library kecil (~3KB), kompatibel GSAP ScrollTrigger.
- UI-craft loop rule: maks 2 round divergence.

## Open Questions
1. [user] Pilih territory baru (3 opsi disajikan).
