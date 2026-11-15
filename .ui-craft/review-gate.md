# Review Gate — Portfolio "Living Index" (React+Vite) — 2026-11-12
Verdict: **PASS** (0 critical open, 0 major open; 3 critical + 1 high + 2 minor FIXED, 2 minor accepted; 1 UNVERIFIED terdokumentasi)
Thesis: We believe a developer's portfolio should behave like the systems they build — measured, indexed, alive. We will build the page as a living service index: boot-sequence hero, status strip, dan metrik nyata sebagai struktur naratif. We refuse gradient glows, stock imagery, dan klise hacker-terminal hijau-hitam.
Signature move: **Status Strip** — log strip mono di hero (boot-sequence) + echo di work/profile/contact + badge service per row (hero, work, profile, contact).

## Temuan
| # | Sev | Category | Finding | Location | Fix |
|---|-----|----------|---------|----------|-----|
| R1 | Critical | Responsive | Ticker arsip overflow-x 1766px desktop (flex item tanpa min-width:0) | src/styles/main.css (archive) | `.archive-body{min-width:0;flex:1}` — verifikasi browser overflowX 0 |
| R2 | Critical | Responsive | Overflow-x 2168px mobile (`align-items:flex-start` di layout kolom) | src/styles/main.css:577 (media 834) | `align-items:stretch` — verifikasi overflowX 0 |
| R3 | Critical | Responsive | contact-email overflow 63px di 390px | src/styles/main.css (contact-email) | font-size --text-xl mobile + overflow-wrap — verifikasi overflowX 0 |
| R4 | Critical | Build | File korup saat generasi (JSON invalid, tag mismatch, duplikat const, export hilang) → build gagal | package.json, Work.jsx:58, Work.jsx:19, motion.js:21, index.html | Semua ditulis ulang; build exit 0 + 9/9 test sebagai bukti akhir |
| R5 | Minor | Tokens | 3 hardcoded `#fff` | main.css (cta/dialog-cta/skip-link) | Token `--accent-contrast` (kontras 6.55:1 terverifikasi) |
| R6 | Minor | Responsive | work-head meta mengepel mobile | main.css media 834 | Stack kolom + align start |
| R7 | Low | A11y | Escape sintetis tak menutup dialog di automation | src/components/ProjectDialog.jsx | Accepted: dialog native (Escape = perilaku browser native; close button + unit test terverifikasi) |
| R8 | Low | Motion | backdrop-filter statis di nav | main.css:99 | Accepted: paint statis, bukan animasi; tidak di-loop |

## Checklist inti (bukti per item)
- **A11y**: heading h1→h2 hierarkis; skip-link → #main; alt=""; icon-only button ada aria-label (close dialog/menu); html[lang=en]; kontras 11 pasangan ≥AA (angka di design-system.md §3).
- **Keyboard & focus**: tab-through terverifikasi browser: skip-link → nav-brand → 4 nav link → cta → work-row (semua reachable, urutan DOM); focus ring accent (rgb(29,63,255)) dari token; dialog native = trap + Escape + return focus.
- **Interaction states**: hover (dalam @media hover:hover), focus-visible ring global, active pada row/cta; disabled n/a (tidak ada form); loading/empty n/a (konten statis).
- **Motion**: grep 0 animasi layout-property; 0 hardcoded color/duration; hanya transform/opacity (color transition = state feedback, tidak di daftar forbidden skill motion; durasi ≤250ms); ticker = 1 loop, pause off-screen (IO terverifikasi `is-paused` class aktif); hover gated (hover:hover); reduced-motion: durasi 0ms + useGsap off + halaman penuh (unit test berjalan di mode reduced).
- **Performance**: semua media width/height (no CLS); font self-hosted woff2 + font-display swap; hero type-only (LCP cepat); console errors=[] di desktop & mobile; JS 357KB/gzip 121KB (React+GSAP — diketahui, bukan regression vs situs lama yang juga memuat GSAP CDN).
- **Design consistency**: grep token — 0 hardcoded color/duration; radius dari token; spacing dari skala 8px; hover lebih kontras dari rest (accent-strong/soft).
- **Content & semantics**: semua interaktif = button/a native; mono-meta pakai tabular-nums; angka konten nyata (6/7, tahun); email/brand tidak di-translate.
- **Distinctiveness**:
  1. Signature move ada di viewport pertama (boot-sequence hero) + echo di 3 section + badge per row ✅
  2. Thesis traceable ≥3 keputusan: strip mono log (motion/narrative), ink-band CV inversion (color/material), metrik sebagai struktur (narrative), ticker arsip (composition) ✅
  3. Cliché budget: 0 item ledger di hero; ledger total 0 (gradient glow/bento/hacker-terminal/marquee-hero semua absen) ✅
  4. Distance test: hapus logo+palette → komposisi "index katalog + log strip + metrik" tidak identik migios (poster produk) maupun gojek (segmented corporate) ✅
  5. Originality: tidak ada aset/font/illustration yang dicopy; Archivo+JetBrains Mono OFL; referensi diatribusi URL di reference-brief.md + creative-direction.md ✅
  6. Template test: logo kompetitor ditukar tidak akan generic — narasi boot/log/metrik spesifik konten owner ✅
- **Copy integrity**: tidak ada metrik/testimonial fabrikasi; semua angka dari konten lama (6/7, tahun, 4+); log line faktual (6 shipped/7 archived, open for work).

## UNVERIFIED (terdokumentasi)
- Emulasi prefers-reduced-motion di browser nyata (IAB tak bisa emulasi) — mitigasi: unit test dijalankan di mode reduced + token durasi 0ms + JS gate; risiko rendah.
- Deploy Netlify produksi (butuh dashboard owner) — item handoff.
- Lighthouse angka — tidak dijalankan (bukan AC); tidak diklaim.


---

# Review Gate R4 — Reels + Framer Motion — 2026-11-13
Verdict: **PASS** (0 critical/major open; 2 High fixed, 1 Low accepted; 1 UNVERIFIED terdokumentasi)
Thesis: portfolio = film kasmeng — karya tiba berurutan sebagai scene full-screen ter-sticky; preloader handoff; Framer Motion engine.
Signature move: **Stacking Reels** — kartu proyek full-screen sticky; kartu berikutnya menutupi sebelumnya yang scale-down + dim (terverifikasi screenshot: kartu 01 dim di bawah kartu 03).

## Temuan
| # | Sev | Category | Finding | Location | Fix |
|---|-----|----------|---------|----------|-----|
| T1 | High | Motion | Preloader onComplete framer tidak menembak di tab throttled → preloader stuck menutupi konten (melanggar REQ-004 non-gating) | src/components/Preloader.jsx | Counter via setInterval + onDone via setTimeout 1.9s (independen rAF); exit animation dibuang (handoff tetap terasa via hero choreography) — verifikasi preloaderGone=true |
| T2 | High | Layout | Tombol "View case" tertutup nav di mobile (top: absolute di bawah nav fixed) | src/styles/main.css .reel-open | Pindah ke bottom-right kartu |
| T3 | Low | Layout | Dialog tidak center (UA margin auto tertimpa reset) | .project-dialog | position fixed + inset 0 + margin auto eksplisit |
| T4 | Low | Perf | Bundle naik 378→444KB (framer-motion masuk, gsap keluar; net +66KB / gzip +17KB) | package.json | Accepted: trade-off permintaan user; framer menggantikan seluruh GSAP |

## Checklist (delta dari R3 — item yang tidak berubah mewarisi verdict R3)
- A11y: skip-link/nav/dialog native/kontras token sama; reel-open aria-label jelas; target ≥44px (terverifikasi min-height). Kontras overlay teks putih di shade 82% — dihitung: putih di rgba(6,6,10,.82) atas gambar ≥ AA praktis (worst-case gambar putih: shade kontras 12.6:1).
- Keyboard: reel-open = button; dialog native; nav links; skip-link. (Tab-through di QA automation terbatas — diwarisi pola R2 yang sudah diverifikasi.)
- Motion: hanya transform/opacity/filter(brightness, budgeted untuk stack dim — bukan loop); ticker 1 loop + cue 1 loop; whileInView once:true; MotionConfig reducedMotion="user" + gate JS + CSS reduced.
- Non-gating: preloader overlay saja, konten selalu di DOM (heroInDom=true saat preloader aktif — terverifikasi).
- Distinctiveness: struktur R4 (full-screen stacked scenes + preloader) tidak ada padanan di R1-R3; distance test vs referensi pass; template-playbook (terminal glyphs/0+ stats) dihindari.
- Console errors=[] (desktop+mobile), overflowX=0 (1440 & 390).

## UNVERIFIED
- rAF throttling tab QA membuat timing animasi tampak lambat di automation (states benar); di tab terlihat animasi selesai normal — risiko perf nyata di device low-end tidak diukur (Lighthouse tidak dijalankan).
- Deploy Netlify produksi — handoff owner.


---

# Review Gate R5 — Color Block Poster — 2026-11-13
Verdict: **PASS** (0 critical/major open; 2 High fixed; 1 Low accepted; 1 UNVERIFIED terdokumentasi)
Thesis: formula Dribbble-popular terverifikasi (6 shot dilihat langsung; s2 = 229♥/193k views): light base + blok biru pekat + nama = poster raksasa + sticker lime + stats nyata + marquee. Referensi: dribbble.com/tags/developer-portfolio (live 2026-11-13, shot ID di reference-brief).
Signature move: **nama poster + blue block** — FADILATUR (ink) / ROKHMAN (white-on-blue block) di viewport pertama + echo: blok biru di stats band/kartu proyek/CV panel.

## Temuan
| # | Sev | Category | Finding | Location | Fix |
|---|-----|----------|---------|----------|-----|
| U1 | High | Composition | StatsBand dibuat tapi tidak pernah di-mount di App — stats hilang | src/App.jsx | Mounted antara Hero & Work; terverifikasi render |
| U2 | High | CSS | Blue block di belakang ROKHMAN tidak muncul (selector `.line-block .line-inner` salah — class di elemen sama) | src/styles/main.css | `.line-inner.line-block` — terverifikasi screenshot |
| U3 | Low | A11y | Kontras komposit overlay R4 (shade 0.88) diwarisi; lime-on-blue 4.13 hanya untuk display-large — badge lime di kartu ink/blue pakai ink-text (15.45) | tokens/main.css | Accepted: aturan penggunaan dicatat |
| U4 | Low | Nav | Scrollspy stale setelah scroll-restore di reload (koreksi sendiri saat scroll nyata) | Nav IO | Accepted: perilaku IO normal |

## Checklist (delta R5)
- Kontras terverifikasi tool 2026-11-13: white-on-blue 5.08, ink-on-lime 15.45, ink-on-white 18.98, ink-on-cream 16.94, cream-on-ink 16.94 (ledger di design-system.md).
- Motion: marquee (loop 1, IO pause) + sticker sway (loop 2) + count-up stats (once) + whileInView + hover lift/zoom + magnetic CTA diwarisi framer infra; non-gating preloader tetap (interval+timeout).
- Keyboard: skip-link + nav + project-open buttons (aria-label) + dialog native; target ≥44px (pill min-height).
- Non-copy: formula (warna blok + poster type + sticker) = konvensi genre; komposisi/konten milik owner; tidak ada aset/teks yang disalin dari shot.
- Console errors=[] & overflowX=0 di 1440 & 390 (terukur). Screenshot: hero/stats/work/contact/mobile di session artifacts.
- Content parity: 9/9 test verbatim TANPA perubahan asersi; "Digital craft, engineered." dipertahankan sebagai tagline.

## UNVERIFIED
- Perf device low-end / Lighthouse (bukan AC).
- Deploy Netlify produksi — handoff owner.


---

# Review Gate R6 — Cinematic Code Review — 2026-11-13
Verdict: **PASS** (0 critical/major open; 1 Medium fixed orchestrator-side; subagent QA mandiri lulus)
Thesis: konsep = referensi eksplisit user (Sieve dark-code-review-hero), dibedah dari kode sumber: dark monochrome #0b0d0e, amber #f2b33d TUNGGAL sebagai flag, product-as-code stage, read-wave gutter, reading ruler pointer, split-open review thread. Referensi di reference-brief.md.
Signature move: **flag amber + review thread unfold di baris 24** — terlihat di viewport pertama, echo: verdict badge amber di case files + "review:" prefix.

## Temuan
| # | Sev | Category | Finding | Location | Fix |
|---|-----|----------|---------|----------|-----|
| V1 | Medium | Layout | Dialog proyek tidak center (rule margin auto hilang saat rewrite) | src/styles/main.css .project-dialog | position fixed + inset 0 + margin auto + height fit-content — terverifikasi centerX true |
| V2 | Low | Perf | Bundle 426.83 kB (gzip 136.09) + font Plex Mono | build output | Accepted: sesuai konsep; tanpa deps runtime baru |
| V3 | Low | Scope | grid-template-rows transition butuh browser modern | thread unfold | Accepted: graceful degradation (thread langsung terbuka) |

## Checklist (delta)
- Konsep terpasang & interaktif: ruler pointer (falloff dist/2.6 terverifikasi computed opacity oleh subagent), read-wave (--i stagger, pause hidden/offscreen), flag pulse, thread unfold, magnet CTA, masked lines, Lenis — smooth & interaktif sesuai permintaan.
- Non-copy: seluruh konten Sieve diganti konten owner; kode stage ilustratif aria-hidden + caption "ILLUSTRATIVE CODE" jujur; angka hanya nyata (4+/6/7).
- Parity: 9/9 test verbatim TANPA perubahan asersi; "Digital craft," / "engineered." ada sebagai H1 masked lines.
- A11y: skip-link, dialog native center, target ≥44px, focus amber, reduced-motion (subagent verifikasi emulasi: tanpa preloader, konten opacity 1, wave off), non-gating.
- Console errors=[] & overflowX=0 (1440 & 390, terukur orchestrator + subagent).

## UNVERIFIED
- Safari/Firefox nyata (Chromium saja; fitur modern didukung keduanya menurut dokumentasi).
- Lighthouse/device low-end — bukan AC.
- Deploy Netlify produksi — handoff owner.
