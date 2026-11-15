# Implementation Plan — PFR-006: Polish R6: proporsi + copywriting refinement
<!-- Setiap langkah merujuk ID REQ. `vcw.py trace` memeriksa setiap REQ muncul di file ini. -->

## Affected Areas
<!-- Tulis path lengkap, satu per baris, dalam backtick. Hook Edit/Write dan `vcw.py scope-check` memakai daftar ini:
     file yang tidak disebut dianggap di luar scope. Rujuk bagian Blast Radius di knowledge/analysis.md. -->
- `{{path/file.ext}}` — {{kenapa harus berubah + bukti}}

## Affected Areas
- `src/components/Hero.jsx` — copy H1/lede/thread
- `src/styles/tokens.css` — token --h1
- `design-system.md`, `.ui-craft/*` — jika disentuh
- Carry-over PFR-001 (belum di-commit, drift vs baseline fbe90f2): `index.html`, `css/*`, `js/*` → `legacy/`, `src/**` scaffold, `public/**`, `netlify.toml`, `.gitignore`, `.ai-workflow/**`, `.ui-craft/**`

## Steps
### Step 1: {{kata kerja + objek konkret}}
- Requirements: REQ-PFR-006-001
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
