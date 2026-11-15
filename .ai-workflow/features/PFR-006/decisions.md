# Decisions — PFR-006: Polish R6: proporsi + copywriting refinement
<!-- Setiap keputusan penting dibuktikan oleh satu panggilan Jev. Jangan menulis baris dengan tangan:
     panggil tool Jev, lalu `vcw.py decide <ID> --type ... --subject ... --jev-id <id dari hook>`.
     Verdict & Routing disalin dari audit log, bukan dari ingatan. Routing `escalate` = Jev ragu:
     isi Resolution dengan "User: <jawaban>" atau "Manual: <alasan + bukti>". Jev hanya boleh
     memperketat keputusan; ia tidak pernah mengubah Assumed menjadi Confirmed.
     Jenis keputusan: mode · analysis · risk · criticality · rootcause · scope · evidence · severity. -->

## Decisions
| ID | Type | Subject | Jev ID | Verdict | Routing | Resolution |
|---|---|---|---|---|---|---|
| D-001 | mode | PFR-006 execution mode | JEV-20261113-29f06fc6#mode | fast | escalate | Manual: Fast diterima — polish kecil di atas konsep COMPLETED; item tetap dipakai utk jejak |
| D-002 | risk | PFR-006 overall risk | JEV-20261113-29f06fc6#risk | low | accept | - |
| D-003 | criticality | REQ-PFR-006-001 | JEV-20261113-29f06fc6#crit1 | no | escalate | Manual: bukan critical per definisi gate (visual polish) |
| D-004 | criticality | REQ-PFR-006-002 | JEV-20261113-29f06fc6#crit2 | no | escalate | Manual: bukan critical — copy polish; parity test tetap kontrak |
| D-005 | criticality | REQ-PFR-006-003 | JEV-20261113-29f06fc6#crit3 | yes | escalate | Manual: diterima sbg tighten (build+test exit 0 wajib) |
| D-006 | analysis | PFR-006 analysis sufficiency | JEV-20261113-29f06fc6#analysis | enough | escalate | Manual: audit terukur dilakukan sebelum edit |
| D-007 | scope | PFR-006 final diff vs requirement | JEV-20261113-c889dd6d#scope | in_scope | accept | - |
| D-008 | evidence | AC-PFR-006-001 | JEV-20261113-c889dd6d#e1 | sufficient | accept | - |
| D-009 | evidence | AC-PFR-006-002 | JEV-20261113-c889dd6d#e2 | sufficient | accept | - |
| D-010 | evidence | AC-PFR-006-003 | JEV-20261113-c889dd6d#e3 | sufficient | accept | - |
| D-011 | severity | W1 | JEV-20261113-c889dd6d#sev | appropriate | escalate | Manual: W1 Medium fixed; W2 Low accepted — verification.md |
| D-012 | severity | W2 | JEV-20261113-e0b7a386#w2 | appropriate | accept | Manual: by-design mono meta strip, konsisten konsep |
