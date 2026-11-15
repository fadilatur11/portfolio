---
artifact: prd-lite
feature: PFR-008
title: R6d: remove work modal (arah eksplisit user) + proporsi kartu
type: feature
mode: standard
state: COMPLETED
approval: draft
approved_by:
created: 2026-11-13
---
# PRD Lite — PFR-008: Remove work modal + proporsi kartu (arah eksplisit user)

## Summary
User: modal tidak perlu saat work di-select; kartu tidak perlu bisa di-select; proporsi diperbaiki. Implementasi: hapus ProjectDialog, kartu jadi artikel non-interaktif dengan desc tampil (line-clamp), re-balance proporsi kartu, test dialog di-update MENCERMINKAN requirement baru (didokumentasikan).

## Problem Statement
Modal tidak dibutuhkan user; kartu kurang proporsional (audit terukur: 639x510 seragam, image 78% tinggi kartu, desc tidak tampil di kartu — hanya di modal).

## Goals
Kartu work informatif tanpa modal, proporsional di semua breakpoint.

## Actors
Pengunjung/rekruter; owner.

## Requirements
| ID | Requirement | Status | Source | Critical |
|---|---|---|---|---|
| REQ-PFR-008-001 | Modal dihapus; kartu non-interaktif; desc proyek tampil di kartu | Confirmed | user: "ketika work di select g perlu ada modal... g perlu ada itu" | yes |
| REQ-PFR-008-002 | Proporsi kartu proporsional (image ratio + ruang meta/desc seimbang) | Confirmed | user: "yang kamu buat g proporsional"; audit terukur | yes |
| REQ-PFR-008-003 | Test dialog di-update mencerminkan requirement baru (terdokumentasi); asersi parity lain TIDAK berubah; build+test exit 0 | Confirmed | Jev tighten | yes |

## Business Rules
- Konten desc tetap verbatim dari data; tanpa konten baru; motion reveal kartu dipertahankan.

## Main Flow
1. Edit Work.jsx (hapus dialog/button/hint, tambah desc) + CSS proporsi + hapus ProjectDialog.jsx.
2. Update app.test.jsx (blok dialog → blok kartu non-interaktif) — didokumentasikan.
3. Build+test+QA+close.

## Alternative & Failure Flows
- Bila desc membuat kartu tidak seimbang → line-clamp 3.

## Scope
- In: Work.jsx, main.css, ProjectDialog.jsx (dihapus), src/__tests__/app.test.jsx (blok dialog saja).
- Out: data, konsep, stack, deploy.

## Acceptance Criteria
| ID | Criterion | REQ | Verification |
|---|---|---|---|
| AC-PFR-008-001 | Tidak ada dialog/button di kartu; desc featured[0] tampil di kartu | REQ-PFR-008-001 | QA + DOM |
| AC-PFR-008-002 | Proporsi kartu: image ~16/9, ruang teks cukup, tinggi kartu konsisten | REQ-PFR-008-002 | ukur DOM |
| AC-PFR-008-003 | npm test exit 0 (test baru mencerminkan requirement) + build exit 0; asersi parity lain tak berubah | REQ-PFR-008-003 | npm test/build |

## Dependencies & Constraints
- Tanpa deps baru; framer/lenis tetap; test parity lain (bio/email/heading/arsip) tidak boleh berubah.

## Open Questions
None.
