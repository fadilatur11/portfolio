# Implementation Plan — PFR-004: R5: Color Block Poster (Dribbble-popular formula, light+loud)
<!-- Setiap langkah merujuk ID REQ. `vcw.py trace` memeriksa setiap REQ muncul di file ini. -->

## Affected Areas
- `src/styles/tokens.css`, `src/styles/main.css` — rewrite light color-block
- `src/components/Hero.jsx` — poster baru (marquee + nama raksasa + monogram + sticker)
- `src/components/StatsBand.jsx` — baru (count-up stats nyata)
- `src/components/Work.jsx` — grid color-block + dialog
- `src/components/ProfileSection.jsx`, `src/components/Cv.jsx`, `src/components/Contact.jsx`, `src/components/Footer.jsx`, `src/components/Nav.jsx`, `src/components/Preloader.jsx`, `src/App.jsx` — restyle/mount
- `design-system.md`, `.ui-craft/reference-brief.md`, `.ui-craft/review-gate.md` — artifacts R5
- `.ai-workflow/features/PFR-004/*` — dokumentasi
- Carry-over PFR-001 (belum di-commit, drift vs baseline fbe90f2): `index.html`, `css/*`, `js/*` → `legacy/`, `src/**` scaffold, `public/**`, `netlify.toml`, `.gitignore` — milik plan PFR-001

## Steps
<!-- Tulis path lengkap, satu per baris, dalam backtick. Hook Edit/Write dan `vcw.py scope-check` memakai daftar ini:
     file yang tidak disebut dianggap di luar scope. Rujuk bagian Blast Radius di knowledge/analysis.md. -->
- `{{path/file.ext}}` — {{kenapa harus berubah + bukti}}

## Steps
### Step 1: {{kata kerja + objek konkret}}
- Requirements: REQ-PFR-004-001
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
