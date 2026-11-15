---
artifact: prd-lite
feature: PFR-004
title: R5: Color Block Poster (Dribbble-popular formula, light+loud)
type: feature
mode: standard
state: COMPLETED
approval: draft
approved_by:
created: 2026-11-13
---
# PRD Lite — PFR-004: R5 "Color Block Poster" — formula Dribbble-popular (light + loud)

## Summary
Rework ke-5: dari dark/restrained → **terang & berani** sesuai bukti Dribbble-popular (6 shot teratas dilihat langsung): blok biru periwinkle pekat, nama = poster raksasa, sticker lime/kuning, stats nyata, marquee skills, kartu proyek color-block dgn hover lift. Framer Motion tetap; konten verbatim; 9 test tanpa perubahan.

## Problem Statement
3 konsep dark/restrained ditolak user ("jelek banget", "tidak kaku"→"lebih creative"). Bukti visual: shot populer Dribbble = warna pekat + poster type + sticker + stats + personality. Build lama kekurangan: nama tidak pernah jadi poster, tanpa sticker, tanpa stats, monokrom.

## Goals
- Tampilan yang terasa seperti shot Dribbble populer: percaya diri, berwarna, penuh personality — dan profesional.
- Motion penuh (framer) tanpa menggate konten.

## Actors
Pengunjung/rekruter; owner sebagai maintainer.

## Requirements
| ID | Requirement | Status | Source | Critical |
|---|---|---|---|---|
| REQ-PFR-004-001 | Palet light color-block (cream/white + blue #4F5FE8 + lime #D9F542) + hero poster nama raksasa + sticker + stats | Confirmed | user pilih opsi A 2026-11-13; bukti s2 229♥/193k views | yes |
| REQ-PFR-004-002 | Konten parity verbatim; 9 test tanpa perubahan asersi | Confirmed | user-confirmed R2 (REQ-005 PFR-001) + Jev tighten | yes |
| REQ-PFR-004-003 | Angka stats hanya dari konten nyata (4+ thn, 6 featured, 7 arsip) — tanpa fabrikasi | Confirmed | AGENTS.md anti-fabrikasi + Jev tighten | yes |
| REQ-PFR-004-004 | Kontras AA palet baru + a11y standar + budget motion (max 2 loop, non-gating) | Confirmed | kontras terverifikasi tool 2026-11-13; Jev tighten | yes |

## Business Rules
- Non-copy 1:1 shot Dribbble (formula diadaptasi: warna/type/sticker = konvensi, komposisi milik owner); konten nyata saja; animasi non-gating.

## Main Flow
1. tokens + main.css rewrite (light color-block).
2. Hero poster (marquee strip + nama raksasa + monogram + sticker spin) + StatsBand count-up.
3. Work grid color-block + restyle section lain + dialog light.
4. QA + F4 + close.

## Alternative & Failure Flows
- Bila white-on-blue gagal AA di konteks nyata → darken blue step (terverifikasi 5.08 AA pada #4F5FE8).
- Bila user menolak lagi → eskalasi: minta 1-2 contoh link Dribbble spesifik yang disukai user.

## Scope
- In: tokens/main.css/Hero/StatsBand/Work/restyle sections/dialog/nav/preloader/cursor.
- Out: konten, data, deploy, stack.

## Acceptance Criteria
| ID | Criterion | REQ | Verification |
|---|---|---|---|
| AC-PFR-004-001 | Palet light color-block terpasang; hero = nama poster raksasa + monogram + sticker; terlihat sama sekali beda dari R2-R4 (dark) | REQ-PFR-004-001 | QA browser screenshot |
| AC-PFR-004-002 | Semua teks existing ada; 9/9 test lulus tanpa perubahan asersi; build exit 0 | REQ-PFR-004-002 | npm test + build |
| AC-PFR-004-004 | Kontras 6 pasangan baru AA terverifikasi; budget 2 loop; non-gating preloader tetap | REQ-PFR-004-004 | contrast ledger + QA |
| AC-PFR-004-005 | Stats hanya angka nyata (4+, 6, 7) dgn count-up | REQ-PFR-004-003 | baca StatsBand.jsx + QA |
| AC-PFR-004-006 | errors=[] + overflowX=0 di 1440 & 390; dialog/nav/preloader fungsional | REQ-PFR-004-004 | QA browser terukur |
| AC-PFR-004-004 | errors=[] + overflow=0 di 1440 & 390; dialog/nav/preloader fungsional | REQ-PFR-004-004 | QA browser |

## Dependencies & Constraints
- framer-motion@14.13.0 + lenis tetap; tanpa deps baru.
- Kontras terverifikasi: white-on-blue 5.08, ink-on-lime 15.45, ink-on-white 18.98, ink-on-cream 16.94; lime-on-blue 4.13 = display-large only.

## Open Questions
None — arah terkunci user.
