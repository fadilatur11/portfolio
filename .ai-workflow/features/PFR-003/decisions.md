# Decisions — PFR-003: Rework total R4: Reels stacked-case structure + Framer Motion
<!-- Setiap keputusan penting dibuktikan oleh satu panggilan Jev. Jangan menulis baris dengan tangan:
     panggil tool Jev, lalu `vcw.py decide <ID> --type ... --subject ... --jev-id <id dari hook>`.
     Verdict & Routing disalin dari audit log, bukan dari ingatan. Routing `escalate` = Jev ragu:
     isi Resolution dengan "User: <jawaban>" atau "Manual: <alasan + bukti>". Jev hanya boleh
     memperketat keputusan; ia tidak pernah mengubah Assumed menjadi Confirmed.
     Jenis keputusan: mode · analysis · risk · criticality · rootcause · scope · evidence · severity. -->

## Decisions
| ID | Type | Subject | Jev ID | Verdict | Routing | Resolution |
|---|---|---|---|---|---|---|
| D-001 | mode | PFR-003 execution mode | JEV-20261113-84398d81#mode | standard | accept | - |
| D-002 | risk | PFR-003 overall risk | JEV-20261113-84398d81#risk | low | accept | Manual: skor 1.08 dibulatkan ke 1 (sedang) sesuai legend |
| D-003 | criticality | REQ-PFR-003-001 | JEV-20261113-84398d81#crit1 | no | escalate | Manual: crit2-5 diterima sebagai TIGHTEN (load-bearing: engine, parity, non-gating, a11y); crit1 = keputusan desain, bukan critical |
| D-004 | criticality | REQ-PFR-003-002 | JEV-20261113-84398d81#crit2 | yes | accept | Manual: crit2-5 diterima sebagai TIGHTEN (load-bearing: engine, parity, non-gating, a11y); crit1 = keputusan desain, bukan critical |
| D-005 | criticality | REQ-PFR-003-003 | JEV-20261113-84398d81#crit3 | yes | accept | Manual: crit2-5 diterima sebagai TIGHTEN (load-bearing: engine, parity, non-gating, a11y); crit1 = keputusan desain, bukan critical |
| D-006 | criticality | REQ-PFR-003-004 | JEV-20261113-84398d81#crit4 | yes | accept | Manual: crit2-5 diterima sebagai TIGHTEN (load-bearing: engine, parity, non-gating, a11y); crit1 = keputusan desain, bukan critical |
| D-007 | criticality | REQ-PFR-003-005 | JEV-20261113-84398d81#crit5 | yes | accept | Manual: crit2-5 diterima sebagai TIGHTEN (load-bearing: engine, parity, non-gating, a11y); crit1 = keputusan desain, bukan critical |
| D-008 | analysis | PFR-003 analysis sufficiency | JEV-20261113-84398d81#analysis | not_enough | escalate | Manual: riset cukup utk planning; ketidakpastian tersisa (framer-motion x React19, sync Lenis) ditutup empiris saat install+QA; fallback: tetap GSAP utk scroll wiring bila gagal |
| D-009R | scope | PFR-003 final diff vs requirement | JEV-20261113-f655ece7#scope | in_scope | escalate |Manual: diff selaras requirement — hanya lapisan struktur/visual/motion/deps; konten & deploy & kontrak URL tidak disentuh (dibuktikan 9 test parity tanpa perubahan) |
| D-010R | evidence | AC-PFR-003-001 | JEV-20261113-f655ece7#e1 | sufficient | escalate |Manual: struktur stacked-scenes terverifikasi empiris via screenshot browser (kartu dim+scale di bawah kartu berikutnya) + audit distinctiveness di review-gate.md §R4 |
| D-011R | evidence | AC-PFR-003-002 | JEV-20261113-f655ece7#e2 | sufficient | escalate |Manual: framer-motion@14.13.0 di deps, gsap hilang dari lockfile, build sukses, animasi jalan (preloader/hover/whileInView terlihat di QA) |
| D-012 | evidence | AC-PFR-003-003 | JEV-20261113-f655ece7#e3 | sufficient | accept | - |
| D-013R | evidence | AC-PFR-003-004 | JEV-20261113-f655ece7#e4 | sufficient | escalate |Manual: konten selalu di DOM saat preloader aktif (terukur heroInDom=true); jalur reduced = test 9/9 tanpa preloader; T1 fixed dgn timer independen-rAF |
| D-014 | evidence | AC-PFR-003-005 | JEV-20261113-f655ece7#e5 | insufficient | accept | Manual: verdict insufficient ditindaklanjuti — shade dinaikkan 0.82→0.88 (kontras komposit worst-case dihitung 6.07:1 AA), tab-through terukur (19 focusable, skip-link pertama, reel-open reachable), target reel-open 142x44px terukur; bukti kini empiris lengkap |
| D-016 | severity | T1 | JEV-20261113-b6aba672#t1 | appropriate | accept | Manual: dikalibrasi dgn bukti di verification.md PFR-003 |
| D-017 | severity | T2 | JEV-20261113-b6aba672#t2 | appropriate | escalate | Manual: dikalibrasi dgn bukti di verification.md PFR-003 |
| D-018 | severity | T3 | JEV-20261113-b6aba672#t3 | appropriate | accept | Manual: dikalibrasi dgn bukti di verification.md PFR-003 |
| D-019 | severity | T4 | JEV-20261113-b6aba672#t4 | appropriate | escalate | Manual: dikalibrasi dgn bukti di verification.md PFR-003 |
