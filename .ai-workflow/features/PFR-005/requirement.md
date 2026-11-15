---
artifact: prd-lite
feature: PFR-005
title: R6: Cinematic Code Review (referensi eksplisit user: Sieve hero)
type: feature
mode: standard
state: COMPLETED
approval: draft
approved_by:
created: 2026-11-13
---
# PRD Lite — PFR-005: R6 "Cinematic Code Review" (referensi eksplisit user)

## Summary
Rework total ke-6 mengikuti referensi eksplisit user (Sieve dark-code-review-hero, dibedah dari sumber): dark monochrome #0b0d0e + **amber #f2b33d tunggal** + **product-as-code stage** (file TS tanpa border bleeding off right edge) + read-wave gutter + reading ruler pointer + **split-open review comment**. Font: Archivo (wdth 82 display) + IBM Plex Mono. Framer infra + Lenis tetap; konten terjaga.

## Problem Statement
User memberi referensi konkret pertama kali — selera terkunci: sinematik gelap monokrom dengan kode sebagai panggung, interaktif (ruler mengikuti pointer), smooth, profesional.

## Goals
- Portfolio yang terasa seperti demo Sieve: kamera pada kode, satu flag amber bermakna, comment reviewer yang unfold halus.
- Interaktif: halaman merespons pointer (ruler) dan scroll (reveal/opposing rows) dengan transisi smooth.

## Actors
Pengunjung/rekruter; owner sebagai maintainer.

## Requirements
| ID | Requirement | Status | Source | Critical |
|---|---|---|---|---|
| REQ-PFR-005-001 | Konsep dark monochrome + code stage + amber flag tunggal + split-open comment (adaptasi Sieve) | Confirmed | user: "konsepnya seperti ini <url>" | yes |
| REQ-PFR-005-002 | Smooth/interaktif: reading ruler, read-wave, masked lines, magnet, Lenis; reduced-motion + non-gating | Confirmed | user: "smooth transition, smooth motion, interactif" + Jev tighten | yes |
| REQ-PFR-005-003 | Teks konten existing tetap ada; 9 test tanpa perubahan asersi | Confirmed | Jev tighten | yes |
| REQ-PFR-005-004 | Angka hanya nyata; kode di stage ilustratif & aria-hidden (dekoratif), bukan klaim metrik | Confirmed | Jev tighten | yes |
| REQ-PFR-005-005 | Kontras dark+amber terverifikasi; a11y standar; build+test exit 0 | Confirmed | Jev tighten | yes |

## Business Rules
- Adaptasi mekanisme referensi (bukan copy konten Sieve); kode stage ilustratif aria-hidden; amber hanya utk flag; reduced-motion fungsional.

## Main Flow
1. Tulis spec + dispatch frontend-developer subagent (permintaan eksplisit user "work with your expert agent").
2. Subagent bangun komponen + CSS + integrasi; wajib build+test lulus sebelum report.
3. QA browser orchestrator + F4 + close.

## Alternative & Failure Flows
- Bila subagent gagal build/test 2x → orchestrator ambil alih bagian yang gagal.
- Bila split-open measurement tidak stabil → fallback tinggi tetap (tanpa measure) dengan konten tetap terbaca.

## Scope
- In: semua komponen visual, CSS, fonts (IBM Plex Mono @fontsource), motion, stage kode, diff-card work, dialog, nav, preloader, cursor.
- Out: konten data, deploy, stack.

## Acceptance Criteria
| ID | Criterion | REQ | Verification |
|---|---|---|---|
| AC-PFR-005-001 | Konsep terpasang: dark monochrome + amber tunggal + code stage + split-open + ruler interaktif; berbeda total dari R1-R5 | REQ-PFR-005-001, REQ-PFR-005-002 | QA browser + screenshot |
| AC-PFR-005-002 | 9/9 test parity lulus tanpa perubahan; build exit 0 | REQ-PFR-005-003 | npm test + build |
| AC-PFR-005-003 | Kontras dark+amber AA terverifikasi; a11y (keyboard/skip/dialog) + non-gating + reduced-motion | REQ-PFR-005-004, REQ-PFR-005-005 | contrast tool + QA |
| AC-PFR-005-004 | Kode stage aria-hidden/ilustratif; angka nyata saja | REQ-PFR-005-004 | baca kode + QA |
| AC-PFR-005-005 | errors=[] & overflow=0 di 1440 & 390 | REQ-PFR-005-005 | QA browser |

## Dependencies & Constraints
- @fontsource/ibm-plex-mono ditambah (ref: IBM Plex Mono); Archivo variable tetap.
- Subagent wajib build+test exit 0 sebelum report; orchestrator QA browser setelahnya.

## Open Questions
None.
