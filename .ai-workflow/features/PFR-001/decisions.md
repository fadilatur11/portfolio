# Decisions — PFR-001: Portfolio redesign: migrate to React+Vite, full UI/UX+motion redesign
<!-- Setiap keputusan penting dibuktikan oleh satu panggilan Jev. Jangan menulis baris dengan tangan:
     panggil tool Jev, lalu `vcw.py decide <ID> --type ... --subject ... --jev-id <id dari hook>`.
     Verdict & Routing disalin dari audit log, bukan dari ingatan. Routing `escalate` = Jev ragu:
     isi Resolution dengan "User: <jawaban>" atau "Manual: <alasan + bukti>". Jev hanya boleh
     memperketat keputusan; ia tidak pernah mengubah Assumed menjadi Confirmed.
     Jenis keputusan: mode · analysis · risk · criticality · rootcause · scope · evidence · severity. -->

## Decisions
| ID | Type | Subject | Jev ID | Verdict | Routing | Resolution |
|---|---|---|---|---|---|---|
| D-001 | mode | PFR-001 execution mode | JEV-20261112-e71c17ad#mode | standard | accept | - |
| D-002 | risk | PFR-001 overall risk | JEV-20261112-e71c17ad#risk | low | accept | - |
| D-003 | analysis | PFR-001 analysis sufficiency | JEV-20261112-66ccd7ef#analysis_sufficient | enough_for_planning | escalate | Manual: struktur existing terbaca penuh + deploy dikenal + aset teridentifikasi; verifikasi deploy produksi = item handoff, bukan blocker planning |
| D-004 | criticality | REQ-PFR-001-001 | JEV-20261112-66ccd7ef#crit_1 | no | accept | - |
| D-005 | criticality | REQ-PFR-001-002 | JEV-20261112-66ccd7ef#crit_2 | no | accept | - |
| D-006 | criticality | REQ-PFR-001-003 | JEV-20261112-66ccd7ef#crit_3 | no | escalate | Manual: bukan critical — keputusan desain (arah konsep adaptasi referensi); tidak menyentuh business/data/permission/cost; non-copy dijaga AC-PFR-001-003. Superseded by D-013 |
| D-007 | criticality | REQ-PFR-001-004 | JEV-20261112-66ccd7ef#crit_4 | no | accept | - |
| D-008 | criticality | REQ-PFR-001-005 | JEV-20261112-66ccd7ef#crit_5 | no | escalate | Manual: bukan critical — requirement konten-parity justru mempertahankan kontrak konten publik; user-confirmed |
| D-009 | criticality | REQ-PFR-001-006 | JEV-20261112-66ccd7ef#crit_6 | no | escalate | Manual: bukan critical — perubahan deploy-pipeline config di situs statis personal, reversible via git; kontrak URL publik dijaga REQ-008 |
| D-010 | criticality | REQ-PFR-001-007 | JEV-20261112-66ccd7ef#crit_7 | no | escalate | Manual: bukan critical per definisi gate (quality constraint, bukan business/data/permission/cost); tetap hard requirement via AC-005/004 |
| D-011 | criticality | REQ-PFR-001-008 | JEV-20261112-66ccd7ef#crit_8 | no | escalate | Manual: bukan critical — menjaga kontrak URL publik (anchor + canonical/OG) tidak berubah |
| D-013 | criticality | REQ-PFR-001-003 | JEV-20261112-0d7d03e5#crit_3_fresh | no | accept | Manual: bukan critical — keputusan desain; non-copy dijaga AC-PFR-001-003. (Catatan: D-012 pernah dibuat sebagai duplikat jawaban D-006 dan dihapus karena invalid) |
| D-014 | scope | PFR-001 final diff vs requirement | JEV-20261112-b7837a8d#scope | in_scope | accept | - |
| D-015 | evidence | AC-PFR-001-001 | JEV-20261112-b7837a8d#ev1 | sufficient | escalate | Manual: bukti objektif — npm run build exit 0 + listing dist/ (index.html+assets+font) tercatat di verification.md |
| D-016 | evidence | AC-PFR-001-002 | JEV-20261112-b7837a8d#ev2 | insufficient | escalate | Manual: verdict insufficient ditindaklanjuti dgn memperkuat bukti — test verbatim parity baru (bio/email/lokasi/availability/CV href/headline) ditambahkan, 9/9 lulus; parity kini assert penuh, bukan inspeksi |
| D-017 | evidence | AC-PFR-001-003 | JEV-20261112-b7837a8d#ev3 | insufficient | escalate | Manual: bukti diperkuat — report F4 tertulis .ui-craft/review-gate.md (6 cek distinctiveness + distance test) + snapshot browser; struktur baru tak ada padanan di situs lama |
| D-018 | evidence | AC-PFR-001-004 | JEV-20261112-b7837a8d#ev4 | sufficient | escalate | Manual: grep motion bersih (exit 1 no-match) + unit test reduced-mode + IO pause terverifikasi — bukti objektif |
| D-019 | evidence | AC-PFR-001-005 | JEV-20261112-b7837a8d#ev5 | insufficient | escalate | Manual: verdict ditindaklanjuti — tab-through keyboard NYATA di browser (skip-link→nav→cta→rows) + 11 kontras tool + target 103px terukur; bukti kini empiris |
| D-020 | evidence | AC-PFR-001-006 | JEV-20261112-b7837a8d#ev6 | insufficient | accept | Manual: AC-006 sebagaimana ditulis (netlify.toml + canonical/og grep + anchor id) terverifikasi lokal; DEPLOY produksi eksplisit dicatat Not Verified + handoff owner — bukan bagian AC lokal |
| D-021 | evidence | AC-PFR-001-007 | JEV-20261112-b7837a8d#ev7 | sufficient | escalate | Manual: QA browser empiris desktop 1440 + mobile 390, overflowX=0, console errors=[] — objektif |
| D-022 | evidence | AC-PFR-001-008 | JEV-20261112-b7837a8d#ev8 | sufficient | escalate | Manual: npm run test exit 0, 9/9 (dinaikkan dari 8 setelah penguatan parity) |
| D-023 | severity | Review findings R1-R8 | JEV-20261112-b7837a8d#sev_findings | not_appropriate | escalate | Manual: R4 diperketat High→Critical (build blocker; Jev hanya memperketat); R1-R3 Critical fixed; R7-R8 accepted dgn justifikasi tertulis di verification.md+review-gate.md |
| D-024 | severity | R1 | JEV-20261112-3b20a80c#r1 | appropriate | escalate | Manual: severity dikalibrasi bersama bukti di verification.md; R1-R4 critical fixed, R5-R8 low fixed/accepted |
| D-025 | severity | R2 | JEV-20261112-3b20a80c#r2 | appropriate | escalate | Manual: severity dikalibrasi bersama bukti di verification.md; R1-R4 critical fixed, R5-R8 low fixed/accepted |
| D-026 | severity | R3 | JEV-20261112-3b20a80c#r3 | appropriate | escalate | Manual: severity dikalibrasi bersama bukti di verification.md; R1-R4 critical fixed, R5-R8 low fixed/accepted |
| D-027 | severity | R4 | JEV-20261112-3b20a80c#r4 | appropriate | escalate | Manual: severity dikalibrasi bersama bukti di verification.md; R1-R4 critical fixed, R5-R8 low fixed/accepted |
| D-028 | severity | R5 | JEV-20261112-3b20a80c#r5 | appropriate | accept | Manual: severity dikalibrasi bersama bukti di verification.md; R1-R4 critical fixed, R5-R8 low fixed/accepted |
| D-029 | severity | R6 | JEV-20261112-3b20a80c#r6 | appropriate | escalate | Manual: severity dikalibrasi bersama bukti di verification.md; R1-R4 critical fixed, R5-R8 low fixed/accepted |
| D-030 | severity | R7 | JEV-20261112-3b20a80c#r7 | appropriate | escalate | Manual: severity dikalibrasi bersama bukti di verification.md; R1-R4 critical fixed, R5-R8 low fixed/accepted |
| D-031 | severity | R8 | JEV-20261112-3b20a80c#r8 | appropriate | escalate | Manual: severity dikalibrasi bersama bukti di verification.md; R1-R4 critical fixed, R5-R8 low fixed/accepted |
