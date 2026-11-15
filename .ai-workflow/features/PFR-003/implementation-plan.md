# Implementation Plan — PFR-003: Rework total R4: Reels stacked-case structure + Framer Motion
<!-- Setiap langkah merujuk ID REQ. `vcw.py trace` memeriksa setiap REQ muncul di file ini. -->

## Affected Areas
<!-- Tulis path lengkap, satu per baris, dalam backtick. Hook Edit/Write dan `vcw.py scope-check` memakai daftar ini:
     file yang tidak disebut dianggap di luar scope. Rujuk bagian Blast Radius di knowledge/analysis.md. -->
- `{{path/file.ext}}` — {{kenapa harus berubah + bukti}}

## Affected Areas (supplement — diisi saat implementasi)
- `.ui-craft/review-gate.md` — append section R4 (audit F4)
- `.ui-craft/reference-brief.md` — rewrite (riset fresh 2026-11-13)
- `.ai-workflow/features/PFR-003/verification.md` — bukti QA
- `src/components/ReelStack.jsx`, `src/components/Preloader.jsx`, `src/components/CustomCursor.jsx` — komponen baru
- `src/components/Hero.jsx`, `src/components/Work.jsx`, `src/components/ProfileSection.jsx`, `src/components/Cv.jsx`, `src/components/Contact.jsx`, `src/App.jsx` — rework framer
- `src/styles/main.css` — rewrite struktur reels
- `package.json`, `package-lock.json` — framer-motion in, gsap out

## Steps
### Step 1: {{kata kerja + objek konkret}}
- Requirements: REQ-PFR-003-001
- Output: {{file yang disentuh}}
- Depends on: -
- Risk: {{rendah/sedang/tinggi — alasan}}
- Verification: {{test/command}}
- Owner: {{orchestrator | subagent:<nama> — file ownership}}

## Test Strategy
{{unit/integration/regression/negative; pemetaan ke AC}}

## Risks & Mitigations
{{...}}

## Parallelism
{{langkah yang independen + file ownership, atau "Sequential: <alasan>"}}

## Stop / Escalation Conditions
{{kapan berhenti dan bertanya}}
