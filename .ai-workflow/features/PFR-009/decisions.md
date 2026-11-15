# Decisions — PFR-009: R6e: Craft elevation pass (standar eksekusi = referensi Sieve)
<!-- Setiap keputusan penting dibuktikan oleh satu panggilan Jev. Jangan menulis baris dengan tangan:
     panggil tool Jev, lalu `vcw.py decide <ID> --type ... --subject ... --jev-id <id dari hook>`.
     Verdict & Routing disalin dari audit log, bukan dari ingatan. Routing `escalate` = Jev ragu:
     isi Resolution dengan "User: <jawaban>" atau "Manual: <alasan + bukti>". Jev hanya boleh
     memperketat keputusan; ia tidak pernah mengubah Assumed menjadi Confirmed.
     Jenis keputusan: mode · analysis · risk · criticality · rootcause · scope · evidence · severity. -->

## Decisions
| ID | Type | Subject | Jev ID | Verdict | Routing | Resolution |
|---|---|---|---|---|---|---|
| D-001 | mode | PFR-009 execution mode | JEV-20261113-d2d4dbbc#mode | standard | escalate | Manual: standard diterima (craft CSS banyak file + markup kartu) |
| D-002 | risk | PFR-009 overall risk | JEV-20261113-d2d4dbbc#risk | high | escalate | Manual: verdict high ditolak per DEFINISI gate (high = kehilangan data/downtime kritis/kontrak sulit dibalik — tidak ada yang tersentuh; situs statis git-tracked, rollback mudah); efektif = medium |
| D-003 | criticality | REQ-PFR-009-001 | JEV-20261113-d2d4dbbc#crit1 | yes | accept | Manual: diterima sbg tighten (craft standar referensi = inti keluhan user) |
| D-004 | criticality | REQ-PFR-009-002 | JEV-20261113-d2d4dbbc#crit2 | yes | escalate | Manual: diterima sbg tighten (craft standar referensi = inti keluhan user) |
| D-005 | criticality | REQ-PFR-009-003 | JEV-20261113-d2d4dbbc#crit3 | yes | escalate | Manual: diterima sbg tighten (craft standar referensi = inti keluhan user) |
| D-006 | criticality | REQ-PFR-009-004 | JEV-20261113-d2d4dbbc#crit4 | yes | escalate | Manual: diterima sbg tighten (craft standar referensi = inti keluhan user) |
| D-007 | analysis | PFR-009 analysis sufficiency | JEV-20261113-d2d4dbbc#analysis | enough | accept | - |
| D-008 | scope | PFR-009 final diff vs requirement | JEV-20261113-2129b76f#scope | in_scope | accept | Manual: hanya lapisan craft + art direction; konsep/konten/data tetap |
| D-009 | evidence | AC-PFR-009-001 | JEV-20261113-2129b76f#e1 | sufficient | accept | - |
| D-010 | evidence | AC-PFR-009-002 | JEV-20261113-2129b76f#e2 | sufficient | escalate |Manual: 6 gambar di-crop chrome per-gambar (map zoom/offset diukur dari tiap source; javamifi ditune 3.9→4.6% setelah QA visual) + plate frame premium, diverifikasi screenshot headless subagent pada 3 viewport |
| D-011 | evidence | AC-PFR-009-003 | JEV-20261113-2129b76f#e3 | sufficient | escalate |Manual: premium formula computed-style terverifikasi orchestrator — hairline inset + 0 24px 48px -28px deep shadow persis referensi; selection amber + scrollbar thin dark + grain .07 overlay |
| D-012 | evidence | AC-PFR-009-004 | JEV-20261113-2129b76f#e4 | sufficient | escalate |Manual: 9/9 test dua sumber + overflow 0 di 1440/390/1920 + reduced-motion rest-state (subagent emulasi) |
| D-013 | severity | AA1 | JEV-20261113-2129b76f#sev | appropriate | escalate | Manual: AA1-AA3 Low accepted — terdokumentasi di verification.md |
| D-014 | severity | AA2 | JEV-20261113-d9f61858#aa2 | appropriate | escalate | Manual: pre-existing, dipertahankan sesuai constraint |
| D-015 | severity | AA3 | JEV-20261113-d9f61858#aa3 | appropriate | escalate | Manual: judgment call terdokumentasi |
