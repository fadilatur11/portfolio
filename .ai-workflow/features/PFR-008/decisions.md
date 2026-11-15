# Decisions — PFR-008: R6d: remove work modal (arah eksplisit user) + proporsi kartu
<!-- Setiap keputusan penting dibuktikan oleh satu panggilan Jev. Jangan menulis baris dengan tangan:
     panggil tool Jev, lalu `vcw.py decide <ID> --type ... --subject ... --jev-id <id dari hook>`.
     Verdict & Routing disalin dari audit log, bukan dari ingatan. Routing `escalate` = Jev ragu:
     isi Resolution dengan "User: <jawaban>" atau "Manual: <alasan + bukti>". Jev hanya boleh
     memperketat keputusan; ia tidak pernah mengubah Assumed menjadi Confirmed.
     Jenis keputusan: mode · analysis · risk · criticality · rootcause · scope · evidence · severity. -->

## Decisions
| ID | Type | Subject | Jev ID | Verdict | Routing | Resolution |
|---|---|---|---|---|---|---|
| D-001 | mode | PFR-008 execution mode | JEV-20261113-3d775974#mode | standard | accept | - |
| D-002 | risk | PFR-008 overall risk | JEV-20261113-3d775974#risk | low | escalate | Manual: low diterima (rollback git) |
| D-003 | criticality | REQ-PFR-008-001 | JEV-20261113-3d775974#crit1 | yes | escalate | Manual: diterima sbg tighten — permintaan eksplisit user |
| D-004 | criticality | REQ-PFR-008-002 | JEV-20261113-3d775974#crit2 | yes | escalate | Manual: diterima sbg tighten — permintaan eksplisit user |
| D-005 | criticality | REQ-PFR-008-003 | JEV-20261113-3d775974#crit3 | yes | escalate | Manual: diterima sbg tighten — permintaan eksplisit user |
| D-006 | analysis | PFR-008 analysis sufficiency | JEV-20261113-3d775974#analysis | not_enough | escalate | Manual: audit terukur SUDAH dilakukan sebelum keputusan: kartu 639x510 seragam, image 78% tinggi kartu, desc tidak ada di kartu (hanya modal), kartu = button; analisis cukup |
| D-007 | scope | PFR-008 final diff vs requirement | JEV-20261113-ca80195e#scope | in_scope | accept | - |
| D-008 | evidence | AC-PFR-008-001 | JEV-20261113-ca80195e#e1 | sufficient | escalate |Manual: terverifikasi DOM noDialog/noButton/descOnCard=true + screenshot kartu proporsional |
| D-009 | evidence | AC-PFR-008-002 | JEV-20261113-ca80195e#e2 | sufficient | accept | - |
| D-010 | evidence | AC-PFR-008-003 | JEV-20261113-ca80195e#e3 | sufficient | accept | - |
| D-011 | severity | Y1 | JEV-20261113-2810ab2d#y1 | appropriate | escalate | Manual: perubahan test mencerminkan requirement change eksplisit user (hapus modal); terdokumentasi di decisions + verification + memory |
| D-012 | severity | Y2 | JEV-20261113-67be21b7#y2 | appropriate | accept | Manual: by-design sesuai permintaan eksplisit user |
