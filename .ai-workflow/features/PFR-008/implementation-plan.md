# Implementation Plan — PFR-008: R6d: remove work modal (arah eksplisit user) + proporsi kartu
<!-- Setiap langkah merujuk ID REQ. `vcw.py trace` memeriksa setiap REQ muncul di file ini. -->

## Affected Areas
<!-- Tulis path lengkap, satu per baris, dalam backtick. Hook Edit/Write dan `vcw.py scope-check` memakai daftar ini:
     file yang tidak disebut dianggap di luar scope. Rujuk bagian Blast Radius di knowledge/analysis.md. -->
- `{{path/file.ext}}` — {{kenapa harus berubah + bukti}}

## Affected Areas
- `src/components/Work.jsx` — hapus dialog/button/hint, tambah case-desc
- `src/styles/main.css` — 16/9 + clamp desc + bersihkan case-open
- `src/components/ProjectDialog.jsx` — DIHAPUS
- `src/__tests__/app.test.jsx` — blok dialog diganti test kartu (requirement change terdokumentasi)
- `.ai-workflow/features/PFR-008/*` — dokumentasi
- Carry-over PFR-001 (belum di-commit, drift vs baseline fbe90f2): `index.html`, `css/*`, `js/*` → `legacy/`, `src/**` scaffold, `public/**`, `netlify.toml`, `.gitignore`

## Steps
### Step 1: {{kata kerja + objek konkret}}
- Requirements: REQ-PFR-008-001
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
