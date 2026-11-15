# Implementation Plan — PFR-010: R6 continuous motion elevation

## Affected Areas
<!-- Hook Edit/Write + scope-check memakai daftar ini; file di luar daftar = di luar scope. -->
- `src/lib/motion.js` — preset motion baru (skew, scrub) untuk konsumsi lintas komponen; satu sumber curve/stagger.
- `src/hooks/useTilt.js` — NEW: 3D tilt + pointer-glow CSS vars (fine-pointer, reduced-motion no-op).
- `src/hooks/useDecodeText.js` — NEW: decode/scramble one-shot (no-op tanpa IO / reduced).
- `src/components/ScrollProgress.jsx` — NEW: bar amber 2px, scaleX scrub + spring, aria-hidden.
- `src/App.jsx` — pasang ScrollProgress + AnimatePresence untuk exit preloader.
- `src/components/CustomCursor.jsx` — tambah glow layer spring-lagged (fine-pointer only).
- `src/components/Preloader.jsx` — struktur panel untuk exit-wipe.
- `src/components/Hero.jsx` — decode pada hero-kicker; caret intro 4-blink.
- `src/components/Work.jsx` — tilt+glow+inner parallax per case card (useTilt); velocity skew ticker.
- `src/components/ProfileSection.jsx` — JSDoc block scrub scroll-driven (teks single node utuh).
- `src/components/Cv.jsx` — glow + scale hover (CSS vars, tanpa ubah text node).
- `src/components/Contact.jsx` — struktur hover fill-wipe email (text node utuh).
- `src/styles/main.css` — implementasi CSS semua efek + hover micro + mobile-menu keyframe; tanpa ubah token palet.
- `src/__tests__/motion.test.jsx` — NEW: test unit efek baru (AC-003).
- `.ai-workflow/features/PFR-010/*` — ledger (requirement/plan/verification) — bukan kode.
- `legacy/**` (css/freelancer.css, css/style.css, js/* dst.) — **pre-existing staged renames** dari state workspace sebelum PFR-010 (terlihat di git status awal sesi); TIDAK disentuh PFR-010, dicatat di sini hanya agar scope-check tidak salah menghitungnya sebagai drift. Path pre-existing: `css/freelancer.css`, `css/freelancer.min.css`, `css/style.css`, `index.html`, `js/contact_me.js`, `js/contact_me.min.js`, `js/freelancer.js`, `js/freelancer.min.js`, `js/jqBootstrapValidation.js`, `js/jqBootstrapValidation.min.js`, `js/main.js`.

## Steps
### Step 1: Infra hooks + preset motion
- Requirements: REQ-PFR-010-002, REQ-PFR-010-003, REQ-PFR-010-004, REQ-PFR-010-006
- Output: `src/hooks/useTilt.js`, `src/hooks/useDecodeText.js`, `src/lib/motion.js`
- Depends on: baseline (exit 0 tercatat)
- Risk: sedang — pola tilt/velocity baru; mitigasi: clamp nilai, fine-pointer gate, unit test
- Verification: `npm test` + `npm run build`
- Owner: subagent:frontend-developer (via project-manager)

### Step 2: Layer global (progress, glow, preloader exit)
- Requirements: REQ-PFR-010-002, REQ-PFR-010-006, REQ-PFR-010-007
- Output: `src/components/ScrollProgress.jsx`, `src/App.jsx`, `CustomCursor.jsx`, `Preloader.jsx`, `main.css`
- Depends on: Step 1
- Risk: sedang — blend-mode/GPU; mitigasi: satu div fixed transform-only, spring lag, idle-pause
- Verification: `npm test` + build + QA
- Owner: subagent:frontend-developer

### Step 3: Hero kinetic (decode kicker + caret intro)
- Requirements: REQ-PFR-010-004, REQ-PFR-010-005, REQ-PFR-010-006
- Output: `Hero.jsx`, `main.css`
- Depends on: Step 1
- Risk: rendah — string kontrak ('Digital craft,' dll.) tak tersentuh; kicker bukan string kontrak
- Verification: verbatim tests tetap hijau
- Owner: subagent:frontend-developer

### Step 4: Work fisik (tilt/glow/parallax + ticker skew)
- Requirements: REQ-PFR-010-002, REQ-PFR-010-003, REQ-PFR-010-006
- Output: `Work.jsx`, `main.css`
- Depends on: Step 1
- Risk: sedang — blur teks on tilt 3D; mitigasi: clamp ±4°, transform di wrapper
- Verification: test + QA computed-style
- Owner: subagent:frontend-developer

### Step 5: Profile/CV/Contact (scrub + hover micro)
- Requirements: REQ-PFR-010-002, REQ-PFR-010-003, REQ-PFR-010-006
- Output: `ProfileSection.jsx`, `Cv.jsx`, `Contact.jsx`, `main.css`
- Depends on: Step 1
- Risk: rendah — teks kontrak single text node utuh; efek CSS-first
- Verification: verbatim tests tetap hijau
- Owner: subagent:frontend-developer

### Step 6: Test suite efek baru
- Requirements: REQ-PFR-010-005, REQ-PFR-010-006
- Output: `src/__tests__/motion.test.jsx`
- Depends on: Steps 1–5
- Risk: rendah
- Verification: `npm test` 100% hijau
- Owner: subagent:frontend-developer (spec dari orchestrator)

### Step 7: QA independen + detector
- Requirements: REQ-PFR-010-001, REQ-PFR-010-002, REQ-PFR-010-003, REQ-PFR-010-004, REQ-PFR-010-005, REQ-PFR-010-006, REQ-PFR-010-007
- Output: QA report (screenshot desktop/mobile, computed-style, loop audit, verbatim DOM), impeccable detect output
- Depends on: Step 6
- Risk: rendah
- Verification: QA report + detector JSON; temuan diperbaiki bila ada
- Owner: orchestrator (qa-engineer subagent + impeccable detect)

### Step 8: Closing (jev decisions, verify, report, memory)
- Requirements: REQ-PFR-010-001, REQ-PFR-010-002, REQ-PFR-010-003, REQ-PFR-010-004, REQ-PFR-010-005, REQ-PFR-010-006, REQ-PFR-010-007
- Output: verification.md terisi, decisions D-00x, COMPLETED, laporan final, memory update
- Depends on: Step 7
- Risk: rendah
- Verification: `vcw verify` VERIFIED + `trace` tanpa gap
- Owner: orchestrator

## Test Strategy
- Regression: 9 test verbatim (app.test.jsx, data.test.js) — tidak diubah, wajib hijau.
- Unit baru: motion.test.jsx (decode parity, tilt no-op reduced, ScrollProgress aria-hidden).
- Integration/headless: QA subagent — screenshot desktop/mobile, computed-style, audit loop ≤2, reduced-motion state.
- Static: impeccable detect --json pada file berubah.

## Risks & Mitigations
- Tilt 3D blur teks → clamp ±4°, transform pada wrapper kartu, will-change terbatas.
- Velocity skew × Lenis konflik → satu sumber useVelocity(scrollY) framer + clamp ±1.2°.
- Blend-mode mahal GPU → satu div fixed, transform/opacity only, idle-pause, coarse-pointer off.
- Decode di jsdom → no-op tanpa IO (pola ticker), final text selalu di DOM utk a11y.
- Mengubah string kontrak → forbidden list disertakan di spec subagent.

## Parallelism
Sequential (satu frontend-developer subagent mengerjakan Step 1–6; QA terpisah setelahnya) — satu agent, tanpa file-ownership conflict.

## Stop / Escalation Conditions
- Jika perubahan perlu menyentuh string kontrak / file test lama / dependency baru → berhenti, lapor orchestrator.
- Jika build/test gagal 2x beruntun setelah fix attempt → berhenti, lapor temuan.
- Jika trap terdokumentasi PFR-007 terpicu (IO horizontal-margin trap, clip-path full-clip deadlock) → terapkan mitigasi terdokumentasi, jangan improvisasi.
