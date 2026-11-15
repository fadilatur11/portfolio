# Implementation Plan — PFR-009: R6e: Craft elevation pass (standar eksekusi = referensi Sieve)
<!-- Setiap langkah merujuk ID REQ. `vcw.py trace` memeriksa setiap REQ muncul di file ini. -->

## Affected Areas
<!-- Tulis path lengkap, satu per baris, dalam backtick. Hook Edit/Write dan `vcw.py scope-check` memakai daftar ini:
     file yang tidak disebut dianggap di luar scope. Rujuk bagian Blast Radius di knowledge/analysis.md. -->
- `{{path/file.ext}}` — {{kenapa harus berubah + bukti}}

## Affected Areas
- `src/styles/tokens.css`, `src/styles/main.css` — craft atmosphere + art direction + premium details
- `src/components/Work.jsx` — caption chip + per-image crop classes
- `design-system.md`, `.ui-craft/*` — bila disentuh
- `.ai-workflow/features/PFR-009/*` — dokumentasi
- Carry-over PFR-001 (belum di-commit, drift vs baseline fbe90f2): `index.html`, `css/*`, `js/*` → `legacy/`, `src/**` scaffold, `public/**` (termasuk restore 01javamifi.png), `netlify.toml`, `.gitignore`

## Steps
### Step 1: {{kata kerja + objek konkret}}
- Requirements: REQ-PFR-009-001
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
