# Decisions — PFR-002: Redesign R3: full-motion cinematic concept (T1 rejected by user)
<!-- Setiap keputusan penting dibuktikan oleh satu panggilan Jev. Jangan menulis baris dengan tangan:
     panggil tool Jev, lalu `vcw.py decide <ID> --type ... --subject ... --jev-id <id dari hook>`.
     Verdict & Routing disalin dari audit log, bukan dari ingatan. Routing `escalate` = Jev ragu:
     isi Resolution dengan "User: <jawaban>" atau "Manual: <alasan + bukti>". Jev hanya boleh
     memperketat keputusan; ia tidak pernah mengubah Assumed menjadi Confirmed.
     Jenis keputusan: mode · analysis · risk · criticality · rootcause · scope · evidence · severity. -->

## Decisions
| ID | Type | Subject | Jev ID | Verdict | Routing | Resolution |
|---|---|---|---|---|---|---|
| D-001 | mode | PFR-002 execution mode | JEV-20261112-cda0af63#mode | standard | escalate | Manual: scaffold/konten/deploy tetap; perubahan = lapisan visual+motion di repo git yang sama — standard |
| D-002 | risk | PFR-002 overall risk | JEV-20261112-cda0af63#risk | low | accept | Manual: sesuai legend Jev sendiri (1 = sedang, rollback git mudah) |
| D-003 | scope | PFR-002 final diff vs requirement | JEV-20261112-8584fa4f#scope | in_scope | accept | - |
| D-004 | evidence | AC-PFR-002-001 | JEV-20261112-8584fa4f#ev1 | sufficient | escalate | Manual: bukti objektif — struktur scene-morph/glass/pill tanpa padanan T1; signature di hero + echo 3 section; cek distinctiveness 6 poin di review-gate.md |
| D-005 | evidence | AC-PFR-002-002 | JEV-20261112-8584fa4f#ev2 | sufficient | accept | - |
| D-006 | evidence | AC-PFR-002-003 | JEV-20261112-8584fa4f#ev3 | sufficient | accept | - |
| D-007 | evidence | AC-PFR-002-004 | JEV-20261112-8584fa4f#ev4 | sufficient | accept | - |
| D-008 | evidence | AC-PFR-002-005 | JEV-20261112-8584fa4f#ev5 | sufficient | accept | - |
| D-009 | severity | Review findings S1-S4 | JEV-20261112-8584fa4f#sev | appropriate | escalate | Manual: S1-S2 High = fail own thesis (hero tanpa ukuran display; signature no-op) — fixed; S3-S4 Low accepted dgn justifikasi tertulis di verification.md |
| D-010 | analysis | PFR-002 completion evidence sufficiency | JEV-20261112-950adf44#analysis_complete | sufficient | accept | - |
| D-011 | criticality | REQ-PFR-002-001 | JEV-20261112-e19f5253#c1 | no | accept | Manual: bukan critical per definisi gate — lapisan visual/motion di repo git sama, konten & kontrak URL & stack tidak berubah; REQ-003/004 justru menjaga kontrak |
| D-012 | criticality | REQ-PFR-002-002 | JEV-20261112-e19f5253#c2 | no | accept | Manual: bukan critical per definisi gate — lapisan visual/motion di repo git sama, konten & kontrak URL & stack tidak berubah; REQ-003/004 justru menjaga kontrak |
| D-013 | criticality | REQ-PFR-002-003 | JEV-20261112-e19f5253#c3 | no | escalate | Manual: bukan critical per definisi gate — lapisan visual/motion di repo git sama, konten & kontrak URL & stack tidak berubah; REQ-003/004 justru menjaga kontrak |
| D-014 | criticality | REQ-PFR-002-004 | JEV-20261112-e19f5253#c4 | no | escalate | Manual: bukan critical per definisi gate — lapisan visual/motion di repo git sama, konten & kontrak URL & stack tidak berubah; REQ-003/004 justru menjaga kontrak |
| D-015 | criticality | REQ-PFR-002-005 | JEV-20261112-e19f5253#c5 | no | accept | Manual: bukan critical per definisi gate — lapisan visual/motion di repo git sama, konten & kontrak URL & stack tidak berubah; REQ-003/004 justru menjaga kontrak |
| D-016 | severity | S1 | JEV-20261112-9dec01c8#s1 | appropriate | accept | Manual: dikalibrasi dgn bukti di verification.md PFR-002 |
| D-017 | severity | S2 | JEV-20261112-9dec01c8#s2 | appropriate | escalate | Manual: dikalibrasi dgn bukti di verification.md PFR-002 |
| D-018 | severity | S3 | JEV-20261112-9dec01c8#s3 | appropriate | accept | Manual: dikalibrasi dgn bukti di verification.md PFR-002 |
| D-019 | severity | S4 | JEV-20261112-9dec01c8#s4 | appropriate | accept | Manual: dikalibrasi dgn bukti di verification.md PFR-002 |
