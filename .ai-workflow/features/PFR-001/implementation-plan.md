# Implementation Plan — PFR-001: Portfolio redesign: migrate to React+Vite, full UI/UX+motion redesign
<!-- Setiap langkah merujuk ID REQ. `vcw.py trace` memeriksa setiap REQ muncul di file ini. -->

## Affected Areas
- `design-system.md` — F1 artifact: token block + kontrak komponen + rationale (dibuat di Step 1)
- `package.json` — baru; scaffold Vite+React+GSAP+Vitest (repo sebelumnya tanpa package.json)
- `package-lock.json` — dihasilkan `npm install` (pin versi dependensi; bagian dari scaffold)
- `src/__tests__/data.test.js` — test integritas data (6+7 item, path aset ada di public/) — bagian dari AC-002/008
- `src/__tests__/setup.js` — setup Vitest (mock matchMedia/IntersectionObserver/dialog shim) — bagian dari AC-008
- `vite.config.js` — baru; plugin react
- `netlify.toml` — baru; REQ-PFR-001-006 (build + publish dir deploy Netlify dari repo)
- `index.html` — diganti; entry Vite + meta SEO/OG dari file lama (canonical/og:url tetap fadilatur11.netlify.app)
- `.gitignore` — tambah node_modules/dist; file lama statis tak dihapus
- `public/img/**`, `public/cv/**` — copy aset lama (img/, cv/, img/og/) ke public/
- `legacy/` — backup index.html + css/ + js/ lama untuk rollback; tidak ikut build
- `index.html` — diganti entry Vite; versi lama dipindah ke legacy/index.html (git mv)
- `css/` — dipindah utuh ke legacy/css/ (git mv; termasuk css/style.css, css/freelancer.css, css/freelancer.min.css)
- `js/` — dipindah utuh ke legacy/js/ (git mv; termasuk js/main.js, js/freelancer.js, js/contact_me.js, js/jqBootstrapValidation.js dan versi .min)
- `.ui-craft/reference-brief.md`, `.ui-craft/creative-direction.md`, `.ui-craft/review-gate.md` — artifact workflow ui-craft F0/F4 (referensi, arah kreatif, review gate)
- `src/main.jsx`, `src/App.jsx` — entry React + komposisi section
- `src/styles/tokens.css` — F1: token T1 Living Index
- `src/styles/main.css` — reset/base + layout semua section
- `src/data/projects.js`, `src/data/site.js` — konten dipindah apa adanya (REQ-PFR-001-005)
- `src/components/` — Nav, Hero, StatusStrip, Work, ProfileSection, Cv, Contact, Footer, ProjectDialog
- `src/hooks/useReducedMotion.js`, `src/lib/motion.js` — F3 motion layer
- `src/**/*.test.jsx` — smoke tests Vitest (AC-PFR-001-008)
- `vitest.config.js` — konfigurasi test

## Steps
### Step 1: F1 design system — token block + kontrak komponen
- Requirements: REQ-PFR-001-002, REQ-PFR-001-004, REQ-PFR-001-007
- Output: src/styles/tokens.css + design-system.md (docs project)
- Depends on: T1 terkunci di creative-direction.md
- Risk: rendah
- Verification: semua nilai styling dari token; kontras dihitung per pasangan (contrast tool)
- Owner: orchestrator

### Step 2: Scaffold Vite+React+GSAP+Vitest; migrasi aset + data
- Requirements: REQ-PFR-001-001, REQ-PFR-001-005, REQ-PFR-001-006
- Output: package.json, vite.config.js, vitest.config.js, netlify.toml, src/data/*, public/**, legacy/, .gitignore
- Depends on: Step 1
- Risk: rendah-sedang (scaffold baru; file lama tidak dihapus, hanya dipindah ke legacy/ + copy aset)
- Verification: npm install exit 0; npm run build exit 0; dist/ berisi img/cv/og aset (AC-PFR-001-001)
- Owner: orchestrator

### Step 3: Komponen + layout statis (F2)
- semua state interactive (hover/focus/active/disabled), responsive 3 breakpoint, keyboard reachable, target ≥24px pointer/≥44px touch, anchor IA legacy (#work/#profile/#cv/#contact) tetap ada
- Requirements: REQ-PFR-001-002, REQ-PFR-001-004, REQ-PFR-001-008
- Output: src/components/*.jsx + src/styles/main.css
- Depends on: Step 2
- Risk: sedang (banyak komponen; ikuti kontrak F1)
- Verification: preview server + tab-through manual + viewport mobile/desktop (AC-PFR-001-007)
- Owner: orchestrator

### Step 4: Motion layer GSAP (F3)
- Requirements: REQ-PFR-001-002, REQ-PFR-001-007
- Output: src/lib/motion.js, src/hooks/useReducedMotion.js, gsap.context per komponen (revert() di cleanup — StrictMode-safe)
- Depends on: Step 3
- Risk: sedang (GSAP+StrictMode; hidden states JS-only supaya no-JS/reduced-motion = halaman terlihat penuh)
- Verification: reduced-motion emulation + budget audit F3 + vitest (AC-PFR-001-004)
- Owner: orchestrator

### Step 5: QA, review, dokumentasi, build final
- Requirements: F4 audit + F5 polish + AC semua
- Output: verification.md terisi, review findings, design-system.md final, handoff Netlify
- Depends on: Step 4
- Risk: rendah
- Verification: npm run build exit 0 + vitest exit 0 + F4 checklist + kontras + console bersih
- Owner: orchestrator

## Test Strategy
Vitest + Testing Library (jsdom): render App → semua section hadir; 6 work rows + 7 arsip; dialog open/close; data file lengkap & setiap path gambar ada di public/ (AC-PFR-001-002/008); hook reduced-motion unit test. Manual: reduced-motion emulation, kontras, keyboard, viewport 390/834/1200.

## Risks & Mitigations
- GSAP + StrictMode double-mount → gsap.context + revert() di cleanup; kalau masih bermasalah, StrictMode off dengan alasan dicatat.
- Hidden states JS-only (gsap.set di dalam context) → tanpa JS/reduced-motion halaman tetap terlihat penuh.
- LCP: hero type-only (tanpa gambar besar) — cepat; CLS: width/height attrs di semua media.
- Media hanya di dialog + cursor preview (fine-pointer & motion-allowed only) — pattern situs lama dipertahankan.
- ScrollTrigger.refresh() setelah gambar load.

## Parallelism
Sequential: satu orchestrator; komponen bergantung token & data file; subagent tidak menambah nilai di sini.

## Stop / Escalation Conditions
- Build/test gagal setelah 2 loop perbaikan → stop, report ke user.
- F4 menemukan isu fatal (kontras/keyboard/CLS) → loop ke fase terkait, maks 2 loop, lalu eskalasi.
- Perubahan arah/territory mid-flight → stop, update artifacts, re-gate.
- Netlify dashboard perlu diubah manual → instruksi handoff ke owner di F5.