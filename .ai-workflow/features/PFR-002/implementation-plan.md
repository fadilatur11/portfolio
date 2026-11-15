# Implementation Plan — PFR-002: Redesign R3: full-motion cinematic concept (T1 rejected by user)
<!-- Setiap langkah merujuk ID REQ. `vcw.py trace` memeriksa setiap REQ muncul di file ini. -->

## Affected Areas
<!-- Diisi saat implementasi: file yang benar-benar berubah -->
- `src/styles/tokens.css` — rewrite: palet Noir Cinema + motion tokens (dur-scene, lerp)
- `src/styles/main.css` — rewrite: glass nav, spotlight hero, scene styles, pill/badge, magnetic, ticker, dialog
- `src/components/Hero.jsx` — replace: spotlight glow + 2 CTA + scroll cue (boot log T1 dihapus)
- `src/App.jsx` — motion setup baru: Lenis + scene morph + magnetic CTA + intro choreography
- `src/components/Work.jsx`, `src/components/ProfileSection.jsx`, `src/components/Contact.jsx` — hapus usage StatusStrip
- `package.json`, `package-lock.json` — tambah dependency lenis@1.3.27
- `design-system.md` — rewrite: sistem Noir Cinema + kontras ledger baru
- `.ui-craft/creative-direction.md` — append: re-run divergence R3 + thesis Noir
- `.ai-workflow/features/PFR-002/verification.md` — bukti QA
<!-- Tulis path lengkap, satu per baris, dalam backtick. Hook Edit/Write dan `vcw.py scope-check` memakai daftar ini:
     file yang tidak disebut dianggap di luar scope. Rujuk bagian Blast Radius di knowledge/analysis.md. -->
- `{{path/file.ext}}` — {{kenapa harus berubah + bukti}}

- Carry-over PFR-001 (belum di-commit, terdeteksi drift vs baseline fbe90f2): `index.html`, `css/*`, `js/*` → `legacy/` (git mv), `src/**` scaffold, `public/**` aset copy, `.gitignore`, `netlify.toml`, `.ai-workflow/**`, `.ui-craft/**` — semua milik scope PFR-001 yang plan-nya sudah mencantumkannya
## Steps
### Step 1: {{kata kerja + objek konkret}}
- Requirements: REQ-PFR-002-001
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
