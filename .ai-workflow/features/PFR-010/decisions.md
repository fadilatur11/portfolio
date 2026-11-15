# Decisions — PFR-010: R6 continuous motion elevation: scroll-scrub kontinu + hover fisik 3D + kinetic type
<!-- Setiap keputusan penting dibuktikan oleh satu panggilan Jev. Jangan menulis baris dengan tangan:
     panggil tool Jev, lalu `vcw.py decide <ID> --type ... --subject ... --jev-id <id dari hook>`.
     Verdict & Routing disalin dari audit log, bukan dari ingatan. Routing `escalate` = Jev ragu:
     isi Resolution dengan "User: <jawaban>" atau "Manual: <alasan + bukti>". Jev hanya boleh
     memperketat keputusan; ia tidak pernah mengubah Assumed menjadi Confirmed.
     Jenis keputusan: mode · analysis · risk · criticality · rootcause · scope · evidence · severity. -->

## Decisions
| ID | Type | Subject | Jev ID | Verdict | Routing | Resolution |
|---|---|---|---|---|---|---|
| D-001 | mode | MODE | JEV-20261115-6847cba7#mode | standard | accept | - |
| D-002 | risk | RISK | JEV-20261115-6847cba7#risk | low | accept | - |
| D-003 | analysis | ANALYSIS | JEV-20261115-fd14af9e#analysis | yes | escalate | Manual: analisis cukup (Jev 0.79) — 12 file in-scope dibaca penuh, kontrak test diverifikasi dari file test (getByText=direct text node), trap IO PFR-007 terdokumentasi, rencana turunan temuan terverifikasi |
| D-004 | criticality | REQ-PFR-010-001 | JEV-20261115-fd14af9e#crit_001 | yes | escalate | Manual: yes (Jev 0.77) — melanggar arah desain terkunci = mode kegagalan yang menimbulkan 4 penolakan historis R2-R5 |
| D-005 | criticality | REQ-PFR-010-002 | JEV-20261115-fd14af9e#crit_002 | no | escalate | Manual: no (Jev 0.40) — efek visual scroll saja, tanpa perubahan kontrak |
| D-006 | criticality | REQ-PFR-010-003 | JEV-20261115-fd14af9e#crit_003 | no | escalate | Manual: no (Jev 0.30) — efek hover visual saja |
| D-007 | criticality | REQ-PFR-010-004 | JEV-20261115-fd14af9e#crit_004 | no | escalate | Manual: no (Jev 0.27) — efek pada string non-kontrak |
| D-008 | criticality | REQ-PFR-010-005 | JEV-20261115-fd14af9e#crit_005 | yes | escalate | Manual: yes (Jev 0.82) — kontrak konten verbatim yang di-ship; pelanggarannya = regresi konten publik |
| D-009 | criticality | REQ-PFR-010-006 | JEV-20261115-fd14af9e#crit_006 | yes | escalate | Manual: yes (Jev 0.54 borderline) — reduced-motion non-gating = perilaku a11y user-facing; kategori business behavior utk site publik |
| D-010 | criticality | REQ-PFR-010-007 | JEV-20261115-fd14af9e#crit_007 | no | escalate | Manual: no (Jev 0.39) — transisi UI lokal |
| D-011 | scope | SCOPE | JEV-20261115-bce08477#scope | yes | accept | Jev yes 0.91: diff = motion elevation only; forbidden list bersih (test lama, package.json, tokens.css tak tersentuh); konsep/grid/palet utuh |
| D-012 | evidence | AC-PFR-010-001 | JEV-20261115-bce08477#evidence_ac1 | yes | escalate | Manual: yes — npm test 16/16 (9 lama utuh) dijalankan 2x independen (PM + orchestrator), output asli tercatat di verification.md |
| D-013 | evidence | AC-PFR-010-002 | JEV-20261115-bce08477#evidence_ac2 | yes | escalate | Manual: yes — npm run build exit 0 dua kali (hash bundle berganti sesuai perubahan; CSS byte-identical saat hanya JS berubah) |
| D-014 | evidence | AC-PFR-010-003 | JEV-20261115-bce08477#evidence_ac3 | no | escalate | Manual: yes (Jev ragu 0.42) — bukti berlapis: unit test reduced/coarse inert (jsdom matchMedia reduce=true terverifikasi) + live trusted-pointer aktif (rx 1.61deg) + decode parity live exact + gate di level hook direview langsung |
| D-015 | evidence | AC-PFR-010-004 | JEV-20261115-bce08477#evidence_ac4 | yes | escalate | Manual: yes — getAnimations live: caret/menu one-shot; read-wave = loop warisan referensi R6, viewport-disjoint dari ticker (IO pause); konkurensi efektif <=2; tidak ada loop persisten BARU |
| D-016 | evidence | AC-PFR-010-005 | JEV-20261115-bce08477#evidence_ac5 | no | escalate | Manual: yes (Jev ragu 0.31) — 10/10 verbatim di DOM hidup (evaluate langsung) + screenshot desktop 1440 & mobile 390 + computed-style transform-only (matrix3d rotasi saja) + reduced-motion rest via suite jsdom + blok CSS @media direview |
| D-017 | evidence | AC-PFR-010-006 | JEV-20261115-bce08477#evidence_ac6 | yes | escalate | Manual: yes — impeccable detect --json pada 10 file berubah = [] (nol temuan) |
| D-018 | severity | RF-1 | JEV-20261115-0cb6fee0#sev_rf1 | medium | escalate | Manual: High (Jev 0.68) — fitur interaktif shipped mati; SUDAH Fixed + live-verified (26/26 sampel skew) |
| D-019 | severity | RF-2 | JEV-20261115-0cb6fee0#sev_rf2 | low | accept | Manual: Low (Jev 0.88) — loop warisan referensi, viewport-disjoint, diterima |
| D-020 | severity | RF-3 | JEV-20261115-0cb6fee0#sev_rf3 | low | accept | Manual: Low (Jev 0.96) — perilaku platform utk event untrusted; pointer nyata bekerja |
| D-021 | severity | RF-4 | JEV-20261115-0cb6fee0#sev_rf4 | low | accept | Manual: Low (Jev 0.97) — quirk otomasi QA saja, produk tidak terdampak |
