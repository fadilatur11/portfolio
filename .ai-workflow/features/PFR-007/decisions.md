# Decisions — PFR-007: R6c: Full-motion pass (transisi+animasi semua section)
<!-- Setiap keputusan penting dibuktikan oleh satu panggilan Jev. Jangan menulis baris dengan tangan:
     panggil tool Jev, lalu `vcw.py decide <ID> --type ... --subject ... --jev-id <id dari hook>`.
     Verdict & Routing disalin dari audit log, bukan dari ingatan. Routing `escalate` = Jev ragu:
     isi Resolution dengan "User: <jawaban>" atau "Manual: <alasan + bukti>". Jev hanya boleh
     memperketat keputusan; ia tidak pernah mengubah Assumed menjadi Confirmed.
     Jenis keputusan: mode · analysis · risk · criticality · rootcause · scope · evidence · severity. -->

## Decisions
| ID | Type | Subject | Jev ID | Verdict | Routing | Resolution |
|---|---|---|---|---|---|---|
| D-001 | mode | PFR-007 execution mode | JEV-20261113-f5735baa#mode | deep | escalate | Manual: Deep ditolak per definisi gate (kriteria Deep: auth/data/kontrak publik/integrasi kritis — tidak ada yang tersentuh oleh motion pass); Standard = ceiling yang tepat (banyak file + hooks scroll-driven) |
| D-002 | risk | PFR-007 overall risk | JEV-20261113-f5735baa#risk | medium | escalate | Manual: sedang (banyak file, rollback git mudah) |
| D-003 | criticality | REQ-PFR-007-001 | JEV-20261113-f5735baa#crit1 | yes | accept | Manual: diterima sbg tighten (load-bearing: motion penuh, budget/non-gating, exit 0) |
| D-004 | criticality | REQ-PFR-007-002 | JEV-20261113-f5735baa#crit2 | yes | accept | Manual: diterima sbg tighten (load-bearing: motion penuh, budget/non-gating, exit 0) |
| D-005 | criticality | REQ-PFR-007-003 | JEV-20261113-f5735baa#crit3 | yes | accept | Manual: diterima sbg tighten (load-bearing: motion penuh, budget/non-gating, exit 0) |
| D-006 | analysis | PFR-007 analysis sufficiency | JEV-20261113-f5735baa#analysis | enough | escalate |Manual: audit motion existing dilakukan (ruler/wave/magnet/intro ada); yang kurang = entrance section, scroll-driven, dialog transition — cukup utk implementasi |
| D-007 | scope | PFR-007 final diff vs requirement | JEV-20261113-19e2cbab#scope | in_scope | accept | - |
| D-008 | evidence | AC-PFR-007-001 | JEV-20261113-19e2cbab#e1 | sufficient | escalate |Manual: entrance/scroll-driven/dialog terverifikasi dua sumber — subagent 43/43 headless (termasuk mid-opacity transisi dialog 0.81→1) + orchestrator screenshot terukur (drift, parallax, cards opacity 1) |
| D-009 | evidence | AC-PFR-007-002 | JEV-20261113-19e2cbab#e2 | sufficient | accept | - |
| D-010 | evidence | AC-PFR-007-003 | JEV-20261113-19e2cbab#e3 | sufficient | accept |Manual: reduced-motion emulasi rest-state 43/43 + loop tetap 2 + hanya transform/opacity/clip/filter (audit easing 31 titik oleh subagent) |
| D-011 | evidence | AC-PFR-007-004 | JEV-20261113-19e2cbab#e4 | sufficient | accept |Manual: errors=[] dan overflowX=0 terukur di 1440 dan 390 oleh dua QA independen |
| D-012 | severity | X1 | JEV-20261113-19e2cbab#sev | appropriate | accept | Manual: X1-X3 Low accepted — terdokumentasi di verification.md (degrade graceful; IO Chrome behavior; pre-existing favicon 404) |
| D-013 | severity | X2 | JEV-20261113-639b85d6#x2 | appropriate | accept | Manual: dikalibrasi dgn bukti verification.md |
| D-014 | severity | X3 | JEV-20261113-639b85d6#x3 | appropriate | accept | Manual: pre-existing, bukan regressi |
