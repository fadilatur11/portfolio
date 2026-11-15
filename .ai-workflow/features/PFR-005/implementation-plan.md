# Implementation Plan — PFR-005: R6: Cinematic Code Review (referensi eksplisit user: Sieve hero)
<!-- Setiap langkah merujuk ID REQ. `vcw.py trace` memeriksa setiap REQ muncul di file ini. -->

## Affected Areas
- `src/styles/tokens.css`, `src/styles/main.css` — rewrite cinematic dark monochrome (subagent)
- `src/components/Hero.jsx`, `Nav.jsx`, `StatsBand.jsx`, `Work.jsx`, `ProfileSection.jsx`, `Cv.jsx`, `Contact.jsx`, `Footer.jsx`, `App.jsx`, `main.jsx` — rework (subagent)
- `src/hooks/useMagnet.js`, `useReadingRuler.js`, `useAmbientPause.js` — baru (subagent)
- `package.json`, `package-lock.json` — @fontsource/ibm-plex-mono
- `design-system.md`, `.ui-craft/reference-brief.md`, `.ui-craft/review-gate.md` — artifacts R6
- `.ai-workflow/features/PFR-005/*` — dokumentasi
- Carry-over PFR-001 (belum di-commit, drift vs baseline fbe90f2): `index.html`, `css/*`, `js/*` → `legacy/`, `src/**` scaffold awal, `public/**`, `netlify.toml`, `.gitignore`

## Steps
<!-- Tulis path lengkap, satu per baris, dalam backtick. Hook Edit/Write dan `vcw.py scope-check` memakai daftar ini:
     file yang tidak disebut dianggap di luar scope. Rujuk bagian Blast Radius di knowledge/analysis.md. -->
- `{{path/file.ext}}` — {{kenapa harus berubah + bukti}}

## Steps
### Step 1: {{kata kerja + objek konkret}}
- Requirements: REQ-PFR-005-001
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
