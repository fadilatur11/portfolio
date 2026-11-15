---
artifact: prd-lite
feature: PFR-006
title: Polish R6: proporsi + copywriting refinement
type: feature
mode: standard
state: COMPLETED
approval: draft
approved_by:
created: 2026-11-13
---
# PRD Lite — PFR-006: Polish R6 (proporsi + copy)

## Summary
Refinement pass di atas R6 (konsep tetap): perbaiki proporsi yang kurang pas (spacing/ukuran/alignment terukur) dan sempurnakan copywriting semua kalimat yang tampil, tanpa mengubah konsep/konten-data/stack.

## Problem Statement
User: "masih ada beberapa kurang proporsional, kalimat2 juga disesuaikan dengan sempurna."

## Requirements
| ID | Requirement | Status | Source | Critical |
|---|---|---|---|---|
| REQ-PFR-006-001 | Proporsi diperbaiki berdasar audit terukur (bukan tebakan) | Confirmed | user: "kurang proporsional" | yes |
| REQ-PFR-006-002 | Semua copy tampil ditinjau & diperhalus; test-asserted strings tetap ada ('Digital craft,', 'engineered.', dll) | Confirmed | user: "kalimat2... sesuaikan dengan sempurna" + parity kontrak | yes |
| REQ-PFR-006-003 | Build+test exit 0; QA overflow/console bersih | Confirmed | standar | no |

## Actors
Pengunjung/rekruter; owner.

## Acceptance Criteria
| ID | Criterion | REQ | Verification |
|---|---|---|---|
| AC-PFR-006-001 | Temuan audit proporsi (list spesifik) semuanya diperbaiki; QA screenshot post-fix | REQ-PFR-006-001 | browser QA |
| AC-PFR-006-002 | Copy baru konsisten & profesional; 9/9 test tetap lulus; build exit 0 | REQ-PFR-006-002 | npm test/build |
| AC-PFR-006-003 | errors=[] overflow=0 1440+390 | REQ-PFR-006-003 | QA |

## Business Rules
- String yang di-assert test TIDAK dihapus; hanya reposisi/penempatan.

## Main Flow
Audit terukur → fix list → implement → QA → close.

## Alternative & Failure Flows
Bila perubahan copy menyentuh string test → alternatif penempatan, BUKAN ubah test.

## Goals
- R6 terasa proporsional dan copy-nya tajam di semua breakpoint.

## Scope
In: CSS spacing/scale/alignment, copy strings non-test & penempatan test-strings, komponen teks. Out: konsep, data, stack, deploy.

## Open Questions
None.
## Dependencies & Constraints
- Tanpa deps baru; tanpa perubahan test; framer/lenis tetap.
