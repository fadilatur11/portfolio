# Decisions — PFR-004: R5: Color Block Poster (Dribbble-popular formula, light+loud)
<!-- Setiap keputusan penting dibuktikan oleh satu panggilan Jev. Jangan menulis baris dengan tangan:
     panggil tool Jev, lalu `vcw.py decide <ID> --type ... --subject ... --jev-id <id dari hook>`.
     Verdict & Routing disalin dari audit log, bukan dari ingatan. Routing `escalate` = Jev ragu:
     isi Resolution dengan "User: <jawaban>" atau "Manual: <alasan + bukti>". Jev hanya boleh
     memperketat keputusan; ia tidak pernah mengubah Assumed menjadi Confirmed.
     Jenis keputusan: mode · analysis · risk · criticality · rootcause · scope · evidence · severity. -->

## Decisions
| ID | Type | Subject | Jev ID | Verdict | Routing | Resolution |
|---|---|---|---|---|---|---|
| D-001 | mode | PFR-004 execution mode | JEV-20261113-e1e0e26b#mode | standard | accept | - |
| D-002 | risk | PFR-004 overall risk | JEV-20261113-e1e0e26b#risk | low | accept | Manual: skor 0.93 -> sedang (legend 1) |
| D-003 | criticality | REQ-PFR-004-001 | JEV-20261113-e1e0e26b#crit1 | yes | accept | Manual: diterima sbg tighten (load-bearing) sesuai verdict Jev |
| D-004 | criticality | REQ-PFR-004-002 | JEV-20261113-e1e0e26b#crit2 | yes | accept | Manual: diterima sbg tighten (load-bearing) sesuai verdict Jev |
| D-005 | criticality | REQ-PFR-004-003 | JEV-20261113-e1e0e26b#crit3 | yes | accept | Manual: diterima sbg tighten (load-bearing) sesuai verdict Jev |
| D-006 | criticality | REQ-PFR-004-004 | JEV-20261113-e1e0e26b#crit4 | yes | escalate | Manual: diterima sbg tighten (load-bearing) sesuai verdict Jev |
| D-007 | analysis | PFR-004 analysis sufficiency | JEV-20261113-e1e0e26b#analysis | enough | accept | - |
| D-008 | scope | PFR-004 final diff vs requirement | JEV-20261113-05304143#scope | in_scope | accept | Manual: hanya lapisan visual/motion; konten verbatim (9 test tanpa perubahan); tanpa deps baru |
| D-009 | evidence | AC-PFR-004-001 | JEV-20261113-05304143#e1 | sufficient | escalate |Manual: struktur light color-block terverifikasi via screenshot browser (hero poster, stats band, work grid, contact, mobile) + audit distinctiveness di review-gate.md R5 |
| D-010 | evidence | AC-PFR-004-002 | JEV-20261113-05304143#e2 | sufficient | accept | - |
| D-011 | evidence | AC-PFR-004-004 | JEV-20261113-05304143#e4 | sufficient | escalate |Manual: kontras 5 pasangan AA tool + budget 2 loop tercatat + non-gating preloader (interval/timeout) + keyboard audit empiris (19 focusable, skip-link pertama, pill 195x57) |
| D-012 | evidence | AC-PFR-004-005 | JEV-20261113-05304143#e5 | sufficient | accept | - |
| D-013 | evidence | AC-PFR-004-003 | JEV-20261113-05304143#e3 | insufficient | escalate | Manual: verdict ditindaklanjuti — audit keyboard empiris ditambahkan (19 focusable, skip-link pertama, semua pill ≥44px terukur 195x57) melengkapi kontras tool + budget; bukti kini lengkap |
| D-014 | severity | U1 | JEV-20261113-05304143#u1 | appropriate | accept | Manual: dikalibrasi dgn bukti verification.md |
| D-015 | severity | U2 | JEV-20261113-05304143#u2 | appropriate | accept | Manual: dikalibrasi dgn bukti verification.md |
| D-016 | severity | U3 | JEV-20261113-05304143#u3 | appropriate | accept | Manual: dikalibrasi dgn bukti verification.md |
| D-017 | severity | U4 | JEV-20261113-05304143#u4 | appropriate | accept | Manual: dikalibrasi dgn bukti verification.md |
| D-018 | evidence | AC-PFR-004-006 | JEV-20261113-6eb56eed#e6 | sufficient | accept | - |
